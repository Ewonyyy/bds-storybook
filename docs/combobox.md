# Combobox

Combobox는 텍스트 입력으로 목록을 검색/필터링해 값을 고르는 컴포넌트입니다.
단일 선택과 Chips 기반 다중 선택을 모두 지원합니다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui (Base UI `@base-ui/react/combobox`) — 구조 · 접근성 ·
  필터링/키보드 로직은 원본 그대로 채용하고, Color만 BDS Semantic Token으로
  교체했다.
- 코드: `src/components/ui/combobox.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/combobox`

------------------------------------------------------------------------

## 서브컴포넌트

- `Combobox` (`ComboboxPrimitive.Root`)
- `ComboboxInput` — 단일 선택용. `InputGroup` 위에 얹혀서 trigger 아이콘/clear
  버튼을 addon으로 담는다 (`showTrigger`/`showClear` prop).
- `ComboboxTrigger` / `ComboboxClear` — `ComboboxInput`이 내부적으로 조립해
  쓰는 조각. 단독 사용도 가능.
- `ComboboxContent` — `Portal` > `Positioner` > `Popup`
- `ComboboxList` / `ComboboxItem` / `ComboboxGroup` / `ComboboxLabel` /
  `ComboboxCollection` / `ComboboxEmpty` / `ComboboxSeparator`
- `ComboboxChips` / `ComboboxChip` / `ComboboxChipsInput` — 다중 선택(`multiple`)
  전용. `ComboboxValue`의 render prop으로 선택된 항목을 chip으로 그린다.
- `useComboboxAnchor` — Chips 모드에서 Positioner의 `anchor`로 넘길 ref 헬퍼.

------------------------------------------------------------------------

## Size

`sm` / `md` / `lg` 세 단계를 지원한다(`ComboboxInput`/`ComboboxChips` 둘 다
같은 prop). Input과 동일한 Recipe(`input.md` 참고)를 그대로 재사용한다 —
Combobox만을 위한 별도 스케일을 새로 만들지 않았다.

| | sm | md | lg |
|:---|:---|:---|:---|
| height (`ComboboxInput`) | `size.40` | `size.48` | `size.56` |
| min-height (`ComboboxChips`) | `size.40` | `size.48` | `size.56` |
| typography | `typography.text.14-r` | `typography.text.16-r` | `typography.text.18-r` |
| padding-x (`ComboboxInput`/`ComboboxChips` 공통) | `space.10` | `space.12` | `space.14` |
| padding-y (`ComboboxChips` 전용, 아래 설명 참고) | `space.8`(8px) | `space.10`(10px) | `space.12`(12px) |
| trigger/clear 아이콘 | `size.16` | `size.18` | `size.20` |

`ComboboxInput`은 내부적으로 `InputGroup`을 그대로 쓰므로, `size`를
`InputGroup`과 `InputGroupInput` 양쪽에 동일하게 전달한다 — size가 자동으로
전파되지 않는 `InputGroup`의 알려진 gap(`input-group.md` 참고)과 동일한
이유다. trigger(`ChevronDown`)/clear(`X`) 아이콘은 `InputGroupButton`의
Group-size 반응형 계단(16/18/20px)을 그대로 물려받는다 — 실측 확인
(`getBoundingClientRect()`): sm=16×16px, md=18×18px, lg=20×20px.

`ComboboxChips`는 Input과 동일한 padding-x/typography를 갖는 자체 `cva`
Recipe를 새로 정의했다(높이가 아니라 **min-height**인 이유는 Chips가 여러
줄로 줄바꿈될 수 있어서 — 원본도 고정 height가 아니라 min-height였다).
**개별 `ComboboxChip`(뱃지 자체의 높이 21px, ChipRemove 16px/아이콘
12px)은 컨테이너 size와 무관하게 항상 고정이다** — `InputGroupButton`의
hit-target이 Group size와 무관하게 고정인 것과 같은 이유로, Chip은 그
자체로 완결된 chrome 단위이지 컨테이너를 채우며 늘어나는 타이포그래피
콘텐츠가 아니라고 판단했다.

