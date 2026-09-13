# Badge

Badge는 상태·카테고리·라벨 등 짧은 정보를 표시하는 작은 인라인 컴포넌트입니다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui (Base UI `@base-ui/react/use-render`, `merge-props`) —
  구조 · `render` prop을 통한 태그 교체(`useRender`) 로직은 원본 그대로
  채용하고, Color / Radius의 실제 값은 BDS가 소유한다.
- 코드: `src/components/ui/badge.tsx`

------------------------------------------------------------------------

## 구조

shadcn 원본 구조를 그대로 유지한다.

- `Badge` — 기본 태그는 `<span>`. `render` prop으로 `<a>` 등 다른 태그로
  교체 가능(`useRender` + `mergeProps`).
- Button과 달리 별도 `asChild` prop이 아니라 Base UI의 `render` prop
  패턴을 쓴다.

------------------------------------------------------------------------

## Variant

- `default` (Primary Fill)
- `secondary` (Secondary Fill)
- `destructive` (Danger, 연한 톤)
- `outline`
- `ghost`
- `link`

Button과 동일한 6종 Variant 구성을 그대로 따른다.

------------------------------------------------------------------------

## Color / State

| Variant | Background | Text | Border | Hover BG |
|:---|:---|:---|:---|:---|
| default | `interactive.primary.default` | `content.inverse` | 없음 | `interactive.primary.hover` |
| secondary | `interactive.secondary.default` | `content.inverse` | 없음 | `interactive.secondary.hover` |
| destructive | `interactive.danger.subtle` | `interactive.danger.default` | 없음 | `interactive.danger.subtle-hover` |
| outline | 없음(투명) | `content.primary` | `border.default` | `surface.subtle`(bg) / `content.secondary`(text) |
| ghost | 없음(투명) | 없음(상속) | 없음 | `surface.subtle`(bg) / `content.secondary`(text) |
| link | 없음 | `content.primary` | 없음 | (underline만) |

> Hover는 `render`로 `<a>`를 렌더링했을 때만 의미가 있다(Badge는 기본
> `<span>`이라 자체적으로 상호작용하지 않음) — 아래 "Interactive 상태"
> 참고.
>
> **`link`은 Button과 동일한 이유로 `interactive.primary.default`(브랜드
> 퍼플)가 아니라 `content.primary`를 쓴다** — 브랜드 컬러를 Primary
> Action(Button `default`)과 나눠 가지면 화면에서 정작 강조돼야 할
> Primary 액션의 존재감이 흐려진다는 Button 선례를 그대로 따른다.
>
> **`destructive`도 Button과 동일하게 solid가 아니라 연한 톤(subtle)이다**
> — default/secondary가 이미 solid fill을 쓰고 있어서 destructive까지
> solid면 구분이 어렵다는 Button의 판단을 그대로 적용했다. 원본
> shadcn은 opacity(`bg-destructive/10`, hover `/20`)로 구현했지만, BDS는
> 고정 Foundation 값(`interactive.danger.subtle`, `interactive.danger.subtle-hover`)으로
> 대체했다 — 실측값이 opacity 결과와 정확히 일치한다(Button destructive와
> 같은 근거).
>
> **Focus ring**: shadcn 원본 `ring-ring/50`(50%) → BDS는 Button/Input
> 선례대로 `ring-ring/20`(20%)을 사용한다.

### Interactive 상태 (`render`로 `<a>` 렌더링)

Badge 자체는 폼 컨트롤이 아니라서 shadcn 원본에 `disabled` 스타일이
없다. 대신 원본은 `[a&]` 계열 arbitrary-variant로 "이 Badge가 실제로
`<a>` 태그로 렌더링됐을 때만" hover 배경을 적용하는 패턴을 쓰는데, BDS도
동일한 패턴을 그대로 유지한다 — variant별로 각각 구체적인 토큰을 지정한다
(주의: 아래처럼 코드펜스 밖에서 `*` 와일드카드로 뭉뚱그려 쓰면 Tailwind
v4의 전체 프로젝트 자동 스캔이 `.md` 파일까지 읽어서 유효하지 않은 CSS
변수명을 생성해 빌드가 깨진다 — 실제로 한 번 겪었다):

