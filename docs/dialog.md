# Dialog

Dialog는 Alert Dialog와 달리 사용자가 **자유롭게 닫을 수 있는 일반 모달**이다.
확인을 강제하지 않는 폼, 상세 보기, 공유 창처럼 "취소돼도 문제없는" 내용에
쓴다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — Base UI `Dialog` primitive
- 코드: `src/components/ui/dialog.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/dialog`

------------------------------------------------------------------------

## Dialog vs Alert Dialog

- **Alert Dialog**: ESC/바깥 클릭으로 안 닫힘, 반드시 버튼으로 응답해야
  하는 차단형 확인창.
- **Dialog**(이 컴포넌트): ESC/바깥 클릭/X 버튼으로 자유롭게 닫을 수 있는
  일반 모달.

------------------------------------------------------------------------

## 만든 variant (shadcn 공식 예제 5/6종)

shadcn 공식 문서 예제 6종 중 RTL만 제외하고 5종 반영:

| Variant | 설명 |
|---|---|
| Open Dialog | shadcn 공식 페이지 상단 히어로 데모 그대로 — 프로필 수정 폼(Field/FieldGroup, Name/Username Input, Cancel/Save footer), `<form>`으로 감쌈 |
| Custom Close Button | Input(읽기전용 링크)+커스텀 "닫기" 버튼을 footer에 배치 |
| No Close Button | `showCloseButton={false}`로 우측 상단 X 버튼 숨김 |
| Sticky Footer | 내용 영역만 스크롤(`max-h-[50vh] overflow-y-auto`), footer는 고정 |
| Scrollable Content | Sticky Footer와 동일한 스크롤 영역이지만 footer 없이 헤더만 고정 |

------------------------------------------------------------------------

## 색상: design.md 어댑터를 그대로 따른다

Alert Dialog와 동일한 어댑터를 그대로 재사용했다:

| 사용처 | 클래스 | 경로 |
|---|---|---|
| 팝업 배경/글자 | `bg-popover` / `text-popover-foreground` | 기존 그대로 |
| 팝업 테두리 | `border-[var(--border-subtle)]` | Alert Dialog와 동일 |
| 팝업 그림자 | `shadow-[var(--shadow-300)]` | Alert Dialog와 동일 |
| Footer 배경/구분선 | `bg-muted/50` / `border-t-[var(--border-subtle)]` | Alert Dialog와 동일 |

### Project Override: 팝업 테두리/그림자, Footer 구분선

shadcn 원본은 `ring-1 ring-foreground/10` + 색 없는 `border-t`를 쓰는데,
Alert Dialog 작업 때 이미 확인한 것과 완전히 같은 문제라 그대로 같은 방식으로
고쳤다 — 자세한 이유는 `docs/alert-dialog.md`의 "버그 수정" 섹션 참고.

### 버그 수정: 닫기(X) 버튼 크기가 shadcn 라이브 데모보다 컸음

`npx shadcn add dialog`로 받은 코드는 닫기 버튼을 `size="icon-sm"`(이 프로젝트
Button 기준 40px)으로 렌더링하는데, 실제 ui.shadcn.com 라이브 데모를 실측해보니
진짜 크기는 `size-7`(28px)였다 — CLI 패키지 버전과 라이브 사이트 코드가 다른
케이스(Item 작업 때도 한 번 있었던 패턴). 다만 28px은 `design.md`의 Foundation
`size` 스케일(16/18/20/24/32...)에 없는 값이라(Sheet 작업 때 발견), 가장 가까운
토큰인 `size.24`(`size-6`)로 스냅했다.

### Project Override: 버튼 `size`

`DialogContent`의 X 닫기 버튼은 원본 그대로 `size="icon-sm"`. 다만
`DialogFooter`의 `showCloseButton`용 내장 "Close" 버튼과, 테스트 페이지에서
직접 넣은 `DialogClose` 버튼들은 Alert Dialog와 동일하게 `size="sm"`으로
맞췄다 — 작은 팝업 안에서는 Button 전역 기본값(`md`)보다 한 단계 작은 게
비율상 맞다는 판단을 그대로 이어받았다.

------------------------------------------------------------------------

## 알려진 미해결 항목

- **Overlay(배경 딤) 색상 토큰 없음**: Alert Dialog와 동일한 이유로
  `bg-black/10`을 shadcn 원본 그대로 뒀다. `surface.overlay` Foundation
  토큰이 생기면 Alert Dialog와 함께 일괄 교체.
