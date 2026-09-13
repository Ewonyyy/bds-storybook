# Accordion

Accordion은 제목(Trigger)을 눌러 내용(Content)을 펼치고 접는
컴포넌트다. 한 번에 하나만 열리는 기본 동작과, 여러 개를 동시에 열어둘 수
있는 `multiple` 모드를 지원한다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui — `@base-ui/react/accordion`(`AccordionPrimitive`)에
  의존. 아이콘은 `lucide-react`의 `ChevronDownIcon`/`ChevronUpIcon`.
- 코드: `src/components/ui/accordion.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/accordion`

------------------------------------------------------------------------

## variant는 없다 — 사용 패턴만 있다

Button/Input과 달리 Accordion은 shadcn 공식 문서에도 `variant`/`size`
prop이 없다. 스타일은 사실상 하나이고, 달라지는 건 감싸는 방식(래핑)과
props 조합뿐이다. 테스트 페이지에서 확인 가능한 4가지 사용 패턴:

| 패턴 | 설명 |
|---|---|
| Single (기본값) | 한 번에 1개 아이템만 열림. `disabled` 아이템 지원 |
| Multiple | `multiple` prop — 여러 아이템 동시에 열어둘 수 있음 |
| Border | `Accordion`에 `rounded-lg border`를 얹고, 각 `AccordionItem`에 `border-b`로 구분선 |
| Card | `Card`(`CardHeader`/`CardContent`)로 감싼 형태 |

------------------------------------------------------------------------

## 색상: 이미 design.md 체계를 그대로 따른다

`accordion.tsx`는 하드코딩된 색이나 shadcn 원본 `oklch(...)` 값을 쓰지
않는다. 전부 기존 shadcn 테마 변수 → BDS Semantic 어댑터를 그대로
경유한다:

| 사용처 | 클래스 | 경로 | Semantic Token |
|---|---|---|---|
| 아이콘 / 보조 텍스트 | `text-muted-foreground` | `--muted-foreground` → `--content-secondary` | `content.secondary` |
| 포커스 보더 / 링 | `border-ring`, `ring-ring/20` | `--ring` → `--border-focus` | `border.focus` |

`globals.css`(어댑터)와 `bds-tokens.css`(실제 값)가 이미 `design.md`와
일치하는 걸 확인했다 — 그래서 Field처럼 추가로 손댈 색이 없었다.

------------------------------------------------------------------------

## Motion: height transition

`AccordionContent`는 열림/닫힘 시 `Panel`의 실제 콘텐츠 높이만큼
height transition으로 펼쳐지고 접힌다. shadcn/Radix 원본은
`animate-accordion-down`/`animate-accordion-up` 키프레임(`tw-animate-css`
제공, `--radix-accordion-content-height` 등 참조)을 썼지만, 이 변수명들은
Base UI가 실제로 노출하는 `--accordion-panel-height`와 이름이 달라 항상
`auto`로 폴백되어 버려 트랜지션이 걸리지 않는 죽은 코드였다.

대신 Base UI가 `Panel` 엘리먼트에 직접 부여하는 `--accordion-panel-height`
CSS 변수와 `data-starting-style`/`data-ending-style` data attribute를
그대로 사용한다(둘 다 Panel 자신에게만 붙고 자식 엘리먼트에는 전달되지
않으므로, 관련 클래스는 반드시 `AccordionPrimitive.Panel`에 걸어야 한다):

```
h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out
data-starting-style:h-0 data-ending-style:h-0
```

`duration-200`/`ease-out`은 shadcn 원본 키프레임이 쓰던 타이밍(`.2s
ease-out`)과 동일하게 맞췄다 — Skeleton/Spinner와 마찬가지로 `design.md`에
아직 Motion Foundation 토큰(Duration/Easing)이 없어 임의값을 그대로 쓴
상태다(아래 미해결 항목 참고).

------------------------------------------------------------------------

## Project Override 지점 (현재)

- Motion: 위 "Motion: height transition" 참고. 색상/레이아웃은 기존
  semantic 토큰(어댑터 경유)과 Tailwind 유틸리티만 사용, 별도 CSS 변수는
  두지 않았다.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **variant 확장**: 지금은 shadcn 원본과 동일하게 단일 스타일 + 사용
  패턴(Single/Multiple/Border/Card)만 존재. 디자인 쪽에서 별도 variant
  요구가 생기면 그때 정의.
- **Motion Foundation 토큰 부재**: `design.md`에 Duration/Easing 등 Motion
  관련 Foundation 섹션이 아직 없어 `duration-200 ease-out`을 임의값으로
  쓴다. Foundation에 Motion 토큰이 추가되면 그때 재검토한다(Skeleton의
  `animate-pulse`, Spinner의 `animate-spin` 미해결 항목과 동일한 성격의
  보류).