- `default`: `[a]:hover:bg-[var(--interactive-primary-hover)]`
- `secondary`: `[a]:hover:bg-[var(--interactive-secondary-hover)]`
- `destructive`: `[a]:hover:bg-[var(--interactive-danger-subtle-hover)]`

Playwright로 `default`/`secondary`/`destructive`/`ghost` 4개 variant의
hover 전/후 실측 색상을 확인했다 — 모두 위 표의 Hover BG 값과 정확히
일치한다.

------------------------------------------------------------------------

## Icon

`[&>svg]:size-3!`(12px)를 그대로 유지한다. BDS Foundation `Size` 토큰은
`size.16`부터 정의되어 있어(`design.md` Foundation > Size 참고) 12px에
대응하는 토큰이 없다.

→ **shadcn 원본 값(12px) 그대로 유지**한다. Tooltip Arrow(10px)와 같은
케이스 — Foundation에 12px Size 토큰이 추가되면 그때 재검토한다.

`data-icon="inline-start"` / `"inline-end"` 어트리뷰트로 아이콘 인접
패딩(`has-data-[icon=inline-end]:pr-1.5`, `has-data-[icon=inline-start]:pl-1.5`,
6px = `space.6`)이 자동으로 붙는다 — Button/Tabs와 동일한 컨벤션.

------------------------------------------------------------------------

## Radius

Button/Input과 달리 `--badge-radius` 같은 전용 override 변수를 만들지
않았다. 대신 `rounded-full`(shadcn 원본은 `rounded-4xl`, 사실상 pill)을
그대로 사용한다.

> BDS는 "Radius All"(완전한 pill)이라는 개념적 값만 존재하고, 이를 특정
> px 값으로 고정하지 않는다 — Badge 높이가 바뀌어도 항상 완전한 pill을
> 유지해야 하므로, 고정 px보다 `rounded-full`(50%)이 의도에 더 맞는다.
> 실측 결과 `border-radius`가 `3.35544e+07px`로 렌더링되어 true pill임을
> 확인했다.

------------------------------------------------------------------------

## Typography

`text-xs`(12px, weight 500 `font-medium`)를 그대로 유지한다 →
`typography.text.12-m`. Size Recipe 없이 단일 값만 사용한다.

------------------------------------------------------------------------

## Spacing

| 요소 | 값(px) | 대응 BDS Token |
|:---|:---|:---|
| `px-2` | 8px | `space.8` |
| `py-0.5` | 2px | `space.2` |
| `gap-1`(children 사이) | 4px | `space.4` |
| `has-data-[icon=inline-end]:pr-1.5` | 6px | `space.6` |
| `has-data-[icon=inline-start]:pl-1.5` | 6px | `space.6` |

Tailwind 기본 스케일 값이 이미 Foundation `space.*`와 일치해서 클래스
자체는 변경하지 않았다(색상만 CSS 변수로 교체).

------------------------------------------------------------------------

## Project Override 지점 (현재)

없음. `interactive-primary-*` / `interactive-secondary-*` /
`interactive-danger-*` 등은 `bds-tokens.css`의 전역 Semantic Color
변수를 그대로 참조하며, Badge 전용 CSS 변수(`--badge-radius` 등)는
아직 뽑혀있지 않다. Button/Input처럼 반복적인 override 필요성이
확인되면 그때 연결점을 추가한다.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **Icon Size(12px)의 Foundation 토큰 부재** — 위 "Icon" 참고.
- **Dark mode 값 미분리** — `bds-tokens.css`가 아직 light 단일 세트만
  정의하고 있어 dark에서도 같은 값이 쓰인다(Button/Input/Tooltip과 동일한
  기존 gap, 이번 라운드에서 별도로 손대지 않음).
