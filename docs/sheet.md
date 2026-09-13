# Sheet

Sheet는 Dialog를 확장해서 화면 가장자리(상/하/좌/우)에 붙는 패널로 만든
컴포넌트다. Drawer와 달리 스와이프/스냅 같은 제스처 기능은 없고, 대신
`side` prop 하나로 4방향 어디서든 뗄 수 있다 — 데스크톱에서 "옆에 살짝
붙는 패널"이 필요할 때 Drawer보다 가볍게 쓰기 좋다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — Dialog와 동일한 Base UI `Dialog`
  primitive를 그대로 재사용(Sheet 전용 primitive가 따로 있는 게 아님)
- 코드: `src/components/ui/sheet.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/sheet`

------------------------------------------------------------------------

## Sheet vs Dialog vs Drawer

- **Dialog**: 화면 중앙에 뜨는 일반 모달.
- **Drawer**(이 프로젝트에서 이미 구현): 화면 가장자리에서 스와이프로
  끌어서 닫거나 스냅되는 제스처 기반 패널.
- **Sheet**(이 컴포넌트): 화면 가장자리에 붙는 패널이지만 제스처 없이
  `side` prop으로 방향만 고정 — 셋 중 구현이 가장 단순하다.

------------------------------------------------------------------------

## 만든 variant (shadcn 공식 예제 3/4종)

shadcn 공식 문서 예제 4종 중 RTL만 제외하고 3종 반영:

| Variant | 설명 |
|---|---|
| Basic | shadcn 공식 히어로 데모 그대로 — 프로필 수정 폼(이름/아이디 Input, 저장/닫기 footer), 오른쪽에서 열림(기본값) |
| Side | `side` prop으로 top/right/bottom/left 4방향 전부 시연, top/bottom은 `max-h-[50vh]`로 제한 |
| No Close Button | `showCloseButton={false}`로 우측 상단 X 버튼 숨김 |

------------------------------------------------------------------------

## 색상: design.md 어댑터를 그대로 따른다

Alert Dialog/Dialog/Drawer와 동일한 어댑터를 그대로 재사용했다:

| 사용처 | 클래스 | 경로 |
|---|---|---|
| 팝업 배경/글자 | `bg-popover` / `text-popover-foreground` | 기존 그대로 |
| 팝업 테두리 | 방향별 `border-t/r/l/b-[var(--border-subtle)]` | Drawer와 동일 |
| 팝업 그림자 | `shadow-[var(--shadow-300)]` | Alert Dialog/Dialog/Drawer와 동일 |

### Project Override: 팝업 테두리 색 + 그림자 토큰

shadcn 원본은 방향별 `border-t`/`border-r`/`border-l`/`border-b`에 색을
지정 안 해서 `--border-default`(진한 색)를 물려받는 문제가 있었고,
그림자도 우리 토큰이 아닌 Tailwind 기본값(`shadow-lg`)을 썼다. Drawer 때와
동일하게 4방향 전부 `border-subtle`을 명시하고, `shadow-lg`를
`shadow-[var(--shadow-300)]`로 교체했다.

### Project Override: 닫기(X) 버튼 크기

Dialog 때 발견한 것과 완전히 같은 문제 — `size="icon-sm"`(이 프로젝트
Button 기준 40px)로 되어 있었다. 실제 ui.shadcn.com 라이브 데모를
실측해보니 `size-7`(28px)이었는데, 28px은 `design.md`의 Foundation
`size` 스케일(16/18/20/24/32...)에 없는 값이라 가장 가까운 토큰인
`size.24`(`size-6`)로 스냅했다. 위치는 원본 그대로 `top-3 right-3`.

------------------------------------------------------------------------

## 알려진 미해결 항목

- **Overlay(배경 딤) 색상 토큰 없음**: Alert Dialog/Dialog/Drawer와 동일한
  이유로 `bg-black/10`을 원본 그대로 뒀다.
