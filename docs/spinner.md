# Spinner

Spinner는 비동기 작업 진행 중임을 나타내는 로딩 인디케이터입니다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui (`lucide-react`의 `Loader2Icon`) — 구조 · 접근성
  (`role="status"`, `aria-label="Loading"`) · 회전 애니메이션은 원본 그대로
  채용하고, Size의 실제 값만 BDS Foundation과 대조해 확인한다.
- 코드: `src/components/ui/spinner.tsx`

------------------------------------------------------------------------

## 구조

shadcn 원본 구조를 그대로 유지한다. 별도 Variant/Size prop 없이 `svg`에
`className`만 전달받는 단일 형태다.

------------------------------------------------------------------------

## Size

`size-4`(16px)를 그대로 유지한다 → BDS Foundation `size.16`과 정확히
일치한다(`design.md` Foundation > Size 참고). Button의 Icon Size Recipe도
동일하게 `size.16`(sm 기준)을 사용하고 있어(`button.md` 참고) 클래스 값
자체를 바꿀 필요가 없었다 — Badge의 Spacing 섹션과 같은 이유로, Tailwind
기본 스케일 값이 이미 Foundation `size.*`와 일치해서 클래스는 그대로 두고
대응 관계만 문서로 확인한다.

더 큰 Size가 필요하면 `className`으로 `size-5`(20px, `size.20`) /
`size-6`(24px, `size.24`) / `size-8`(32px, `size.32`) 등을 덮어써서 쓸 수
있다 — 별도 Size prop/Recipe 없이 `cn()`으로 병합되는 shadcn 원본 패턴을
그대로 따른다.

------------------------------------------------------------------------

## Color

별도 색상 토큰을 지정하지 않는다. `Loader2Icon`은 색상 클래스가 없어
SVG의 기본 동작대로 부모 요소의 text color(`currentColor`)를 그대로
상속한다 — `toast.tsx`의 로딩 아이콘도 동일하게 색상 클래스 없이
`animate-spin`만 사용하는 동일 패턴이다.

> Badge의 `ghost` variant가 "없음(상속)"으로 문서화된 것과 같은 성격 —
> Spinner를 어떤 텍스트 색 컨텍스트(`content.primary`, `content.secondary`,
> `content.inverse`, `interactive.danger.default` 등) 안에 두느냐에 따라
> 렌더링되는 색이 자동으로 따라가므로, Spinner 자체에 고정 Semantic Color
> 토큰을 강제하지 않는다.

------------------------------------------------------------------------

## Motion

`animate-spin`(Tailwind 기본값 — 1s linear infinite)을 그대로 유지한다.

------------------------------------------------------------------------

## Project Override 지점 (현재)

없음. Spinner 전용 CSS 변수(`--spinner-*`)는 뽑혀있지 않다.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **Motion Foundation 토큰 부재** — `design.md`에 Duration/Easing 등
  Motion 관련 Foundation 섹션이 아직 정의되어 있지 않다. 현재는 shadcn
  원본 `animate-spin` 값을 그대로 사용하며, Foundation에 Motion 토큰이
  추가되면 그때 재검토한다(Badge의 Icon Size 12px 미해결 항목과 동일한
  성격의 보류).
