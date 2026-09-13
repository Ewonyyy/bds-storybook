# Field

Field는 하나의 폼 필드(Label + Control + Description/Error)를 묶는
레이아웃 컴포넌트입니다. Input/Textarea/Checkbox/Radio 등 어떤 컨트롤과도
조합 가능하다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui — `Label`, `Separator`에 의존(둘 다 이 워크트리에
  설치되어 있음. `Label`은 이번에 신규 설치).
- 코드: `src/components/ui/field.tsx`, `src/components/ui/label.tsx`

------------------------------------------------------------------------

## 이 컴포넌트는 대부분 레이아웃/타이포그래피다

Button/Input과 달리 Field는 height/padding/radius 같은 Size Recipe를
갖지 않는다 — `gap`, `font-size`, `색상`만 있는 순수 레이아웃 조합이다.
그래서 대부분의 서브컴포넌트(`FieldSet`/`FieldGroup`/`FieldContent`/
`FieldDescription`/`FieldSeparator`)는 **shadcn 원본을 그대로 사용**했다.
색상은 이미 `text-muted-foreground`(→ `content.secondary`)/
`text-destructive`(→ `status.error`) 어댑터를 통해 BDS Semantic을 참조하고
있어서 추가로 손댈 게 없었다.

------------------------------------------------------------------------

## 고친 부분: 순수 텍스트의 disabled를 opacity로 표현하지 않는다

`Label`, `FieldLabel`, `FieldTitle`의 disabled 텍스트 색이 원본은
`opacity-50`이었다. 이건 배경색과 무관하게 항상 같은 대비를 보장해야 하는
"단일 색상" 케이스라 Input/Button과 동일한 기준으로 고쳤다:

```
peer-disabled:opacity-50        →  peer-disabled:text-[var(--content-disabled)]
group-data-[disabled=true]:opacity-50  →  group-data-[disabled=true]:text-[var(--content-disabled)]
```

------------------------------------------------------------------------

## 손대지 않은 부분: `FieldLabel`의 카드형 checked/disabled 표현

`FieldLabel`이 `[data-slot=field]`(Checkbox/Radio 같은 컨트롤)를 감싸서
**카드처럼 보이는 선택형 옵션**을 만드는 패턴이 있다
(`has-[>[data-slot=field]]:border`, `has-data-checked:bg-primary/10` 등).
배경은 shadcn 원본 `bg-primary/5`(5%)에서 `design.md` Foundation Opacity에
5%가 없어(10% 단위만 존재) 가장 가까운 `opacity.10`(10%)으로 맞췄다(코드
`field.tsx` 참고). 이 카드형 구조 자체는 **원본 그대로 유지**했다 — 여러
자식(테두리+배경+텍스트+아이콘)을 통째로 감싸는 표현이라 Input의 "배경
하나"처럼 간단히 교체되지 않는다. 관련해서 그대로 둔 것들:

- `has-data-checked:border-primary/30 has-data-checked:bg-primary/10`
  (선택된 카드의 옅은 워시 배경)
- `has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50`
  (카드형 focus ring, **의도적으로 50% 유지**. 이 링은 Checkbox/Radio
  자체(이미 `ring-ring/20`)가 아니라 그걸 감싸는 **카드 전체**에
  씌워지는 링이다 — Item의 "행 전체가 클릭 가능한 카드형 focus라 작은
  컨트롤과 시각적 역할이 달라 원본 50%를 유지한다"는 근거[`item.md`
  "Project Override 안 한 것: focus ring 50%" 참고]와 동일한 이유다.)
- `group-data-[disabled=true]/field:opacity-50`이 아니라
  `has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50`
  같은 hover wash류

------------------------------------------------------------------------

## Project Override 지점 (현재)

없음 — Field는 색상/레이아웃 전부 기존 semantic 토큰(어댑터 경유)과
Tailwind 유틸리티만 사용, 별도 CSS 변수를 두지 않았다.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **카드형 Field(`FieldLabel` + `data-slot=field`) 표현**: 위 설명대로
  Checkbox/Radio 작업 차례에서 함께 재검토.
- **`FieldLegend`/`FieldSet`**: 실제 사용 예시 없이 원본 구조만 이식,
  실사용 케이스가 생기면 Preview로 재검토.
