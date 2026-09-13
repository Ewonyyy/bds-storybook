# Button

Button은 사용자의 조작을 트리거하는 기본 인터랙티브 컴포넌트입니다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui (Base UI `@base-ui/react/button`) — 구조 · 접근성 ·
  keyboard/focus 처리만 채용하고, Size / Color / Radius / Variant의 실제
  값은 BDS가 소유한다.
- 코드: `src/components/ui/button.tsx`

------------------------------------------------------------------------

## Variant

- `default` (Primary Fill)
- `secondary` (Secondary Fill)
- `outline`
- `ghost`
- `destructive` (Danger, 연한 톤)
- `link`

> `destructive`는 `interactive.danger`(design.md 참고)가 정의된 뒤
> 재작업했다. 한 번은 default/secondary와 같은 solid fill로 만들었다가,
> "default/secondary가 이미 solid를 쓰고 있어서 destructive까지 solid면
> 구분이 안 된다"는 지적을 받고 되돌렸다 — 최종적으로는 shadcn 원본
> (`base-nova` 스타일)과 같은 **연한 배경 + 진한 텍스트** 룩을 유지하되,
> 원본의 opacity(`bg-destructive/10` 등)를 고정 Foundation 값
> (`interactive.danger.subtle*`)으로 대체했다 — 아래 Color/State 참고.

------------------------------------------------------------------------

## Size

`sm` / `md` / `lg` 세 단계를 지원한다. Size는 height 하나가 아니라
height + typography + padding-x + icon + gap이 함께 움직이는 **Recipe**다.

| | sm | md | lg |
|:---|:---|:---|:---|
| height | `size.40` | `size.48` | `size.56` |
| typography | `typography.text.14-m` | `typography.text.16-m` | `typography.text.18-m` |
| padding-x | `space.16` | `space.20` | `space.20` (md 상속) |
| icon | `size.16` | `size.20` | `size.20` (md 상속) |
| gap | `space.6` | `space.8` | `space.8` (md 상속) |

> lg의 padding-x / icon / gap은 md 값을 그대로 상속한다 — 새 값을
> 보간해서 만들지 않는다는 원칙에 따른 것이며, shadcn 원본도 큰 사이즈에서
> 동일한 plateau 패턴을 보인다(근거 있음).
>
> `typography.text.18-*`는 이 Recipe를 위해 `design.md`에 신규 추가된
> 토큰이다(기존 Figma 대응 없음, line-height는 `text.16` 앵커에서 상속).

### Icon-only

`sm`/`md`/`lg`와 같은 height를 갖는 정사각형 버튼이다. `icon-sm` /
`icon-md` / `icon-lg`.

| | icon-sm | icon-md | icon-lg |
|:---|:---|:---|:---|
| size | `size.40` | `size.48` | `size.56` |
| icon | `size.16` | `size.20` | `size.20` |

### 새 Size 추가 / 변경 규칙

- **기존 Size 값 변경**(예: md 48 → 44): Recipe 5개 속성 전체를 Preview에서
  재검토하되, 실제로 필요한 값만 override한다. 나머지는 그대로 상속.
- **완전히 새로운 Size 추가**(예: xl): 5개 속성 전체를 Foundation 값
  기준으로 새로 정의한다. 임의 보간 금지 — 인접 Recipe(sm/md/lg)에 없는
  값이 필요하면 앵커 값을 그대로 상속한다.

------------------------------------------------------------------------

## Radius

- `--control-radius: radius.4`(4px, BDS 기본값) → `--button-radius: var(--control-radius)`
- 모든 Size가 동일한 `--button-radius` 하나를 참조한다. Size별로 radius를
  자동으로 깎는 숨겨진 계산(`min()` clamp)은 쓰지 않는다.
- 특정 Size에서 시각적 보정이 필요하면, 그 Size Recipe에 radius 값을
  명시적으로 적는다 — 숨겨진 계산이 아니라 Preset에서 명시적으로 결정한다.
- 프로젝트 override는 `--button-radius` 하나만 바꾸면 전체 Size에 적용된다
  (예: `999px`로 pill).

------------------------------------------------------------------------

## Border

- **`outline` variant만 실제 border를 갖는다** (`border.default`, 1px).
- 나머지(`default`/`secondary`/`ghost`/`destructive`/`link`)는
  **border-width 0** — 투명 border로 자리를 맞추지 않는다.
- 이유: Button은 상호작용 중에 variant 자체가 서로 바뀌는 경우가 없다
  (예: hover로 fill → outline 전환되는 케이스가 없음). 콘텐츠 박스 정렬
  보다, fill 버튼은 border가 아예 없는 게 시각적으로 더 깨끗하다는 실사용
  판단을 우선했다.
- 이 규칙은 **Button에 한정된 결정**이다. 다른 컴포넌트(Input/Select 등)는
  상태에 따라 실제로 variant/state가 전환되는 경우가 있을 수 있으므로,
  그때는 border-width 통일이 다시 필요할 수 있다 — 컴포넌트마다 재검토.

------------------------------------------------------------------------

## Color / State

| Variant | Background | Text | Border | Hover BG | Active/Pressed BG |
|:---|:---|:---|:---|:---|:---|
| default | `interactive.primary.default` | `content.inverse` | 없음 | `interactive.primary.hover` | `interactive.primary.pressed` |
| secondary | `interactive.secondary.default` | `content.inverse` | 없음 | `interactive.secondary.hover` | `interactive.secondary.pressed` |
| outline | `surface.canvas` | `content.primary` | `border.default` | `surface.subtle` | — |
| ghost | 없음(투명) | `content.primary` | 없음 | `surface.subtle` | — |
| link | 없음 | `content.primary` | 없음 | (underline만) | — |
| destructive | `interactive.danger.subtle` | `interactive.danger.default` | 없음 | `interactive.danger.subtle-hover` | `interactive.danger.subtle-hover`(hover와 동일) |

