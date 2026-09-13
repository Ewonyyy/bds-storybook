# Textarea

Textarea는 여러 줄 텍스트를 입력받는 폼 컴포넌트입니다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui — 순수 네이티브 `<textarea>` 기반, Base UI 프리미티브
  없음(shadcn 원본과 동일).
- 코드: `src/components/ui/textarea.tsx`

------------------------------------------------------------------------

## Size — sm/md/lg (한 차례 "안 만든다"고 했다가 뒤집음)

Input과 동일하게 `sm`/`md`/`lg` 세 단계를 지원한다. **min-height만
고정**이고 font/padding-x/padding-y가 Input과 같은 계단으로 반응한다.

| | sm | md | lg |
|:---|:---|:---|:---|
| min-height | `size.64` (세 사이즈 공통, 안 바뀜) |
| typography | `typography.text.14-r` | `typography.text.16-r` | `typography.text.18-r` |
| padding-x | `space.10` | `space.12` | `space.14` |
| padding-y | `space.10` | `space.12` | `space.14` |

> **뒤집은 이유**: 처음엔 "Textarea는 `field-sizing-content`로 높이가
> 이미 가변적이니 사이즈 variant가 필요 없다"고 판단했는데, 이건 min-height
> 얘기지 **폰트 크기 얘기가 아니었다**. Input과 Textarea는 둘 다 "텍스트를
> 담는 타이포그래피 요소"라 폰트 px가 안 맞으면 실제로 어색하다 — Input에
> sm(14px)/md(16px)/lg(18px)가 있는데 Textarea만 16px 고정이면, 같은 폼에
> Input sm과 Textarea가 나란히 있을 때 여전히 정렬이 안 맞는 문제가
> 남는다. 그래서 min-height는 그대로 두고(콘텐츠에 따라 늘어나는 성질은
> 유지) font/padding-x/padding-y만 Input과 동일한 계단(10/12/14, `r`
> weight)으로 맞췄다.
>
> min-height를 사이즈별로 다르게 하지 않은 이유는 여전히 유효하다 —
> "최소 높이"는 콘텐츠 유무와 무관하게 사용성을 위한 바닥값이라 폰트가
> 커진다고 반드시 커질 필요는 없다(sm 폰트에서도 몇 줄은 보여야 하니까).

------------------------------------------------------------------------

## Radius

- 별도 `--textarea-radius` 변수를 만들지 않고 `--input-radius`를 그대로
  재사용한다. Textarea는 Input과 같은 "텍스트 입력 필드" 계열이라 별도
  override 필요성이 아직 확인되지 않았다 — 필요해지면 그때 분리한다
  (button/input이 각자 분리된 것과 같은 원칙).

------------------------------------------------------------------------

## Color / State

Input과 동일한 패턴을 그대로 따른다.

| 상태 | Background | Text | Border |
|:---|:---|:---|:---|
| Default | `surface.default`(`bg-transparent`) | `content.primary` | `border.default` |
| Placeholder | — | `content.placeholder` (직접 참조) | — |
| Disabled | `surface.disabled` | `content.disabled` | `border.disabled` |
| Invalid | 변경 없음 | 변경 없음 | `status.error`(destructive, 원본 유지) |

> **Disabled를 opacity로 처리하지 않는다** — Input에서 고친 것과 동일한
> 이유(`disabled:bg-input/50`, `dark:disabled:bg-input/80` 등 제거,
> 고정 semantic 토큰으로 교체).
>
> **Placeholder는 `content.placeholder`(`gray-purple.500`)** — Input과 동일.
> shadcn 원본은 `placeholder:text-muted-foreground`(= `content.secondary`)였으나,
> 입력값과 잘 구분되지 않아 한 단계 옅은 전용 토큰으로 교체했다(`design.md`
> Content 섹션 참고). 어댑터를 거치지 않고 `placeholder:text-[var(--content-placeholder)]`로
> 직접 참조한다.

### Focus / Invalid

- Focus ring 투명도 **20%**로 통일(`focus-visible:ring-ring/20`) — 원본은
  `/50`이었으나 Button/Input 확정치에 맞춤. Textarea도 "텍스트 입력
  필드" 축에 속하므로 Checkbox/Radio(아직 50%, 보류 중)와는 다르게 즉시
  20%로 맞췄다.
- Invalid는 shadcn 원본(`aria-invalid:*`) 그대로 유지.

------------------------------------------------------------------------

## 버그 수정: disabled여도 placeholder 색이 안 바뀌던 문제

Input과 완전히 동일한 문제 — `disabled:text-[var(--content-disabled)]`는
입력된 값의 텍스트 색만 바꾸고 `::placeholder` 가상요소에는 안 먹힌다.
`disabled:placeholder:text-[var(--content-disabled)]`를 추가해서 값
텍스트와 placeholder 둘 다 같은 disabled 색을 쓰도록 맞췄다(`input.md`
"버그 수정" 섹션과 동일한 근거). 실측 확인: 값/placeholder 둘 다
`rgb(200, 204, 211)`.

------------------------------------------------------------------------

## Project Override 지점 (현재)

`--input-radius`를 공유하는 것 외에 별도 override 변수 없음. height/font/
padding은 아직 리터럴이며, 반복 필요성이 확인되면 그때 연결점을 추가한다.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **Dark mode 값 미분리**: Button/Input과 동일한 기존 gap.
