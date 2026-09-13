# Checkbox

Checkbox는 켜고/끄는 이진 선택 컨트롤이다. `indeterminate`(일부 선택) 상태도
지원한다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — `@base-ui/react/checkbox`
  (`CheckboxPrimitive`)에 의존.
- 코드: `src/components/ui/checkbox.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/checkbox`

------------------------------------------------------------------------

## 색상: design.md 어댑터를 그대로 따른다

| 사용처 | 클래스 | 경로 | Semantic Token |
|---|---|---|---|
| 기본(미체크) 보더 | `border-input` | `--input` → `--border-default` | `border.default` |
| 체크됨 배경/보더 | `bg-primary` / `border-primary` | `--primary` → `--interactive-primary-default` | `interactive.primary.default` |
| 체크 아이콘 | `text-primary-foreground` | `--primary-foreground` → `--content-inverse` | `content.inverse` |
| invalid 보더 | `aria-invalid:border-destructive` | `--destructive` → `--status-error` | `status.error` |

### 고친 부분: focus ring 20%

shadcn 원본은 `focus-visible:ring-ring/50`이었으나, Button/Input에서 이미
50%→20%로 확정한 기준(design.md에 계획돼있던 항목)에 맞춰 여기도
`ring-ring/20`으로 통일했다. 나머지 클래스는 shadcn 원본(GitHub
`bases/base/ui/checkbox.tsx` + `style-nova.css` `.cn-checkbox`)과 완전히
동일하다.

------------------------------------------------------------------------

## Indeterminate: 일부러 색을 안 입힌다

base-ui의 `checked`와 `indeterminate`는 서로 **독립된 prop**이다
(Radix처럼 `checked="indeterminate"` 트라이스테이트가 아님). shadcn
원본 CSS(`.cn-checkbox`)에 `data-indeterminate:` 스타일 규칙이 아예
없는데, 이는 버그가 아니라 의도된 디자인이다 — 실제 shadcn 프로덕션
예제(`notification-settings.tsx`)에서도 `indeterminate`만 켜지면 보라색
채움 없이 흰 배경 + 체크 아이콘만 뜨고, `checked`(전체 선택)일 때만
보라색이 채워진다. 우리도 그대로 맞췄다.

```tsx
<Checkbox checked={allChecked} indeterminate={someChecked} onCheckedChange={...} />
```

------------------------------------------------------------------------

## 관련 컴포넌트에서 발견해서 같이 고친 것

Checkbox를 만들다가, base-ui Checkbox가 **native `disabled` 속성이 아니라
`data-disabled`만** 붙인다는 걸 발견했다 (숨겨진 native `<input disabled>`
덕분에 `:has()` 기반 셀렉터는 정상 작동하지만, 단순 `peer-disabled:`는
안 먹는다). 그래서 다음을 같이 고쳤다:

- **`label.tsx`**: `peer-data-disabled:text-[var(--content-disabled)]`
  추가 — 체크박스 옆 라벨 텍스트가 disabled일 때 흐려지도록.
- **`table.tsx`** (신규): Checkbox의 "In Table" 예제를 위해 추가. border는
  Accordion/Alert/Toast와 동일하게 `border.subtle`로 고정.
- **`card.tsx`**: `CardFooter`가 놓쳤던 `border.subtle` 통일.

------------------------------------------------------------------------

## shadcn 공식 예제 7종 재현

GitHub `registry/bases/base/examples/checkbox-example.tsx`를 그대로
가져와서 재현했다: Basic / With Description / Invalid / Disabled /
With Title(카드형, `FieldLabel`이 `Field`를 감싸는 패턴) / In Table /
Group.

**Invalid 케이스 주의**: 체크박스에만 `aria-invalid`를 주는 게 아니라,
감싸는 `Field`에도 `data-invalid`를 같이 줘야 라벨 텍스트까지 error
색으로 바뀐다 (`fieldVariants`의 `data-[invalid=true]:text-destructive`가
텍스트 색을 자식에게 상속시킴):

```tsx
<Field orientation="horizontal" data-invalid>
  <Checkbox aria-invalid />
  <FieldLabel>...</FieldLabel>
</Field>
```

------------------------------------------------------------------------

## 자체 추가: 약관 동의 ((필수)/(선택) 표시)

shadcn 공식 예제엔 없는 조합. 이용약관 동의 리스트에서 항목별로
필수/선택 여부를 표시하고 싶다는 요청으로 추가했다 — 배지가 아니라
순수 텍스트로, **라벨 텍스트가 끝나는 지점 뒤에** 붙인다(앞이 아니라
뒤). `(필수)`만 `content.brand`로 강조하고, `(선택)`은 라벨과 동일한
색 그대로 둔다. `interactive.primary.default`(`text-primary`)가 아니라
`content.brand`를 쓴 이유: 이 텍스트는 클릭 불가한 순수 강조 표시라
`design.md`가 `content.brand`에 정의한 역할("비인터랙티브 Brand 강조
Text")과 정확히 일치한다 — 두 토큰이 우연히 같은 hex(`#6932eb`)를
공유하지만 역할은 다르다.

```tsx
<FieldLabel htmlFor="terms-required" className="font-normal">
  <span>
    이용약관 동의<span className="ml-1 text-[var(--content-brand)]">(필수)</span>
  </span>
</FieldLabel>

<FieldLabel htmlFor="marketing-optional" className="font-normal">
  마케팅 정보 수신 동의 (선택)
</FieldLabel>
```

**바깥에 `span`을 한 번 더 감싸는 이유**: `FieldLabel`이 `flex gap-2`라서,
`(필수)` `span`을 바로 자식으로 두면 앞 텍스트와의 사이가 `gap-2`(8px)
만큼 벌어진다. 라벨 내용 전체를 `span` 하나로 한 번 더 감싸서
`FieldLabel`의 flex item을 1개로 유지하고, 그 안에서만 `(필수)` `span`이
일반 인라인 요소로 색을 입는다.

**텍스트와 `(필수)` `span` 사이에 공백 문자를 안 넣고 `ml-1`(4px)만
쓰는 이유**: JSX 줄바꿈이 공백 한 칸으로 남으면 `ml-1`과 합쳐져 간격이
이중으로 벌어진다 — 그래서 소스에서 텍스트와 `<span>` 태그를 같은 줄에
붙여 쓰고, 간격은 오직 `ml-1` 하나로만 통제한다. `(선택)` 항목은 색
구분이 없어서 이 이중 래핑 없이 순수 텍스트 한 줄(공백 한 칸만)로
충분하다.

------------------------------------------------------------------------

## Project Override 지점 (현재)

- focus ring: 20%로 고정 (Button/Input과 통일).
- `label.tsx`에 `peer-data-disabled` 추가 (Checkbox/Radio류 지원).

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **Radio**: Checkbox와 거의 같은 패턴(같은 `border.focus` 20% 조정,
  같은 `peer-data-disabled` 이슈)일 가능성이 높음 — Radio 차례에 재검토.
- **Icons Only(Select 조합)**: shadcn 원본엔 있지만, Pagination과 마찬가지로
  이번 범위에서 제외.
