# Input Group

InputGroup은 Input/Textarea에 아이콘·버튼·텍스트 addon을 붙이는 합성
컴포넌트입니다(검색창, 지우기 버튼, 비밀번호 표시 토글 등).

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui — 내부적으로 우리 `Button`/`Input`/`Textarea`를
  그대로 합성한다(shadcn registry의 `registryDependencies`와 동일).
- 코드: `src/components/ui/input-group.tsx`

------------------------------------------------------------------------

## Size

InputGroup 자체가 "테두리를 가진 바깥 박스"이고, 안의 `InputGroupInput`/
`InputGroupTextarea`는 자기 테두리를 지우고(`border-0`) 그 박스 안에 얹힌다.
따라서 InputGroup의 height는 **Input의 sm/md/lg(size.40/48/56)를 그대로
재사용**한다 — 별도 스케일을 새로 만들지 않는다.

```
sm → h-10 (40px, Input sm과 동일)
md → h-12 (48px, Input md와 동일, 기본값)
lg → h-14 (56px, Input lg와 동일)
```

Textarea가 자식으로 들어오면(`has-[>textarea]:h-auto`) 자동으로 고정
높이를 풀고 콘텐츠에 맞춰 늘어난다 — Textarea 자체가 사이즈 variant를
갖지 않는 것과 일관된 동작.

### ⚠️ 알려진 gap — size가 자동으로 전파되지 않는다

`<InputGroup size="lg">`에 `size`를 지정해도 안의 `<InputGroupInput>`/
`<InputGroupTextarea>`(Textarea도 `sm`/`md`/`lg`를 지원한다, `textarea.md`
참고)에는 **자동으로 전달되지 않는다.** 두 곳에 각각 같은 `size`를 직접
지정해야 시각적으로 맞는다:

```tsx
<InputGroup size="lg">
  <InputGroupInput size="lg" placeholder="..." />
</InputGroup>
```

React Context나 data-attribute cascade로 자동화하는 방법도 있지만, 아직
이 정도 중복 선언이 실제로 문제가 될 만큼 반복되지 않아서 지금은 만들지
않는다 — 반복 필요성이 여러 곳에서 확인되면 그때 추가한다.

------------------------------------------------------------------------

## Radius

- 별도 변수를 만들지 않고 `--input-radius`를 그대로 재사용(Textarea와
  동일 판단). `InputGroupButton`은 내부적으로 우리 `Button`을 그대로
  쓰므로 `--button-radius`를 이미 상속한다 — 손댈 필요 없음.

------------------------------------------------------------------------

## Color / State

Input/Textarea와 동일한 패턴.

| 상태 | Background | Border |
|:---|:---|:---|
| Default | 투명(`bg-transparent` — 실제 배경은 안의 Input이 담당) | `border.default` |
| Disabled | `surface.disabled` | 변경 없음(원본 유지) |

> **Disabled를 opacity로 처리하지 않는다** — 원본의
> `has-disabled:bg-input/50 dark:has-disabled:bg-input/80`을 제거하고
> `surface.disabled` 고정 토큰으로 교체(Input/Textarea와 동일 이유).

### Focus

- Focus ring 투명도 **20%**로 통일
  (`has-[...:focus-visible]:ring-ring/20`) — 원본 `/50`에서 변경, Input과
  나란히 쓰이는 컴포넌트라 같은 값으로 맞췄다.
- Invalid는 원본 그대로 유지(`/20`, 이미 20%였음, 변경 없음).

------------------------------------------------------------------------

## 아이콘 크기 — 공식(고정 16px)과 다르게, 완만히 스케일하기로 최종 결정

**세 단계를 거쳤다.**

1. 처음엔 Addon/Button 안의 svg 아이콘을 Button의 폰트-아이콘 비례
   스케일(`size.16`/`20`/`20`)을 빌려와 Group size에 반응하게 했는데,
   실제로 렌더링해보니 md/lg에서 아이콘이 과하게 커 보였다.