**padding-y만 Input의 10/12/14와 다른 값(8/10/12)을 쓴다.** `min-height`는
`height`(Input이 쓰는 고정값)와 달리 "border + padding + content" 합이
목표(40/48/56)를 넘는 순간 그 합만큼 그대로 늘어난다. 이 컨테이너의
실제 content 높이는 Chip 배지(고정 21px, sm에서 우세)와
`ComboboxChipsInput`의 폰트 line-height(text-sm/base/lg 기본값
20/24/28px, md/lg에서 우세) 중 더 큰 쪽이라, Input과 같은 10/12/14를
그대로 썼다면 sm은 41px, md/lg는 각 48px/56px를 그대로 유지하지 못하고
근소하게(1~3px) 넘쳤다.

`border(2px) + padding-y×2 + max(21, line-height) = 목표 높이`로 역산한
이상적인 padding-y는 8.5/11/13px였지만, Foundation Spacing 토큰
(`space.2/4/6/8/10/12/14...`, 전부 짝수)에는 없는 값이다. `input.md`가
lg padding-y(계산값 14.5px → `space.14`로 스냅)에서 세운 "가장 가까운
Foundation token으로 스냅하고 근소한 오차는 감수한다" 원칙을 그대로
따라, 인접한 두 토큰(예: sm은 `space.8`/`space.10`) 중 실측 높이가
목표에 더 가까운 쪽으로 스냅했다. Chip 크기·padding-x는 전혀 건드리지
않았고, 어떤 콘텐츠도 잘리지 않는다.

실측 확인(`getBoundingClientRect()`, 빈 상태·Chip 채운 상태 모두, 두
후보 토큰 각각 렌더링해 비교): `space.8`/`space.10`/`space.12`로
스냅한 결과가 sm/md/lg 전부 정확히 40px/48px/56px로 목표와 오차 없이
일치했다 — 반대쪽 후보(`space.10`/`space.12`/`space.14`)는 각각
42~43px/50px/58px로 목표를 넘겼다. 여러 줄로 줄바꿈되는 경우엔 여전히
`min-height`답게 그 이상으로 자연스럽게 늘어난다(실측: 7개 chip
줄바꿈 시 71px).

```tsx
<ComboboxInput size="lg" placeholder="..." />
<ComboboxChips size="lg">...</ComboboxChips>
```

------------------------------------------------------------------------

## 고친 부분: ComboboxTrigger의 chevron이 Group size와 무관하게 16px로 고정돼 있었다

`ComboboxTrigger`가 자기 자신의 className에
`[&_svg:not([class*='size-'])]:size-4`를 갖고 있어서, `ChevronDown`
아이콘이 항상 16px로 고정되고 있었다 — `ComboboxClear`(아이콘 크기를
스스로 강제하지 않고 감싸는 `InputGroupButton`의 Group-size 반응형 계단에
전적으로 위임)와 다른 패턴이었다. Size variant를 추가하면서 md/lg에서
trigger 아이콘만 16px에 머물러 clear 버튼 아이콘(18/20px)과 어긋나는 게
확인되어, `ComboboxTrigger` 자신의 강제 사이즈 클래스를 제거하고
`ComboboxClear`와 동일하게 `InputGroupButton`에 위임하도록 통일했다.

------------------------------------------------------------------------

## Color / State

Popover/Menu 계열(`Toast`와 동일 패턴)의 Semantic Token을 그대로 재사용한다 —
Combobox만을 위한 새 토큰은 만들지 않았다.

| 요소 | 값 | 대응 BDS Token |
|:---|:---|:---|
| Content 배경 | `bg-popover` | `surface.elevated` |
| Content 텍스트 | `text-popover-foreground` | `content.primary` |
| Content border | `border-[var(--border-subtle)]` | `border.subtle` |
| Item hover/highlighted 배경 | `data-highlighted:bg-accent` | `surface.subtle` |
| Item hover/highlighted 텍스트 | `data-highlighted:text-accent-foreground` | `content.primary` |
| Item disabled 텍스트 | `data-disabled:text-[var(--content-disabled)]` | `content.disabled` |
| Separator | `bg-[var(--border-subtle)]` | `border.subtle` |
| Chips 컨테이너 border | `border-input` | `border.default` |
| Chips 컨테이너 focus ring | `ring-ring/20` | `border.focus` (20% opacity) |
| Chip 배경 | `bg-muted` | `surface.subtle` |
| Chip 텍스트 | `text-foreground` | `content.primary` |

