# Toast

Toast는 화면 한쪽에 잠깐 떴다가 자동으로 사라지는 알림이다. 페이지 안에
고정으로 남아있는 Alert와 다르게, 특정 액션(저장, 삭제 등)의 결과를
일시적으로 알리는 용도다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — `@base-ui/react/toast`
  (`ToastPrimitive`)에 의존.
- 코드: `src/components/ui/toast.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/toast`

------------------------------------------------------------------------

## 사용법

```tsx
// 루트 레이아웃(또는 격리 테스트 페이지)에 한 번만
import { Toaster } from "@/components/ui/toast"
<Toaster />

// 아무 곳에서나
import { toast } from "@/components/ui/toast"
toast.add({ title: "저장되었습니다", description: "..." })
```

`toast`는 `@base-ui/react/toast`의 `createToastManager()`로 만든 전역
싱글턴이라 React 트리 밖에서도 호출 가능하다. `Provider`가 컨텍스트,
`Viewport`가 쌓이는 위치, `Root`가 토스트 1개, `useToastManager()`가
리액트 쪽에서 `toasts` 배열을 구독한다.

### API

- `toast.add(options)` — 새 토스트 생성, id 반환
- `toast.close(id?)` — 특정 토스트(또는 전체) 닫기
- `toast.update(id, options)` — 기존 토스트 갱신 (loading → success 전환 등)
- `toast.promise(promise, { loading, success, error })` — 비동기 상태 자동 전환

### type (5종)

`success` / `warning` / `error` / `info` / `loading` — `data-type`으로
구분하고 아이콘만 갈아끼운다.

------------------------------------------------------------------------

## 색상: design.md 어댑터를 그대로 따른다

| 사용처 | 클래스 | 경로 | Semantic Token |
|---|---|---|---|
| 배경 | `bg-popover` | `--popover` → `--surface-elevated` | `surface.elevated` |
| 기본 텍스트 | `text-popover-foreground` | `--popover-foreground` → `--content-primary` | `content.primary` |
| 설명 텍스트 | `text-muted-foreground` | `--content-secondary` | `content.secondary` |
| error 아이콘만 | `text-destructive` | `--status-error` | `status.error` |

> shadcn 원본도 success/warning/info/loading 아이콘엔 **색을 안 입힌다**
> (기본 텍스트 색 그대로) — error만 빨간색이다. 우리도 그대로 맞췄다.
> 처음엔 5개 타입 전부 색깔 아이콘으로 만들었었는데, "shadcn이랑 동일하게"
> 요청을 받고 원본 기준으로 되돌렸다.

### 고친 부분 1: border

Accordion/Alert와 동일한 이유 — `border`(→`border.default`) 대신
`border.subtle`로 교체.

### 고친 부분 2: close/action 버튼 크기

shadcn 원본은 `ToastAction`/`ToastClose`를 자기 프로젝트의 `Button`
(`size=sm`/`size=icon-sm`)으로 렌더링하는데, **그 프로젝트의 sm/icon-sm은
28px**다. 우리 BDS `Button`의 `sm`(h-10=40px)/`icon-sm`(size-10=40px)은
Foundation `size.40` 기반의 더 큰 터치 타깃이라, 그대로 재사용하면 버튼이
텍스트 한 줄짜리 토스트 높이까지 억지로 끌어올린다(실측 74px, 두 줄짜리와
거의 차이 없었음). **BDS `Button` 컴포넌트 자체는 바꾸지 않고**, 토스트
안에서만 렌더링되는 인스턴스에 `className`으로 크기를 좁혔다:

```tsx
// Action
render = <Button variant="outline" size="sm" className="h-7 gap-1 px-2.5 text-xs" />

// Close
render = <Button variant="ghost" size="icon-sm" className="size-7" />
```

고친 후 실측: 한 줄(타이틀만) 74px → **62px**, 두 줄(타이틀+설명) 78px
(그대로) — 콘텐츠 양에 따라 높이가 정상적으로 달라진다.

------------------------------------------------------------------------

## Focus ring: `/50` 유지

`ToastPrimitive.Root`는 base-ui가 `tabIndex={0}`을 직접 부여해 **토스트
카드 전체가 실제로 키보드 포커스 가능한 대상**이다(스크린리더/키보드
사용자가 개별 버튼이 아니라 토스트 카드 자체로 Tab 진입 가능,
`node_modules/@base-ui/react/toast/root/ToastRoot.js` 참고).
Button/Input/Checkbox/Radio/Accordion처럼 **작은 폼 컨트롤 자체**의 링은
전부 `ring-ring/20`으로 통일했지만, Toast Root는 그 범주가 아니라
Item·Field의 카드형 focus와 같은 "카드/행 전체가 focus 타깃"인 케이스라
shadcn 원본 값(`focus-visible:ring-ring/50`)을 그대로 유지한다(`item.md`
"Project Override 안 한 것: focus ring 50%" 참고).

------------------------------------------------------------------------

## 스택 애니메이션

여러 개 쌓일 때 뒤 카드가 살짝 peek되는 효과는 `--toast-index`,
`--toast-height`, `--toast-frontmost-height`, `--gap`, `--peek`,
`--scale` 같은 CSS 변수로 구현된다 (shadcn 원본 그대로, 손대지 않음).
값 자체는 base-ui가 각 토스트의 실제 렌더링 높이를 측정해서 채운다.

------------------------------------------------------------------------

## Shadow

Root가 `shadow-[var(--shadow-300)]`를 쓴다 — Foundation `shadow.300`
(`design.md` 참고, Tailwind 기본 `shadow-lg`와 동일한 값)을 `bds-tokens.css`의
`--shadow-300` CSS 변수로 참조한 것이다. 값 자체는 기존 `shadow-lg`와
동일하므로 시각적으로 달라지는 부분은 없다 — 하드코딩된 Tailwind
유틸리티 대신 BDS Foundation Token을 통해 참조하도록 배선만 바꿨다.

------------------------------------------------------------------------

## Project Override 지점 (현재)

- Border: `border.subtle`로 고정.
- Action/Close 버튼 크기: 토스트 전용 `h-7`/`size-7` 오버라이드 (BDS
  Button 컴포넌트 자체 사이즈 스케일은 변경하지 않음).
- Focus ring: `ring-ring/50` 의도적 유지(위 "Focus ring: `/50` 유지" 참고).

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **status.warning / status.info 토큰**: 한때 design.md에 추가했다가
  "만들지 말라"는 결정으로 되돌렸다. 그래서 warning/info 아이콘은 색이
  없는 상태(=shadcn 원본과 동일)이고, 이건 의도한 결과다.
- **스와이프 dismiss 커스터마이징**: base-ui가 기본 제공하는 좌우/상하
  스와이프 닫기는 그대로 두고 별도 검증은 안 함.
- **Action/Close 버튼 크기**: 위 "고친 부분 2"에서 설명한 `h-7`/`size-7`
  (28px) 오버라이드는 BDS `Button`의 공식 사이즈 스케일(`sm`=40px가
  최소)에 없는 값이다. 나중에 Button에 더 작은 공식 사이즈(예: `xs`)가
  추가되면 이 오버라이드를 그 공식 사이즈로 교체하는 걸 재검토 — Alert
  Action의 `h-6`(24px) 오버라이드와 같이 검토할 것(용도가 다름: Toast
  Close는 아이콘 전용, Alert Action은 텍스트 버튼 — 같은 값으로
  통일될지는 미정. `docs/alert.md` "알려진 미해결 항목" 참고).