2. shadcn 공식 예제(`ui.shadcn.com/docs/components/aria/input-group`,
   `input-group-button.tsx`/`input-group-text.tsx`/`input-group-icon.tsx`
   실제 소스로 확인)를 보면 **원본은 아이콘 크기를 Input의 폰트/사이즈와
   전혀 연동하지 않는다** — 모든 예제(검색/이메일/카피/별 아이콘 등)가
   항상 고정 크기(`size-4`, 16px)다. 그래서 한 번은 스케일링을 완전히
   제거하고 16px 고정으로 되돌렸었다.
3. 다시 렌더링해서 실제로 나란히 놓고 보니, **lg Input(56px, 폰트
   18px)** 옆에서 16px 아이콘이 상대적으로 작아 보인다는 문제가 있었다.
   그래서 최종적으로는 **공식과 다르게(의도적 BDS 이탈), Foundation
   `size.16`/`18`/`20`(sm/md/lg) 3단으로 완만하게 스케일**하기로 했다 —
   1번 시도(+4, 16→20)보다 훨씬 작은 폭(+2, 16→18→20)이라 과하게 커
   보이지 않으면서도, lg에서 너무 작아 보이는 문제는 해결한다. `data-
   group-size`를 읽는 `in-data-[group-size=*]` 선택자로 구현했고, 실측
   확인: sm=16×16px, md=18×18px, lg=20×20px (`getBoundingClientRect()`).

같은 이유로 `InputGroupButton`의 **버튼 자체 크기**(`xs`=24px/
`icon-xs`=24px/`icon-sm`=32px)도 Group의 height(40/48/56)에 비례해서
커지지 않는다 — 우리 `Button`의 `sm/md/lg/icon-sm/md/lg` 스케일과는
**의도적으로 별개** 축이다. `size` prop 이름이 겹치는 문제는 shadcn
원본이 이미 `data-size`(장식용 attribute)로 우회해뒀고, 실제 크기는
`Button`의 `size` prop이 아니라 `inputGroupButtonVariants`가 별도
클래스로 직접 지정한다 — 이 구조를 그대로 유지했다.

### 실제 버그: "16px 고정으로 되돌렸다"던 확인이 틀렸었다

