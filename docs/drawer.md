# Drawer

Drawer는 화면 가장자리(하단/좌/우/상단)에서 슬라이드로 나타나는 패널이다.
Dialog와 달리 스와이프로 끌어서 닫거나, 특정 높이에 스냅시키거나, 여러
개를 겹쳐 열 수 있는 제스처 기반 기능이 있다. 모바일 환경에서 Dialog
대신 쓰기 좋다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — Base UI `Drawer` primitive
  (예전 버전은 Vaul 기반이었으나 현재는 Base UI로 교체됨)
- 코드: `src/components/ui/drawer.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/drawer`
- 추가 훅: `src/hooks/use-media-query.ts`, `src/hooks/use-mobile.ts`
  (shadcn 표준 구현을 그대로 옮김 — Responsive 예제에 필요하지만
  CLI로 개별 설치가 안 돼서 직접 작성)

------------------------------------------------------------------------

## 만든 variant (shadcn 공식 예제 7종 전부)

| Variant | 설명 |
|---|---|
| Basic | shadcn 공식 페이지 히어로 데모("배송 시간 선택") 그대로 — `useIsMobile`로 데스크톱은 오른쪽(`right`), 모바일은 하단(`down`)+스와이프 핸들로 자동 전환. RadioGroup+Field+Badge로 배송 시간 목록, 확정 시 토스트 |
| Position | `swipeDirection="left"`로 왼쪽에서 열기 |
| Swipe Handle | `showSwipeHandle`로 잡고 끌 수 있는 핸들 바 표시 |
| Nested Drawers | Drawer 안에서 또 다른 Drawer를 열어 최대 4단계까지 스택 |
| Non-Modal | `modal={false}` + `disablePointerDismissal` — 배경 클릭해도 안 닫히고 뒤 페이지와 동시 상호작용 가능 |
| Snap Points | `snapPoints=["31rem", 1]`로 특정 높이 지점에 스냅 |
| Responsive Dialog/Drawer | `useMediaQuery`로 데스크톱(≥768px)은 Dialog, 모바일 너비는 Drawer로 자동 전환 |

------------------------------------------------------------------------

## 색상: design.md 어댑터를 그대로 따른다

| 사용처 | 클래스 | 경로 |
|---|---|---|
| 팝업 배경/글자 | `bg-popover` / `text-popover-foreground` | 기존 그대로 |
| 팝업 테두리 | `border-subtle` (방향별 `border-t/r/l/b-[var(--border-subtle)]`) | Dialog/Alert Dialog와 동일 |
| 팝업 그림자 | `shadow-[var(--shadow-300)]` | Dialog/Alert Dialog와 동일 |

### Project Override: 팝업 테두리에 색이 없던 문제 + 그림자 추가

shadcn 원본은 스와이프 방향별로 `border-t`/`border-r`/`border-l`/`border-b`만
쓰고 색을 지정하지 않아서, Alert Dialog/Dialog에서 이미 확인한 것과 똑같이
`--border-default`(진한 색)를 물려받는 문제가 있었다. 4방향 전부
`border-subtle`을 명시했다. 또한 원본엔 shadow가 아예 없었는데, 다른
플로팅 패널들과의 일관성을 위해 `shadow-300`을 추가했다.

### 바로잡음: Basic 데모를 잘못 참고했던 문제

처음엔 `Usage#` 섹션의 단순 코드 스니펫("정말 진행하시겠습니까?" 텍스트만
있는 버전, 방향 고정 `down`)을 Basic으로 잘못 가져왔었다. Dialog 때와
똑같은 실수 — 실제 shadcn 페이지의 진짜 히어로 데모는 배송 시간 선택
폼이고, `useIsMobile()`로 방향을 **데스크톱 `right` / 모바일
`down`**으로 전환한다(왼쪽이 아니라 오른쪽이다). 지금은 그 원본 그대로
맞췄다.

------------------------------------------------------------------------

## 전역 스타일: `body { position: relative }`

shadcn 설치 가이드에 따라 `globals.css`에 추가했다 — iOS Safari에서
Drawer의 오버레이가 `position: absolute`라서, 페이지가 스크롤된 상태에서도
뷰포트를 제대로 덮으려면 `body`가 positioned여야 한다.

------------------------------------------------------------------------

## 알려진 미해결 항목

- **Overlay(배경 딤) 색상 토큰 없음**: Alert Dialog/Dialog와 동일한 이유로
  `bg-black/10`을 원본 그대로 뒀다.
