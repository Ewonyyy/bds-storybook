# Radio

Radio는 여러 옵션 중 하나만 고를 수 있는 단일 선택 컨트롤이다. 항상
`RadioGroup`으로 묶여서 쓰인다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — `@base-ui/react/radio` +
  `@base-ui/react/radio-group`(`RadioPrimitive`/`RadioGroupPrimitive`)에
  의존.
- 코드: `src/components/ui/radio-group.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/radio`

------------------------------------------------------------------------

## 색상: design.md 어댑터를 그대로 따른다

| 사용처 | 클래스 | 경로 | Semantic Token |
|---|---|---|---|
| 기본(미선택) 보더 | `border-input` | `--input` → `--border-default` | `border.default` |
| 선택됨 배경/보더 | `data-checked:bg-primary` / `data-checked:border-primary` | `--primary` → `--interactive-primary-default` | `interactive.primary.default` |
| 선택됨 내부 점 | `bg-primary-foreground` | `--primary-foreground` → `--content-inverse` | `content.inverse` |
| invalid 보더 | `aria-invalid:border-destructive` | `--destructive` → `--status-error` | `status.error` |

### 고친 부분: focus ring 20%

shadcn 원본은 `focus-visible:ring-ring/50`이었으나, Checkbox/Button/Input에서
이미 50%→20%로 확정한 기준(design.md 참고)에 맞춰 여기도 `ring-ring/20`으로
통일했다 — `docs/checkbox.md`의 "알려진 미해결 항목"에서 이미 예고됐던
그대로다. 나머지 클래스는 shadcn 원본(GitHub
`bases/base/ui/radio-group.tsx`)과 완전히 동일하다.

### 고친 부분: disabled 시각 버그 (`disabled:` → `aria-disabled:`)

`RadioPrimitive.Root`는 `<span role="radio">`로 렌더링된다(네이티브
`<input>`/`<button>`이 아님). `npx shadcn add radio-group`로 받은 초기
버전은 `disabled:cursor-not-allowed disabled:opacity-50`을 썼는데, 이건
브라우저 CSS `:disabled` 의사클래스 기반이라 `<span>`에는 **절대 적용되지
않는다** — 실측 결과 `opacity: 1`, `cursor: auto`로 렌더링됐다. 클릭 차단
자체는 base-ui 내부 로직이 `aria-disabled`/`data-disabled`로 이미 정상
처리하고 있어서(기능은 멀쩡) 순수하게 **시각적으로만** 흐려 보이지 않는
버그였다.

`aria-disabled:cursor-not-allowed aria-disabled:opacity-50`로 교체해서
고쳤다(base-ui가 실제로 세팅하는 `aria-disabled="true"` 속성 기준). 이후
shadcn 공식 사이트(ui.shadcn.com)를 직접 실측해보니 **이미 동일한
`aria-disabled:` 클래스를 쓰고 있었다** — `npx shadcn add`가 받아온
레지스트리 버전이 구버전이었을 뿐, 우리가 고친 값이 shadcn 최신 버전과
클래스 문자열까지 정확히 일치한다.

> Checkbox(`checkbox.tsx`)는 같은 `<span>` 구조지만 `group-has-disabled/
> field:opacity-50`(Field가 감싸는 숨은 네이티브 `<input disabled>`를
> `:has()`로 감지)라는 다른 방식으로 이미 정상 동작 중이라 손대지 않았다.
> 다만 그쪽은 `cursor-not-allowed`까지는 못 챙기고 있어서, Radio의
> `aria-disabled:` 방식이 조금 더 안전하다(Field 래퍼 유무와 무관하게
> 항상 동작 + cursor까지 처리).

------------------------------------------------------------------------

## shadcn 공식 예제 6종 + With Description 1종 재현

GitHub `registry/bases/base/examples/radio-group-example.tsx`의 6종을
그대로 가져와서 재현했다: Basic / With Descriptions(카드형) / With FieldSet
/ Grid Layout / Disabled / Invalid. 여기에 Checkbox의 "With Description"
(비카드형)과 대응되는 예제를 하나 추가해 총 7종이다.

- **With Description**: `FieldLabel`로 `Field` 전체를 감싸지 않고,
  `RadioGroupItem` 옆에 `FieldContent`로 라벨+설명만 붙인다. 카드 테두리/
  배경/클릭 영역 확장 없음 — Checkbox의 "With Description"(비카드형)과
  동일한 패턴.
- **With Descriptions (카드형)**: `FieldLabel`이 `Field` 전체를 감싸서 카드
  형태로 클릭 가능하게 만든다 — Checkbox의 "With Title(카드형)"과 동일한
  패턴.
- **Disabled**: shadcn 공식 예제는 `RadioGroup` 전체에 `disabled`를 줘서
  모든 항목을 한 번에 비활성화하지만, 우리 테스트 페이지는 **개별 항목만**
  `disabled`를 줘서(`RadioPrimitive.Root`가 자체 `disabled` prop을 지원)
  같은 그룹 안에서 "이 항목만 비활성화 + 나머지는 정상 클릭 가능"함을
  보여주도록 바꿨다. `Field`에도 `data-disabled`를 같이 줘야 라벨 텍스트까지
  흐려진다(`field.tsx`의 `group-data-[disabled=true]/field:text-...`) —
  Checkbox의 Invalid 케이스에서 `data-invalid`를 별도로 줘야 했던 것과
  동일한 이유다.
- **Invalid**: Checkbox와 동일하게, `RadioGroupItem`에 `aria-invalid`만
  주는 게 아니라 감싸는 `Field`에도 `data-invalid`를 같이 줘야 라벨
  텍스트까지 error 색으로 바뀐다.

------------------------------------------------------------------------

## Project Override 지점 (현재)

- focus ring: 20%로 고정 (Checkbox/Button/Input과 통일).
- disabled 시각 처리: `disabled:` → `aria-disabled:`로 교체 (shadcn 최신
  버전과 일치, `<span role="radio">` 구조상 필수 수정).

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **In Table**: shadcn 공식 예제엔 없음 — Checkbox처럼 별도로 필요해지면
  그때 추가.
