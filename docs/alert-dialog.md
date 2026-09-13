# Alert Dialog

Alert Dialog는 사용자의 확인 없이는 다음 화면으로 넘어갈 수 없는 **차단형
확인창**이다. 계정 삭제, 세션 만료, 저장 확인처럼 "실수로 취소되면 곤란한"
액션 앞에 놓는다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — Base UI `AlertDialog` primitive
- 코드: `src/components/ui/alert-dialog.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/alert-dialog`

------------------------------------------------------------------------

## 만든 variant (shadcn 공식 예제 5/6종)

shadcn 공식 문서 예제 6종 중 RTL(아랍어 방향 데모)만 제외하고 5종 반영:

| Variant | 설명 |
|---|---|
| Basic | 제목/설명/취소/계속 버튼 기본형 |
| Small (`size="sm"`) | 더 작은 다이얼로그, footer 버튼이 2단 그리드로 배치 |
| Media | `AlertDialogMedia`로 아이콘 추가 |
| Small with Media | sm + media 조합 |
| Destructive | `AlertDialogAction`에 `variant="destructive"` 적용 |

------------------------------------------------------------------------

## 색상: design.md 어댑터를 그대로 따른다

| 사용처 | 클래스 | 경로 |
|---|---|---|
| 팝업 배경/글자 | `bg-popover` / `text-popover-foreground` | Combobox/Toast와 동일 |
| 팝업 테두리 | `border-[var(--border-subtle)]` | Combobox/Toast와 동일 |
| 팝업 그림자 | `shadow-[var(--shadow-300)]` | Toast와 동일(모달급 강조) |
| Footer 배경 | `bg-muted/50` | `--surface-subtle` |
| Footer 상단 구분선 | `border-t-[var(--border-subtle)]` | Card 하단 구분선과 동일 |
| Cancel 버튼 | `Button variant="outline"` | 기존 Button 그대로 |
| Action(destructive) | `Button variant="destructive"` | 기존 Button 그대로 |

### Project Override: 팝업 테두리/그림자를 shadcn 원본에서 교체

shadcn 원본은 `ring-1 ring-foreground/10`(고정 회색 링)만 쓰는데, 이 프로젝트는
Combobox/Toast에서 이미 `border-[var(--border-subtle)]` +
`shadow-[var(--shadow-XXX)]` 조합으로 통일해왔다. Alert Dialog도 같은
컨벤션으로 교체했다(그림자는 Toast와 동일하게 300 단계 — 모달이 드롭다운보다
더 강조되는 요소라서).

> **참고**: `dropdown-menu.tsx`는 아직 이 컨벤션 이전의 `shadow-md ring-1
> ring-foreground/10`을 그대로 쓰고 있다. 이번 Alert Dialog 작업 범위 밖이라
> 손대지 않았지만, 나중에 정리 대상이다.

### 버그 수정: Footer 상단 구분선이 다른 곳보다 진하게 보이던 문제

shadcn 원본의 `AlertDialogFooter`는 색 지정 없는 `border-t`만 썼는데, 이
프로젝트에서 색 없는 `border`는 `--border-default`(`#a9aeb9`, Input/Button 등
컨트롤용 진한 테두리)로 떨어진다. Card 하단 구분선, Table 행 구분선,
Combobox separator는 전부 더 연한 `--border-subtle`(`#e4e7ed`)을 명시적으로
쓰는데 Footer만 빠져 있었던 것 — `border-t-[var(--border-subtle)]`을
명시해서 통일했다.

### Project Override: `AlertDialogCancel`/`AlertDialogAction`의 기본 `size`

shadcn 원본은 `size="default"`가 기본값인데, 이 프로젝트의 Button은
`size` prop이 `sm/md/lg`(default 없음)라서 타입 에러가 났다. 두 버튼 다
기본값을 `size="sm"`으로 뒀다 — 다이얼로그 자체가 작은 팝업이라, Button의
전역 기본값(`md`)보다 한 단계 작은 게 비율상 맞다고 판단했다.

------------------------------------------------------------------------

## 알려진 미해결 항목

- **Overlay(배경 딤) 색상에 대응하는 Foundation 토큰이 없음**: `design.md`에
  `surface.overlay`가 "공통 사용 근거 부족"으로 아직 정의되어 있지 않다.
  그래서 `AlertDialogOverlay`는 shadcn 원본 값(`bg-black/10`)을 그대로 뒀다.
  나중에 다른 모달류(Dialog, Drawer 등)가 추가되면서 공통 패턴이 보이면
  Foundation 토큰화 검토.