> State 색상은 항상 고정 Semantic 토큰만 참조한다. `hover:bg-primary/80`
> 같은 opacity/color-mix 즉흥 계산은 쓰지 않는다.
>
> **`link`은 원래 `interactive.primary.default`(= brand purple, `text-primary`)를
> 썼는데 `content.primary`(본문 텍스트와 같은 near-black)로 바꿨다** —
> `link`을 브랜드 컬러로 두면 "이 텍스트가 곧 Primary 액션"이라는 신호를
> `default` variant와 나눠 갖게 돼서, 정작 화면에서 제일 강조돼야 할
> Primary 액션의 존재감이 흐려진다. `link`은 색으로 강조하기보다 "본문
> 속에 자연스럽게 섞여 있다가 hover 시 밑줄로만 반응하는" 절제된 링크에
> 가깝다고 보고 본문 텍스트 색을 그대로 가져왔다 — Ghost/Outline의 기본
> 텍스트 색과도 동일해져서 "색 없는 3개 variant(outline/ghost/link)는
> 전부 같은 텍스트 색"이라는 일관성도 생긴다. (참고: 기존 표는 코드와 달리
> `content.brand`라고 잘못 적혀 있었다 — 값 자체는 같은 purple.500이라
> 눈으로는 안 드러났지만, 실제 코드는 `interactive.primary.default`를
> 참조하고 있었다. 이번에 코드/문서 둘 다 `content.primary`로 정리했다.)
> **destructive만 solid가 아니라 연한 톤(subtle)이다** — default/secondary는
> "solid fill"이라는 시각 언어를 이미 쓰고 있어서, destructive까지 solid로
> 가면 둘을 구분하기 어렵고 danger 전용 톤이 사라진다는 지적을 받아들여
> **연한 배경 + 진한 텍스트** 조합으로 확정했다. shadcn 원본(`base-nova`
> 스타일)도 이 룩을 쓰는데, 원본은 opacity(`bg-destructive/10` 등)로
> 구현했던 것과 달리 BDS는 고정 Foundation 값(`red.50`/`100`)으로
> 구현한다 — 실제 계산해보면 이 값들이 opacity 결과와 거의 정확히
> 일치해서(`design.md` "Interactive" 섹션 참고) 같은 룩을 배경 의존성
> 없이 재현한다. 실측 확인(rest/hover/active): `#ffeaec`/`#fdd4d6`/
> `#fdd4d6` 정확히 일치.
>
> **Pressed는 별도 값을 안 만들고 Hover와 동일하게 뒀다** — shadcn 원본도
> destructive에 press 전용 색이 없다(마우스를 누르려면 이미 hover를
> 거치므로 원본에서도 사실상 항상 같은 색으로 보임). `primary`/`secondary`
> 처럼 3단계가 필요할 근거가 없어서 세 번째 값을 새로 만들지 않았다.

### Disabled (뒤늦게 고침)

Button POC 최초 버전은 `disabled:opacity-50`(shadcn 원본 그대로)를 그대로
뒀었다 — Input/Textarea에서 opacity 트릭을 고정 토큰으로 교체한 것과
같은 원칙이 Button에는 적용이 안 돼 있던 상태였다(Input Group 작업
중 매트릭스로 전체 상태를 나열해보다가 발견). 뒤늦게 동일한 원칙으로
교체했다:

| Variant | Disabled Background | Disabled Border | Disabled Text |
|:---|:---|:---|:---|
| default / secondary / destructive | `surface.disabled` | 없음 | `content.disabled` |
| outline | 변경 없음(투명 유지) | `border.disabled` | `content.disabled` |
| ghost / link | 없음(원래 투명) | 없음 | `content.disabled` |

> `destructive`도 `interactive.danger`가 확정된 뒤에는 다른 filled
> variant와 동일하게 disabled 시 `surface.disabled`로 통일했다 —
> destructive 색상이 무엇이든 disabled 취급은 filled variant 공통이라는
> 판단.

### Focus / Invalid

- **Focus**: `--ring`이 이미 `border.focus`로 연결되어 있다(design.md
  shadcn adapter 참고). 별도 작업 불필요. box-shadow 기반 ring만 쓰고,
  border-width는 늘리지 않는다.
- **Invalid**: shadcn 원본의 `aria-invalid:*`를 그대로 유지한다(BDS 전용
  재정의는 하지 않음, 필요해지면 별도 검토).

------------------------------------------------------------------------

## Typography

`font.family.default`(Pretendard)를 상속한다. Weight suffix(`b`=600,
`m`=500, `r`=400)는 각 Size Recipe의 typography token이 결정한다.

------------------------------------------------------------------------

## Project Override 지점 (현재)

| 변수 | 기본값 | 용도 |
|:---|:---|:---|
| `--button-radius` | `var(--control-radius)` (4px) | 전체 radius override |
| `--interactive-primary-*` / `--interactive-secondary-*` 등 | design.md Semantic 기본값 | 브랜드 컬러 override |

height / font / padding / icon / gap은 아직 별도 변수로 뽑혀있지 않다.
`button.tsx`는 shadcn 방식대로 프로젝트마다 소스가 복사되는 구조이므로,
해당 프로젝트의 복사본에서 직접 값을 바꾸는 게 기본 경로다. 실제로 반복적인
override 필요성이 여러 프로젝트/컴포넌트에서 확인되면, 그때 Radius/Color와
같은 방식으로 연결점을 추가한다.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **Size Recipe의 override 연결점**(`--button-height-*` 등) 없음 — 반복
  필요성이 확인되면 추가.
