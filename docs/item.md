# Item

Item은 미디어(아이콘/이미지)+텍스트가 반복되는 리스트 행을 위한 컴포넌트다.
Table의 "With Image" 행, Combobox 아이템처럼 여러 컴포넌트에서 같은
"아이콘+텍스트" 패턴이 하드코딩으로 반복되고 있던 걸 하나로 뽑아냈다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — Base UI `useRender`/`mergeProps`
  기반, 폼 컨트롤이 아니라 **표시용 콘텐츠**를 위한 컴포넌트다(아래
  "Item vs Field" 참고).
- 코드: `src/components/ui/item.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/item`

------------------------------------------------------------------------

## Item vs Field

- **Field**(Checkbox/Radio 등): 사용자가 값을 입력/선택하는 **폼 컨트롤**.
- **Item**(이 컴포넌트): 제목/설명/액션 같은 **표시 콘텐츠**. 폼이 아니다.

Table/Combobox의 "아이콘+텍스트" 리스트 행은 폼 컨트롤이 아니라서 Item이
맞는 선택이다.

------------------------------------------------------------------------

## size: sm / md / lg

| Tier | 아이콘/이미지 | 아이콘-콘텐츠 gap | 제목 텍스트 |
|---|---|---|---|
| `sm` | 16px | 6px(`gap-1.5`) | 12px(`text-xs`) |
| `md` | 24px | 8px(`gap-2`) | 14px(`text-sm`)¹ |
| `lg` | 32px | 10px(`gap-2.5`) | 20px(`text-xl`)² |

`md`가 기본값이다(Button과 동일한 컨벤션).

> ¹ md 텍스트는 `14px`로 확정했지만 `16px`(`text-base`)도 많이 쓰인다.
> 이번 v1은 `14px`를 유지한다.
>
> ² lg 텍스트는 `20px`로 확정했지만 `24px`(`text-2xl`)도 많이 쓰인다.
> 이번 v1은 `20px`를 유지한다.

### padding은 tier별로 나누지 않았다

행 높이(40/48/56 등)는 Item에 직접 넣는 값이 아니라 padding+아이콘+
텍스트의 결과물이다(Combobox의 `min-height` 방식과 동일한 원리).
padding은 tier별로 나누지 않고 `px-3 py-2.5` 고정값을 유지했다.

------------------------------------------------------------------------

## 아이콘/이미지 variant는 sm/md/lg와 별개 축

`ItemMedia`의 `variant`(`icon`/`image`/`default`)는 `size`와 독립적인
축이다. 아바타·재화 강조 아이콘처럼 행 높이(tier)와 무관하게 항상 고정
크기로 쓰이는 경우가 있지만, 이번 v1 범위에서는 별도 variant로 분리하지
않고 **sm/md/lg 사이즈 사다리에 그대로 포함**시켰다(단순화 우선).

------------------------------------------------------------------------

## 색상: design.md 어댑터를 그대로 따른다

| 사용처 | 클래스 | 경로 |
|---|---|---|
| Outline 테두리 | `border-border` | `--border` → `--border-default` |
| Muted 배경 | `bg-muted/50` | `--muted` → `--surface-subtle` |
| 설명 텍스트 | `text-muted-foreground` | `--content-secondary` |
| Focus ring | `ring-ring/50` | shadcn 원본 그대로(50%) — 아래 참고 |

### Project Override 안 한 것: focus ring 50%

Checkbox/Radio/Button/Input/Accordion은 전부 `ring-ring/20`으로
통일했지만, Item은 **행 전체가 클릭 가능한 카드형 focus**라 Checkbox
같은 작은 컨트롤과 시각적 역할이 달라서 이번엔 shadcn 원본(50%) 그대로
뒀다. 실제로 Item이 인터랙티브 용도(버튼/링크 렌더링)로 쓰이기 시작하면
재검토한다.

------------------------------------------------------------------------

## Project Override 지점 (현재)

- `size`: shadcn 원본(default/sm/xs) → BDS sm/md/lg로 전면 교체.
- `ItemMedia`의 `icon`/`image` variant가 `size`에 따라 스케일하도록
  변경(shadcn 원본은 `icon` variant가 크기 고정이었음).
- `ItemTitle`/`ItemDescription`이 `size`에 따라 폰트 크기까지 같이
  스케일하도록 변경(shadcn 원본은 `title`이 항상 `text-sm` 고정).
