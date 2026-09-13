# Input

Input은 사용자로부터 한 줄 텍스트를 입력받는 기본 폼 컴포넌트입니다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui (Base UI `@base-ui/react/input`) — 구조 · 접근성 ·
  keyboard/focus 처리만 채용하고, Size / Color / Radius의 실제 값은 BDS가
  소유한다.
- 코드: `src/components/ui/input.tsx`

------------------------------------------------------------------------

## Size

`sm` / `md` / `lg` 세 단계를 지원한다. Button과 달리 Input은
`inline-flex items-center`로 세로 중앙정렬을 하지 않는 네이티브 `<input>`
이므로, **padding-y + line-height의 합이 height와 맞아야** 텍스트가
박스 안에서 시각적으로 중앙에 온다. Size는 height + typography + padding-x
+ padding-y가 함께 움직이는 **Recipe**다. (아이콘/gap은 Input 자체 범위가
아님 — `InputGroup` 몫.)

| | sm | md | lg |
|:---|:---|:---|:---|
| height | `size.40` | `size.48` | `size.56` |
| typography | `typography.text.14-r` | `typography.text.16-r` | `typography.text.18-r` |
| padding-x | `space.10` | `space.12` | `space.14` |
| padding-y | `space.10` | `space.12` | `space.14` |

> **padding-x는 Button 스케일을 가져오지 않는다.** 처음엔 Button의
> padding-x(`space.16/20/20`)를 그대로 썼는데, 실제로 렌더링해보니 shadcn
> 원본 Input(`px-2.5`=10px, 단일 사이즈)보다 훨씬 넓어서 특히 InputGroup에
> 아이콘이 붙었을 때(좌우 패딩이 `space.6`=6px로 좁아짐)와 아이콘이 없을 때의
> 차이가 지나치게 크게 느껴졌다. Button 값을 버리고 shadcn 원본 앵커(10px)를
> 기준으로 사이즈별로 완만하게 스케일했다 — 결과적으로 **padding-x와
> padding-y가 각 사이즈에서 동일한 값(10/12/14)**이 됐다. Input은 Button처럼
> "가로로 넉넉한 버튼"이 아니라 "원본에 가까운 좁은 텍스트 필드"가 목표라는
> 판단.
>
> **padding-y 계산 근거**: `(height - line-height) / 2`
> - sm: `(40 - 14×1.4) / 2 = 10.2px` → 가장 가까운 Foundation 값인
>   `space.10`으로 고정.
> - md: `(48 - 16×1.5) / 2 = 12px` → `space.12`, 정확히 떨어짐.
> - lg: `(56 - 18×1.5) / 2 = 14.5px` → Foundation에 `space.14.5`는 없으므로
>   가장 가까운 `space.14`로 고정(0.5px 오차). 네이티브 `<input>`은 브라우저가
>   content box 안에서 값을 자체적으로 세로 중앙정렬하는 렌더링 특성이 있어
>   실제 화면에서는 이 0.5px 오차가 보이지 않는다(Preview로 확인됨).
> - padding-x는 이 padding-y 계단(10/12/14)을 그대로 따라간 것이지, 별도로
>   height 대비 비율 계산을 한 값은 아니다 — 우연히 같은 계단이 됐다.
>
> Input의 텍스트는 Button의 label(`m`, medium)과 달리 **regular(`r`,
> 400 weight)**를 사용한다 — 입력값은 강조가 필요한 라벨이 아니라 사용자가
> 타이핑하는 콘텐츠이기 때문.

### 새 Size 추가 / 변경 규칙

Button과 동일 원칙을 따른다: 기존 값 변경 시 Recipe 전체를 Preview에서
재검토하되 필요한 값만 override, 완전히 새로운 Size 추가 시 임의 보간 없이
Foundation 값 기준으로 직접 계산한다.

------------------------------------------------------------------------

## Radius

- `--input-radius: var(--control-radius)`(4px) — `--button-radius`와
  **별도 변수**로 분리했다. 프로젝트가 Button과 Input의 radius를 따로
  override할 수 있어야 하기 때문(예: Input만 pill로 바꾸는 케이스).
- 모든 Size가 동일한 `--input-radius` 하나를 참조한다. 숨겨진 `min()`
  clamp는 쓰지 않는다(Button과 동일 원칙).

------------------------------------------------------------------------

## Border

- 기본 상태 border는 `border.default`(1px, 항상 존재) — Button과 달리
  Input은 border 유무가 variant 전환에 따라 바뀌는 컴포넌트가 아니라
  **상시 노출되는 폼 필드**이므로, Button의 "outline variant만 border"
  결정은 적용하지 않는다(button.md에 명시된 대로 컴포넌트마다 재검토 대상).
- Disabled: `border.disabled`
- Invalid(`aria-invalid`): shadcn 원본(`--destructive`, 곧
  `status.error`) 그대로 유지, BDS 전용 재정의는 하지 않음(Button과 동일
  판단).

------------------------------------------------------------------------

## Color / State

