# Skeleton

Skeleton은 콘텐츠 로딩 중 레이아웃을 미리 보여주는 Placeholder 컴포넌트입니다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui — 구조는 원본 그대로 채용하고(별도 Variant/Size prop
  없이 `className`만 전달받는 단일 `div`), Radius / Color의 실제 값만 BDS
  Foundation과 대조해 확인한다.
- 코드: `src/components/ui/skeleton.tsx`

------------------------------------------------------------------------

## 구조

shadcn 원본 구조를 그대로 유지한다. Spinner와 동일하게 별도 Variant/Size
prop 없이 `className` override만으로 크기/모양(원형 아바타는
`rounded-full`, 텍스트 줄은 `h-4 w-[…]` 등)을 결정하는 패턴이다.

------------------------------------------------------------------------

## Radius

`rounded-md`를 그대로 유지한다. shadcn의 `--radius-md`는
`calc(var(--radius) * 0.8)`이고 프로젝트의 `--radius`가 `0.625rem`(10px)이라
`10px * 0.8 = 8px`로 계산된다 → BDS Foundation `radius.8`(8px)과 정확히
일치한다(`design.md` Foundation > Radius 참고). Spinner의 Size 섹션과 같은
이유로, 클래스 자체는 바꾸지 않고 대응 관계만 문서로 확인한다.

------------------------------------------------------------------------

## Color

`bg-accent`를 그대로 유지한다. `globals.css`의 shadcn Theme Adapter에서
`--accent`가 이미 `var(--surface-subtle)`을 참조하도록 연결되어 있어
(`design.md` Semantic > shadcn/ui Theme Adapter 참고), 별도 코드 수정 없이
그 자체로 BDS Semantic `surface.subtle`을 쓰는 상태다 — Badge/Spinner처럼
새로 값을 대조해 바꿔 끼운 게 아니라, 애초에 연결이 이미 되어 있던 케이스.

> Dark mode에서는 `--accent`가 `var(--surface-subtle)`이 아니라
> `oklch(0.269 0 0)` 하드코딩값으로 분리되어 있다 — 이는 Skeleton만의
> 문제가 아니라 Badge/Tooltip 문서에 이미 기록된 "다크모드 값 미분리"와
> 동일한 기존 갭이라 이번 범위에서 새로 처리하지 않는다.

------------------------------------------------------------------------

## Motion

`animate-pulse`(Tailwind 기본값)를 그대로 유지한다.

------------------------------------------------------------------------

## Project Override 지점 (현재)

없음. Skeleton 전용 CSS 변수(`--skeleton-*`)는 뽑혀있지 않다.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **Motion Foundation 토큰 부재** — `design.md`에 Duration/Easing 등 Motion
  관련 Foundation 섹션이 아직 정의되어 있지 않다. 현재는 shadcn 원본
  `animate-pulse` 값을 그대로 사용하며, Foundation에 Motion 토큰이
  추가되면 그때 재검토한다(Spinner의 `animate-spin` 미해결 항목과 동일한
  성격의 보류).
- **Dark mode 값 미분리** — 위 "Color" 참고. Badge/Input/Tooltip과 동일한
  기존 gap이며, 이번 라운드에서 별도로 손대지 않는다.