위에서 스케일링을 제거하고 16px로 되돌렸다고 문서화했지만, 실제로는
`icon-xs`/`icon-sm`/`sm` tier가 svg 크기를 **한 번도 명시한 적이
없었다**(원본 shadcn도 마찬가지). `[&>svg:not([class*='size-'])]:size-4`
셀렉터가 안 걸리면 안의 `Button` 자신의 기본값이 그대로 샌다 — 원본
shadcn은 Button 기본이 원래 작아서(16px) 문제가 없었지만, BDS Button은
기본이 `md`(20px)라 icon-xs 버튼(24px 크기)에 20px 아이콘이 들어가
버튼 안쪽 여백이 거의 없이 꽉 차 보이는 문제가 실제로 있었다 — 사용자가
"아이콘이 너무 커서" / "영역 밖으로 벗어나 보인다"고 지적한 두 문제(2번,
Image #3 focus-outline이 border를 침범해 보이는 것)의 진짜 원인이
바로 이거였다. `xs`/`sm`/`icon-xs`/`icon-sm` 네 tier 전부에
`[&>svg:not([class*='size-'])]:size-*`를 명시로 넣어 고쳤다 — `xs`는
14px 고정 유지, `sm`/`icon-xs`/`icon-sm`은 이후 위의 "완만한 스케일"
결정에 따라 Group size 반응형(16/18/20)으로 다시 바뀌었다(최초엔 잠깐
20px 고정으로 고쳤다가, 최종 스케일 결정 때 반응형으로 교체).

### 실제 버그: icon 버튼이 addon 오른쪽 padding을 거의 다 깎아 먹고 있었다

`InputGroupAddon`은 버튼을 담으면 `has-[>button]:mr-[-0.3rem]`
(-4.8px)로 자기 자신의 padding을 당겨서, addon 자신의 `pr-2`(8px)와
겹쳐 이중으로 여백이 생기는 걸 막는다. 이건 **텍스트 버튼**(자체
padding이 있는 xs/sm tier)에는 맞는 보정이지만, **아이콘 전용
버튼**(icon-xs/icon-sm, `p-0`이라 자체 padding이 원래 없음)에도 똑같이
적용되고 있어서, 실측해보니 Group 오른쪽 border까지 겨우 4px 정도밖에
안 남았다 — 여기에 위의 20px 아이콘 버그까지 겹치면서 아이콘/버튼이
border에 거의 붙어 보이거나 focus ring이 border를 넘어가 보이는 문제로
이어졌다(Image #3). `data-size`(`InputGroupButton`이 이미 갖고 있던
장식용 attribute)를 이용해 **아이콘 전용 버튼만 이 보정에서 제외**
(`has-[>button:not([data-size^='icon'])]:mr-*`)했다 — 텍스트 버튼은
기존처럼 보정을 받고, 아이콘 버튼은 addon의 `pr-2`/`pl-2`(8px) 전체를
그대로 받는다.

실측(lg Password 행 눈 아이콘 버튼 기준): border까지 클리어런스가
4px→9px로, svg 자체는 6px→13px로 늘어났고 focus ring도 더 이상 border를
넘지 않는 것을 스크린샷으로 확인했다.

**아이콘을 Input 폰트 크기와 똑같이 맞추지는 않는 이유**: 아이콘은
타이포그래피가 아니라 별도의 시각 언어라, 텍스트 px 수치에 1:1로 맞출
필요는 없다 — 그래서 폰트(14/16/18)나 Button 아이콘 스케일(16/20/20)을
그대로 가져오지 않고, 훨씬 완만한 자체 계단(16/18/20)을 새로 정했다.
Textarea 폰트를 Input md에 맞춘 것(입력 필드끼리의 타이포그래피 정렬)과는
다른 문제이지만, "아예 고정"도 아니고 "폰트와 동일"도 아닌 중간 지점을
찾은 것이다.

## addon과 맞닿은 쪽 Input padding — 결국 아예 안 깎기로 최종 결정

**세 단계를 거쳤다.**

1. 원본(shadcn 단일 사이즈)은 addon 쪽 Input padding을 `pl-1.5`/
   `pr-1.5`(6px)로 고정 보정했다. 우리가 사이즈를 3개로 늘리면서 이걸
   그대로 뒀더니, Input 자신의 기본 padding(10/12/14)과 격차가 lg에서
   특히 커 보이는 문제가 있었다.
2. 그래서 이 보정값 자체를 사이즈별로 다르게(`space.4`/`6`/`8`,
   sm/md/lg) 만들었다 — padding-x/y 계단과 같은 +2 간격 원칙. 격차가
   사이즈에 비례해서 커지진 않게 됐지만, 여전히 addon 쪽(4/6/8)과
   반대쪽(10/12/14) 사이에 매 사이즈마다 6px 차이가 남아있었다.
3. 이 6px 차이가 "아이콘/텍스트 옆이 상대적으로 좁아 보인다"는 문제로
   다시 지적됐다 — 예를 들어 lg에서 addon 쪽이 8px인데 반대쪽은 14px라
   6px만큼 좁아 보인다는 것. **"간격 6을 추가해서 14를 맞추자"**는
   구체적인 제안을 그대로 받아들여, addon 쪽 보정 자체를 없앴다 — 이제
   addon 유무와 무관하게 Input은 항상 자기 Recipe padding(10/12/14)을
   그대로 쓴다.

실측 확인(아이콘/텍스트/버튼 세 종류 addon 전부, sm/md/lg 전부):
Input의 `padding-left`/`padding-right`가 addon 유무와 무관하게 정확히
10px/12px/14px로 렌더링됨(`getComputedStyle` 확인).

> shadcn 원본은 이 보정을 계속 유지하는 이유(addon 자신의 여백이 이미
> 있으니 Input이 그만큼 덜 필요하다는 논리)가 있지만, 우리는 icon-to-text
> 간격이 "addon 없는 쪽의 여백과 시각적으로 동등하게 느껴져야 한다"는
> 요구사항을 우선했다 — 결과적으로 전체 폭(테두리→아이콘→텍스트)은
> 원본보다 넉넉해지지만, "한쪽만 유독 좁아 보이는" 문제는 완전히
> 사라진다.

### 4단계 — 그런데 이 padding 통일은 addon 자신의 padding(pl-2/pr-2)까지는 못 건드리고 있었다

3단계에서 고친 건 "Input 자신의 padding"이었는데, **addon 컨테이너
자신의 border 쪽 padding(`pl-2`/`pr-2`, 8px)은 그대로 고정**이었다.
그래서 "아이콘/텍스트가 있는 행"(border → addon의 고정 8px → 아이콘)과
"addon이 아예 없는 행"(border → Input 자신의 padding 10/12/14 → 텍스트)
사이에 여전히 시작 위치가 어긋나는 문제가 남아있었다 — border에서
첫 번째로 보이는 콘텐츠까지의 거리가 사이즈/케이스마다 달라 보인다는
지적으로 다시 확인됨.

**수정**: addon 자신의 `pl-2`/`pr-2`도 (버튼이 없는 경우에 한해) Input과
동일한 10/12/14로 맞췄다. 실측 확인 — 아이콘/텍스트/버튼-없음 세 케이스
모두 border→첫 콘텐츠 거리가 완전히 동일(sm 10px/md 12px/lg 14px,
`getBoundingClientRect()`로 셋 다 일치 확인).

### 5단계 — 단, 버튼이 들어있는 addon은 이 통일에서 제외한다

4단계 수정을 **버튼이 들어있는 addon에도 그대로 적용했더니** 문제가
생겼다 — 우리가 만든 "Search + X 지우기 버튼" 행이 shadcn 공식 예제의
복사 버튼(`x.com/shadcn` + copy 아이콘)보다 오른쪽 여백이 눈에 띄게
넓어 보였다. 원본을 다시 대조해보니, **원본은 버튼이 들어있는 addon의
padding을 사이즈와 무관하게 항상 고정(8px)** 해서 쓴다 — 버튼은
텍스트/아이콘과 달리 그 자체로 hit-target을 가진 컨트롤 chrome이라,
Input의 타이포그래피 정렬 기준(10/12/14)을 따를 이유가 없다는 뜻이다.

그래서 addon의 padding 규칙을 자식 종류에 따라 분리했다 —
`has-[>button]:pl-2/pr-2`(버튼 있으면 원본처럼 고정 8px) vs
`not-has-[>button]:in-data-[group-size=*]:pl-*/pr-*`(버튼 없으면 4단계의
10/12/14 반응형). 실측 확인:

- 텍스트 addon(`$`/`USD`, 버튼 없음): 좌우 모두 sm 11px/md 13px/lg 15px
  (1px은 border, 실제 padding 10/12/14) — 여전히 Input 자신의 padding과
  정렬됨.
- 버튼 addon(X 지우기): sm/md/lg 전부 **9px 고정**(1px border 포함,
  실제 padding 8px) — 사이즈와 무관, 공식 예제와 동일한 간격.
- 복사 버튼 케이스(`x.com/shadcn`)도 스크린샷으로 원본과 나란히 비교해
  간격이 같아 보이는 것을 확인했다.

## InputGroupText 폰트 크기도 Input과 동일하게 스케일한다

아이콘과 달리 `InputGroupText`(prefix/suffix 텍스트, 예: `$`, `https://`,
`USD`)는 **타이포그래피 콘텐츠**라 Input 자신의 폰트 계단(14/16/18,
sm/md/lg)을 그대로 따라간다 — 아이콘처럼 완만한 별도 계단(16/18/20)을
새로 만들지 않고 Input과 완전히 동일한 값을 썼다. `$ 0.00 USD`처럼
addon 텍스트와 Input 텍스트가 한 줄처럼 읽히는 경우, 서로 크기가 다르면
바로 티가 나기 때문 — Textarea 폰트를 Input md에 맞춘 것과 같은 이유
(둘 다 "텍스트 요소끼리는 정렬돼야 한다"는 원칙), 아이콘(별도 시각
언어)과는 다른 판단이다. `in-data-[group-size=*]` 선택자로 구현했고,
내부에 아이콘이 들어가는 경우(`InputGroupText`에 아이콘+텍스트를 같이
넣는 코드 에디터 파일명 같은 패턴)를 위해 svg 크기도 Addon과 동일한
16/18/20 계단을 함께 적용했다.

### 고친 부분: `sm` tier가 Button의 커진 기본값에 그대로 노출돼 있었다

원본 shadcn은 `size: sm: ""`(빈 문자열)로 두고 내부 `Button`의 자체
기본값에 맡겼다 — 원본 Button의 기본 height가 `h-8`(32px)로 작아서
자연스럽게 컴팩트했다. 그런데 BDS Button은 기본값이 `md`(48px, 아이콘
20px)로 훨씬 커서, 이 빈 문자열을 그대로 두면 `InputGroupButton
size="sm"`이 의도치 않게 48px 높이로 렌더링되는 문제가 있었다. `h-8
gap-1.5 rounded-[var(--input-radius)] px-2`를 명시로 지정해 원래 의도
(컴팩트한 텍스트+아이콘 버튼)를 되살렸다.

------------------------------------------------------------------------

## 버그 수정: `InputGroupAddon`의 disabled 스타일이 실제로 한 번도 적용된 적 없었음

`InputGroupAddon`은 `group-data-[disabled=true]/input-group:opacity-50`로
disabled 시 흐려지도록 되어 있었는데, **`InputGroup` 자신은
`data-disabled` 속성을 아무 데서도 설정하지 않는다** — 루트의 배경
처리도 `has-disabled:bg-[var(--surface-disabled)]`처럼 `:has()` 기반
셀렉터를 쓰지, `data-disabled` 속성을 실제로 찍어주지는 않는다. 그래서
이 규칙은 opacity였을 때도 **셀렉터 조건 자체가 절대 참이 될 수 없어
한 번도 발동한 적이 없었다**(Input/Textarea와 같은 "opacity vs token"
문제가 아니라, 그보다 앞선 "트리거 자체가 안 걸림" 문제).

색상 토큰 교체(`text-[var(--content-disabled)]`)와 함께, 셀렉터도
`group-data-[disabled=true]/input-group:`에서
`group-has-disabled/input-group:`로 바꿨다 — `InputGroup` 안에
`:disabled` 자손이 **있는지(has)** 직접 검사하는 방식이라, 루트의
`has-disabled:bg-...`와 동일한 메커니즘을 쓴다. 실측 확인: disabled
`InputGroupInput` 옆의 검색 아이콘 addon이 `rgb(200, 204, 211)`로
정상적으로 흐려짐(수정 전엔 `opacity: 1`, 색도 그대로였음).

------------------------------------------------------------------------

## Project Override 지점 (현재)

`--input-radius` 공유 외 별도 변수 없음.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **size 자동 전파 없음**: 위 설명대로 의도적 결정.
- **`InputGroupAddon`의 disabled 표현이 여전히 opacity 기반**
  (`group-data-[disabled=true]/input-group:opacity-50`) — Addon은 아이콘·
  텍스트·kbd·버튼 등 이질적인 자식을 담을 수 있어 Input/Label처럼 "배경 하나"를
  고정 토큰으로 바꾸는 방식이 그대로 적용되지 않는다. 각 자식 타입별로
  개별 처리하는 대신 전체를 한 번에 흐리게 하는 opacity를 의도적으로
  남겨뒀다 — Field의 카드형 checked/disabled 표현과 같은 성격의 예외.
- **`[&>kbd]:rounded-[calc(var(--radius)-5px)]`**: shadcn 원본의 범용
  `--radius` 변수를 그대로 참조(kbd 뱃지 전용, BDS `--input-radius`와
  연결하지 않음) — 범위 밖, kbd 사용이 실제로 필요해지면 재검토.
- **Dark mode 값 미분리**: Button/Input과 동일한 기존 gap.