| 상태 | Background | Text | Border |
|:---|:---|:---|:---|
| Default | `surface.default`(투명 위에 렌더링, `bg-transparent`) | `content.primary` | `border.default` |
| Placeholder | — | `content.placeholder`(직접 참조) | — |
| Disabled | `surface.disabled` | `content.disabled` | `border.disabled` |
| Invalid | 변경 없음 | 변경 없음 | `status.error`(destructive) |

> **Placeholder = `content.placeholder`(`gray-purple.500` `#767680`).** shadcn 원본은
> `placeholder:text-muted-foreground`(어댑터 경유 → `content.secondary` `gray-purple.600`)를
> 썼는데, 이 값이 Description/Helper 가독성 기준이라 진해서 입력값(`content.primary`)과
> 구분이 약했다. `design.md`에서 Placeholder 전용 Semantic 토큰을 분리하면서 한 단계
> 옅은 `gray-purple.500`으로 바꿨고(근거는 `design.md` Content 섹션), Component는
> 어댑터를 거치지 않고 `placeholder:text-[var(--content-placeholder)]`로 직접 참조한다.
> Disabled일 때는 아래 "버그 수정"대로 `content.disabled`가 덮는다.

> **Disabled를 opacity로 처리하지 않는다.** shadcn 원본은
> `disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80` 같은
> opacity 트릭을 쓰지만, 이 방식은 배경에 따라 실제 렌더링 색이 달라지고
> light/dark마다 다른 opacity 값을 따로 관리해야 하는 문제가 있다(Button
> POC에서 이미 같은 이유로 제거됨). Input도 동일하게 고정 hex 기반
> semantic 토큰(`surface.disabled`/`content.disabled`/`border.disabled`)
> 조합으로 교체했다 — 배경과 무관하게 항상 같은 대비를 보장한다.

### Focus / Invalid

- **Focus**: `--ring`이 이미 `border.focus`로 연결되어 있다(design.md
  shadcn adapter 참고, Button과 동일). Ring 투명도는 `20%`
  (`focus-visible:ring-ring/20`) — Button/Input에서 확정된 값과 동일.
- **Invalid**: shadcn 원본의 `aria-invalid:*`를 그대로 유지(BDS 전용
  재정의는 하지 않음, 필요해지면 별도 검토).

------------------------------------------------------------------------

## Typography

`font.family.default`(Pretendard)를 상속한다. 각 Size Recipe는
regular(`r`, 400) weight의 typography token을 사용한다(Button의 medium과
차이, 위 Size 섹션 참고).

------------------------------------------------------------------------

## `size` prop과 네이티브 HTML `size` 속성 충돌 (알려진 결정)

`<input>`은 원래 네이티브 HTML `size` 속성(보이는 문자 수 지정, 예:
`<input size={20}>`)을 갖고 있다. BDS Input의 `size` prop(`sm`/`md`/`lg`)은
이 네이티브 속성을 **의도적으로 가린다**(`Omit<ComponentProps<"input">,
"size">`로 타입 분리). 네이티브 `size` 속성이 실제로 필요한 케이스는 이번
범위에서 다루지 않는다 — 필요해지면 `htmlSize` 같은 별도 prop을 열어주는
방식(MUI 등에서 쓰는 패턴)으로 추가 검토한다.

------------------------------------------------------------------------

## 버그 수정: disabled여도 placeholder 색이 안 바뀌던 문제

`disabled:text-[var(--content-disabled)]`는 입력된 값의 텍스트 색만
바꾸고 `::placeholder` 가상요소에는 안 먹힌다 — 그래서 disabled 상태에서
값이 없어 placeholder만 보이는 경우(예: "State × Size 매트릭스"의
Disabled 행), 테두리/배경은 disabled 톤인데 텍스트만 기본 placeholder
색(`content.placeholder`)으로 남아있었다. `disabled:placeholder:text-[var(--content-disabled)]`를
추가해서 값 텍스트와 placeholder 둘 다 같은 disabled 색을 쓰도록
맞췄다. 실측 확인: 값/placeholder 둘 다 `rgb(199, 197, 208)`(`content.disabled`).

------------------------------------------------------------------------

## Project Override 지점 (현재)

| 변수 | 기본값 | 용도 |
|:---|:---|:---|
| `--input-radius` | `var(--control-radius)` (4px) | 전체 radius override, `--button-radius`와 독립 |

height / font / padding-x / padding-y는 아직 별도 변수로 뽑혀있지 않다
(Button과 동일한 이유 — 반복 필요성이 확인되면 그때 연결점 추가).

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **`type="file"` 스타일**: `file:*` 클래스가 사이즈와 무관하게
  고정값(`file:h-6 file:text-sm`)이다. shadcn 원본도 사이즈 대응이 없었고
  이번 라운드는 텍스트 입력 사이즈 Recipe가 목적이라 별도 대응하지 않음.
- **Icon / InputGroup**: Input 자체는 아이콘을 갖지 않는다. 검색창처럼
  아이콘이 붙는 조합은 `InputGroup`(Field 포함) 차례에서 다룬다.
- **Dark mode 값 미분리**: `bds-tokens.css`가 아직 light 단일 세트만
  정의하고 있어 dark에서도 같은 값이 쓰인다 — Button POC와 동일한 기존
  gap, 이번 라운드에서 별도로 손대지 않음.
