# Tooltip

Tooltip은 Trigger에 마우스를 올리거나 포커스했을 때 짧은 보조 설명을 표시하는
컴포넌트입니다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui (Base UI `@base-ui/react/tooltip`) — 구조 · 접근성 ·
  포지셔닝 · 애니메이션 로직은 원본 그대로 채용하고, Color만 BDS Semantic
  Token으로 교체했다.
- 코드: `src/components/ui/tooltip.tsx`

------------------------------------------------------------------------

## 구조

shadcn 원본 구조를 그대로 유지한다.

- `TooltipProvider` — `delay` 기본값 `0`
- `Tooltip` (`TooltipPrimitive.Root`)
- `TooltipTrigger`
- `TooltipContent` — `Portal` > `Positioner` > `Popup`(+ `Arrow`)

### Positioner 기본값

| Prop | 기본값 |
|:---|:---|
| `side` | `top` |
| `sideOffset` | `4` |
| `align` | `center` |
| `alignOffset` | `0` |

Positioning 계산(side별 slide-in 방향, arrow 좌표 등)은 shadcn 원본 로직을
그대로 사용하며 이번 작업에서 변경하지 않았다.

------------------------------------------------------------------------

## Color

shadcn 원본은 `bg-foreground` / `text-background`(전역 foreground/background
반전)를 썼는데, BDS는 "반전된 표면"을 위해 이미 정의된 전용 Semantic Token으로
교체했다.

| 요소 | 원본(shadcn) | BDS 적용값 |
|:---|:---|:---|
| Popup 배경 | `bg-foreground` | `surface.inverse` (`bg-[var(--surface-inverse)]`) |
| Popup 텍스트 | `text-background` | `content.inverse` (`text-[var(--content-inverse)]`) |
| Arrow 배경/fill | `bg-foreground fill-foreground` | `surface.inverse` (`bg-[var(--surface-inverse)] fill-[var(--surface-inverse)]`) |

> 실제 색상값은 요소별로 다르다. **Background는 `#272c36`(`--foreground` =
> `content.primary`) → `#000000`(`surface.inverse`)으로 변경됨** — 원본은
> `content.primary`(짙은 gray-blue)를 배경에 썼지만, BDS는 순검정
> `surface.inverse`를 참조하므로 실제로 값이 달라졌다. **Text는
> `#ffffff`(`--background` = `surface.canvas`) → `#ffffff`(`content.inverse`)로
> 동일** — 이쪽만 두 토큰의 값이 우연히 같아서 시각적 변화가 없다.
>
> BDS 토큰 연결은 정상 작동한다 — 브라우저 hover 상태에서 Popup/Arrow의
> computed `background-color`가 `--surface-inverse`(`#000`) 값과 정확히
> 일치함을 확인했다(Playwright로 실측).

**Tooltip Color 스펙 확정**: Background는 `surface.inverse`, Text는
`content.inverse`를 사용한다. `interactive.primary.default`(브랜드 퍼플)는
"Primary Action/Checked/Selected"라는 인터랙티브 전용 역할이라 비인터랙티브
표시 요소인 Tooltip에는 적용하지 않는다.

------------------------------------------------------------------------

## Typography

| 요소 | 값 | 대응 BDS Token |
|:---|:---|:---|
| Popup 텍스트 | `text-xs`(12px, weight 미지정 → 400) | `typography.text.12-r` |

Size Recipe 없이 단일 값만 사용한다(아래 Size 참고).

------------------------------------------------------------------------

## Spacing

| 요소 | 값(px) | 대응 BDS Token |
|:---|:---|:---|
| Popup `px-3` | 12px | `space.12` |
| Popup `py-1.5` | 6px | `space.6` |
| Popup `gap-1.5`(children ↔ kbd 등) | 6px | `space.6` |
| Popup `has-data-[slot=kbd]:pr-1.5` | 6px | `space.6` |
| Positioner `sideOffset` | 4px | `space.4` |

Tailwind 기본 스케일 값이 이미 Foundation `space.*`와 일치해서 클래스 자체는
변경하지 않았다(색상만 CSS 변수로 교체).

------------------------------------------------------------------------

## Radius

| 요소 | 값 | 대응 BDS Token |
|:---|:---|:---|
| Popup `rounded-md` | 6px | `radius.6` |
| Arrow `rounded-[2px]` | 2px | `radius.2` |

Button/Input과 달리 `--tooltip-radius` 같은 전용 override 변수는 아직 없다
(아래 Project Override 지점 참고).

------------------------------------------------------------------------

## Arrow Size (알려진 Foundation 미대응)

Arrow는 `size-2.5`(10px)를 사용한다. BDS Foundation `Size` 토큰은
`size.16`부터 정의되어 있어(`design.md` Foundation > Size 참고) 10px에
대응하는 토큰이 없다. `Spacing`에는 `space.10`(10px)이 있지만 이는 간격 용도
토큰이라 Arrow 크기에 그대로 전용하지 않았다.

→ **shadcn 원본 값(`size-2.5`, 10px) 그대로 유지**한다. Foundation에 10px
Size 토큰이 추가되면 그때 재검토한다.

------------------------------------------------------------------------

## Size (variant)

Button/Input과 달리 **`sm`/`md`/`lg` 같은 size variant를 두지 않는다.**
Popup/Arrow 모두 단일 값만 사용한다.

------------------------------------------------------------------------

## Project Override 지점 (현재)

없음. `surface-inverse`/`content-inverse`는 `bds-tokens.css`의 전역 Semantic
Color 변수를 그대로 참조하며, Tooltip 전용 CSS 변수(`--tooltip-radius` 등)는
아직 뽑혀있지 않다. Button/Input처럼 반복적인 override 필요성이 확인되면 그때
연결점을 추가한다.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **Arrow Size(10px)의 Foundation 토큰 부재** — 위 "Arrow Size" 참고.
- **Dark mode 값 미분리** — `bds-tokens.css`가 아직 light 단일 세트만
  정의하고 있어 dark에서도 같은 값이 쓰인다(Button/Input과 동일한 기존 gap,
  이번 라운드에서 별도로 손대지 않음).