> Focus ring 20%는 Input/InputGroup과 동일하게 맞춘 값이다(원본 `/50`이
> 아니라 이미 `/20`으로 작성돼 있었음 — 별도 수정 불필요, Input 계열과
> 일관됨을 확인만 했다).

------------------------------------------------------------------------

## 고친 부분: ComboboxChip의 ChipRemove 버튼 크기

`ComboboxChip` 안의 `ChipRemove`는 `Button`(`variant="ghost"`
`size="icon-sm"`)을 렌더링하는데, `Button`의 `icon-sm`은 기본 40px(`size-10`)
+ 16px 아이콘이라 6px 높이도 안 되는 Chip(`h-[calc(--spacing(5.25))]`, 21px)
안에 그대로 쓰면 Chip 밖으로 크게 벗어난다. `className="size-4 -ml-1"`로
버튼 자체를 16px로 줄이고, 내부 아이콘도 명시적으로 `size-3`(12px)를 지정해
Chip 높이(21px) 안에 여백을 두고 들어가도록 오버라이드했다.

```
버튼(hit target): 16px (size-4)
아이콘: 12px (size-3)
```

Foundation `Size` 토큰(`size.16` 존재, `size.12`는 미정의)과 정확히
일치하지는 않는 절충값이다 — Chip 자체 높이(21px)가 Foundation 계단에 있는
값이 아니라서, Chip 안에 맞춰 넣는 ChipRemove도 자연히 Foundation 표준
계단 밖의 값을 쓰게 됐다. 별도 재검토 없이 시각적으로 맞는 값을 그대로
확정했다.

------------------------------------------------------------------------

## Radius

- Content: `rounded-[10px]` — Popover 계열 고정값(Toast의 `rounded-2xl`,
  16px와는 다른 스케일). 별도 `--combobox-radius` 변수로 뽑지 않고 원본 값을
  그대로 유지했다.
- Item: `rounded-[8px]`
- Chip: `rounded-[6px]` (`radius.6`)

------------------------------------------------------------------------

## Shadow

Content가 `shadow-[var(--shadow-200)]`를 쓴다 — Foundation `shadow.200`
(`design.md` 참고, Tailwind 기본 `shadow-md`와 동일한 값)을 `bds-tokens.css`의
`--shadow-200` CSS 변수로 참조한 것이다. 값 자체는 기존 `shadow-md`와
동일하므로 시각적으로 달라지는 부분은 없다 — 하드코딩된 Tailwind
유틸리티 대신 BDS Foundation Token을 통해 참조하도록 배선만 바꿨다.

Content 내부 nested `InputGroup`(필터 입력창)의 `shadow-none`은 그대로
Tailwind 유틸리티를 쓴다 — "그림자 제거"는 값이 아니라 상태라
Foundation Token 대상이 아니다.

------------------------------------------------------------------------

## Project Override 지점 (현재)

`--border-subtle` 외 별도 변수 없음. Content radius(10px)/Item radius(8px)도
아직 override 변수로 뽑혀있지 않다 — 반복 필요성이 확인되면 Button/Input과
같은 방식으로 연결점을 추가한다.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **ChipRemove 16px/12px가 Foundation Size 계단 밖의 값**: 위 "ChipRemove
  버튼 크기" 참고, Chip 자체 높이가 표준 계단 밖이라 생긴 절충.
- **`ComboboxChips`의 padding-y(8/10/12px)가 Input의 padding-y(10/12/14)와
  다른 값**: 위 "Size" 섹션 참고 — min-height가 정확히 Input과 동일한
  40/48/56px로 렌더링되도록 Foundation Spacing 토큰 중 목표에 가장 가까운
  쪽으로 스냅한 값이라 Input과 다르다. 의도된 차이이며 버그 아님(이제
  8/10/12 전부 실제 Foundation Spacing 토큰이다 — 이전엔 8.5/11/13px로
  토큰 밖 raw 값을 썼으나 재검토 후 스냅했다).
- **Dark mode 값 미분리**: Button/Input과 동일한 기존 gap.
