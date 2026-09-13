# Tabs

Tabs는 여러 개의 관련된 콘텐츠 패널 중 하나를 선택해 전환하는
컴포넌트입니다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui (Base UI `@base-ui/react/tabs`) — 구조 · 접근성 ·
  키보드/포커스 처리 로직은 원본 그대로 채용하고, Variant / Size / Radius /
  Color는 BDS가 소유한다.
- 코드: `src/components/ui/tabs.tsx`

------------------------------------------------------------------------

## 구조

shadcn 원본 구조를 그대로 유지한다.

- `Tabs` (`TabsPrimitive.Root`) — `orientation` 기본값 `horizontal`
- `TabsList` (`TabsPrimitive.List`) — `variant` prop(`default` / `line` /
  `ghost`), `size` prop(`"36" | "40" | "44" | "48"`, **`line` 전용**)
- `TabsTrigger` (`TabsPrimitive.Tab`)
- `TabsContent` (`TabsPrimitive.Panel`)

------------------------------------------------------------------------

## Variant

- `default` — List 배경이 채워진 Pill 형태(전통적인 Segmented Control)
- `line` — List 배경 없이 Active Trigger 아래 밑줄(`after` 가상요소,
  2px)로 표시(Figma 실측 기준, 아래 참고)
- `ghost` — `default`와 같은 Pill 구조지만 List 배경이 없고(투명),
  Active Trigger 배경만 `surface.subtle`를 쓴다. 컨테이너 배경이 없어
  `default`의 `surface.canvas`(흰색) active 배경은 대비가 사라지고,
  Tabs엔 Shadow 토큰도 없어 그림자로 구분할 수도 없어서 추가했다.
  네이밍은 새로 만들지 않고 Badge/Button이 이미 "배경 없음(투명), 상태에
  따라서만 배경이 생김"이라는 동일한 의미로 쓰는 `ghost`를 그대로
  재사용했다(`outline`/`muted`는 이미 다른 의미로 쓰이고 있어 후보에서
  제외).

`default`/`ghost`는 shadcn 원본 구조를 그대로 유지했고(배경 유무·색만
BDS 값), `line`은 이번 라운드에서 Figma 실측을 반영해 새로 스펙을
확정했다(아래 Size/Color/Spacing 참고).

------------------------------------------------------------------------

## Size

**`default`/`ghost`는 Button/Input과 달리 `sm`/`md`/`lg` 같은 Size
Recipe를 두지 않는다.** Trigger는 항상 `typography.text.14-m` 단일
값을 사용한다(shadcn 원본과 동일, Tooltip과 같은 패턴). `size` prop
자체가 없다.

**`line`은 Figma 파일이 실제로 정의한 숫자 라벨 그대로 4단계
(`36`/`40`/`44`/`48`)를 쓴다** — Button/Input의 `sm`/`md`/`lg` 3단
네이밍과 다르지만, Figma 스펙 자체가 이 라벨을 쓰고 있어 임의로
sm/md/lg 체계로 옮기지 않기로 확정했다. `TabsList size` prop으로
지정하며, 기본값은 `"36"`이다. `TabsTrigger`에는 별도로 값을 넘기지
않아도 된다 — `TabsList`가 `data-line-size`로 흘려보내고
`TabsTrigger`가 `group-data-[line-size=X]/tabs-list:` 셀렉터로 읽는다.

Figma 실측(Line variant, node `6899:1278` "Tab base line") 기준:

| | 36 | 40 | 44 | 48 |
|:---|:---|:---|:---|:---|
| height | 36px | 40px | 44px | 48px |
| font-size / weight | 14px / Medium | 16px / Medium | 20px / Medium | 24px / Semi Bold |
| line-height(Figma) | 1.4 | 1.5 | 1.5 | 1.4 |
| icon | 16px | 18px | 20px | 24px |
| gap(아이콘↔텍스트) | 6px | 8px | 10px | 10px |
| padding-y | 10px | 12px | 12px | 12px |
| 대응 BDS typography | `typography.text.14-m` | `typography.text.16-m` | `typography.title.20-m`* | `typography.title.24-b` |

> **BDS 적용값은 위 표의 `padding-y`(Figma 실측, 대칭)를 그대로 쓰지
> 않는다.** height/typography/underline 두께(2px)는 Figma 실측대로
> 고정한 채, 콘텐츠(아이콘+텍스트)와 하단 underline 사이의 시각적
> 간격만 2px 늘리기로 했다 — height가 고정된 상태에서 `padding-top`을
> 줄이고 `padding-bottom`을 그만큼 늘리면(합은 유지) 콘텐츠가 위로
> 이동해 간격만 늘어나는 원리를 이용했다. 4단계 모두 대칭 값 대비
> pt −2px / pb +2px로 옮겼다: 36 → `pt-2`(8px)/`pb-3`(12px), 40·48 →
> `pt-2.5`(10px)/`pb-3.5`(14px). height/typography/gap(아이콘↔텍스트)
> 등 다른 값은 전혀 손대지 않았다.
>
> \* **44 tier는 정확히 일치하는 토큰이 없다.** `design.md`에 20px
> 계열은 `typography.title.20-*`뿐이고, 그 line-height는 `1.45`다 —
> Figma 실측값 `1.5`와 다르다. Figma 응답의 "styles contained in
> design" 목록에도 이 20px 텍스트가 정식 Text Style로 연결돼 있지
> 않았다(detached 상태로 추정, Figma 파일 자체의 정합성 문제일 수
> 있음). **Figma의 1.5를 그대로 하드코딩하지 않고, 이미 존재하는
> `typography.title.20-m`의 `1.45`를 그대로 쓰기로 확정**했다(임의
> 값·신규 토큰을 만들지 않는다는 원칙). 대신 1.5→1.45로 짧아진
> line-box 높이(20px 기준 1px 차이)만큼 44 tier의 `padding-y`를
> `12px`(대칭) 대신 `padding-top 13px / padding-bottom 11px`로 ±1px
> 옮겨서, 밑줄(`after` 가상요소)까지의 시각적 거리를 Figma가 보여주는
> 위치와 맞췄다 — line-height 자체를 조작하지 않고 레이아웃 여백만
> 보정하는 방식이다. 이후 위에서 설명한 4단계 공통 +2px 간격 조정
> (pt −2 / pb +2)이 이 13/11 위에 다시 적용돼, 최종적으로
> `pt-[11px]`/`pb-[13px]`로 확정됐다. **sub-pixel 단위 보정이라 실제
> 브라우저 렌더링 결과는 사람이 Figma와 나란히 놓고 재확인하는 것을
> 권장한다** (이번
> 라운드에서 자동 스크린샷 비교 도구를 쓸 수 없어 코드/SSR 출력
> 검증까지만 확인했다).
>
> 48 tier(`title.24-b`)는 `font.size.24` / `b`(600) /
> `font.line-height.1.4`로 Figma 실측과 정확히 일치한다.
>
> icon 16/18/20/24px는 각각 `size.16`/`size.18`/`size.20`/`size.24`
> Foundation 값과 정확히 일치해 Tailwind `size-4`/`size-4.5`/`size-5`/
> `size-6`로 그대로 매핑했다.
>
> height 36px/44px는 Foundation `size.*` 스케일에 없는 값이다
> (`size.16~24/32/40/48/56/64`만 정의돼 있고 `size.36`/`size.44`는
> 없음 — `padding-y`에 쓴 `space.10`/`space.12`는 둘 다 Foundation에
> 있다). Radius가 이미 `rounded-[10px]`처럼 전용 override 변수 없이
> 값을 직접 하드코딩해 쓰는 선례가 있어, 여기서도 같은 방식으로
> `h-9`/`h-11`(Tailwind 표준 스케일, 각각 36px/44px)을 직접 사용했다 —
> 임의 보간이 아니라 Figma가 실측으로 확정한 값을 그대로 가져온 것이다.
>
> padding-x는 Figma 실측 표에 없어(List의 아이콘↔텍스트 gap과 padding-y
> 만 명시됨) 기존 `px-1.5`(6px)를 tier와 무관하게 그대로 유지했다 —
> 필요성이 확인되면 추후 재검토.

------------------------------------------------------------------------

## Icon

`default`/`ghost` Trigger 내부 아이콘은 Button `sm` Recipe
(`typography.text.14-m`과 같은 급)를 따라 `size.16`(16px)을 사용한다.
shadcn 원본에 이미 있던 `[&_svg:not([class*='size-'])]:size-4`(16px)를
그대로 유지했다 — 별도 override 없이 Foundation 값과 우연히 일치한다.

`line`은 위 Size 섹션의 4단계 표를 따라 16/18/20/24px로 tier마다
바뀐다(각각 `size.16`/`size.18`/`size.20`/`size.24`).

아이콘 배치는 Button과 동일한 `data-icon="inline-start"` /
`data-icon="inline-end"` 컨벤션을 그대로 사용한다(`has-data-[icon=...]`
selector로 padding을 좁힌다).

| 요소 | 값(px) | 대응 BDS Token |
|:---|:---|:---|
| 아이콘 크기(default/ghost) | 16px | `size.16` |
| 아이콘 인접 padding(`pl-1`/`pr-1`) | 4px | `space.4` |
| 아이콘 ↔ 텍스트 gap(default/ghost, `gap-1.5`) | 6px | `space.6` |

------------------------------------------------------------------------

## Color / State

| 요소 | 원본(shadcn) | BDS 적용값 |
|:---|:---|:---|
| List(default) 배경 | `bg-muted` | `surface.subtle` (shadcn Theme Adapter 경유) |
| List(line) 배경 | `bg-transparent` | 변경 없음(투명 유지) |
| List(ghost) 배경 | — (신규) | 투명(`bg-transparent`) |
| Trigger 기본 텍스트 | `text-foreground/60`(opacity) | `content.secondary` (`text-muted-foreground`, 어댑터 경유) |
| Trigger hover 텍스트 | `hover:text-foreground` | `content.primary` (어댑터 경유) |
| Trigger active 배경(default variant) | `data-active:bg-background` | `surface.canvas` (어댑터 경유) |
| Trigger active 배경(ghost variant) | — (신규) | `surface.subtle` — 컨테이너 배경이 없어 `surface.canvas`(흰색)는 대비가 없고, Shadow 토큰도 없어 그림자로도 구분 불가 |
| Trigger active 텍스트 | `data-active:text-foreground` | `content.primary` (어댑터 경유) |
| Line variant 밑줄(horizontal) | `after:bg-foreground` | `content.primary`(원본 `bg-foreground` 유지), `after` 가상요소 2px(`h-0.5`) / `radius.0`(Figma 실측 반영) — size tier(36/40/44/48)와 무관하게 동일 |
| Line variant 밑줄(vertical) | `after:bg-foreground` | 변경 없음 — `content.primary`, `after` 가상요소 유지(Figma가 vertical line 스펙을 제공하지 않아 범위 밖) |
| Focus border/ring | `focus-visible:border-ring` / `ring-ring/50` | `border.focus`, ring opacity는 Button/Input 선례대로 `50% → 20%`로 낮춤 |
| Disabled 텍스트/아이콘 | `disabled:opacity-50` / `aria-disabled:opacity-50` | `content.disabled` (opacity 트릭 제거, `pointer-events-none`만 유지) |

> **Line variant horizontal 밑줄은 한 번 실제 `border-bottom`(2px)으로
> 구현했다가 되돌렸다** — shadcn 원본처럼 `after` 가상요소 방식으로
> 남기기로 확정했다. 색은 `after:bg-foreground`(`content.primary`)
> 원본 값을 그대로 유지한다 — 한때 Figma가 이 밑줄을 "primary/main"
> (브랜드 퍼플, `content.brand`)으로 정의한다는 근거로 `content.brand`로
> 바꿨었지만, Selected 텍스트를 세 variant 공통 `content.primary`로
> 유지하기로 확정하면서(위 표 참고) 다시 검토했다. shadcn 원본은
> vertical indicator(`after:bg-foreground`, 손대지 않음)와 동일하게
> "indicator 색 = active 텍스트 색(둘 다 foreground)"을 하나의 규칙으로
> 쓰고 있고, 텍스트 색을 원본대로 유지하기로 한 이상 indicator만 브랜드
> 컬러로 남기면 같은 컴포넌트 안에서 텍스트/indicator 색 규칙이
> 갈리고 vertical/horizontal 규칙도 갈린다 — Figma 단독 근거보다
> 원본 구조/의도 및 오늘 텍스트 결정과의 일관성을 우선해 `content.brand`
> 적용을 되돌렸다. 두께(2px)/radius(0)는 Figma 실측 그대로 유지한다.
>
> `bg-muted`, `text-foreground`, `bg-background` 등은 이미 `design.md`의
> shadcn Theme Adapter(`--muted: var(--surface-subtle)` 등)가 BDS
> Semantic Token을 참조하도록 연결돼 있어서, 클래스 이름 자체는 원본
> 그대로 두고 실제 참조값만 BDS로 교체됐다. Button처럼 어댑터가 커버하지
> 못하는 상태(Disabled, Focus ring opacity)만 명시적으로 `var(--x)` 또는
> 값을 직접 수정했다.
>
> **Line variant Pressed/Disabled 텍스트 색상은 개별 Figma 컴포넌트
> 실측값과 정확히 일치하지 않는다.** 이 컴포넌트의 Source of Truth는
> 개별 Figma 실측값이 아니라 `docs/design.md`의 Semantic Token이며,
> 새 Semantic 토큰을 만들지 않기로 확정했으므로 **가장 가까운 기존
> 토큰(`content.secondary`/`content.disabled`)을 그대로 쓴다** —
> 이미 존재하던 Trigger 기본/Disabled 색상 그대로이며, 이번 라운드에서
> 변경하지 않았다. (당시 Figma 실측값과 어느 Foundation 단계만큼
> 차이가 났는지는 결정 히스토리이며 현재 스펙이 아니라 생략한다 —
> Foundation 값 자체가 바뀌면(예: gray-blue → gray-purple 전환) 매번
> 갱신해야 하는 hex 비교를 스펙에 남기지 않기 위함이다.)
>
> **Selected(active) Trigger 텍스트 색은 Figma Line variant와 다르다 —
> 검토 후 현행(`content.primary`) 유지로 확정.** Figma Line 실측(node
> `6899:1278`)은 Selected 상태 텍스트를 `primary/main`(브랜드 퍼플,
> `content.brand`)로 정의하지만, shadcn 원본과 현재 BDS 코드는 세
> variant 모두 `data-active:text-foreground`(`content.primary`, 중립색)를
> 공유한다. Default/Ghost variant는 Figma 실측 자료 자체가 없어 "Selected
> 텍스트=브랜드 컬러" 규칙이 Line 전용인지 세 variant 공통인지 확인할 수
> 없는 상태였다. Line만 브랜드 컬러로 바꾸면 같은 컴포넌트 안에서
> variant별로 Selected 텍스트 규칙이 갈리는 데다, shadcn 원본과도
> 어긋나게 되므로 — **세 variant 모두 `content.primary` 유지, 브랜드
> 컬러로 바꾸지 않기로 결정**했다. 같은 이유로 Line variant horizontal
> 밑줄의 `content.brand` 적용도 되돌려 텍스트와 동일한 `content.primary`
> 규칙으로 통일했다(아래 밑줄 관련 노트 참고). Default/Ghost Figma 노드가
> 확인되면 재검토.
>
> 다크모드(`dark:*`) 클래스는 Tooltip/Button과 동일한 이유로 이번
> 라운드에서 손대지 않았다 — `design.md`가 아직 다크모드 값을 분리하지
> 않은 상태. `ghost`의 active 배경(`surface.subtle`)은 light/dark 값이
> 아직 분리돼 있지 않아 두 모드 모두에서 명시적으로 지정했다(기존
> `dark:data-active:bg-input/30`이 새어 나오지 않도록 `line`과 동일한
> 패턴으로 dark override를 추가함).

------------------------------------------------------------------------

## Typography

| 요소 | 값 | 대응 BDS Token |
|:---|:---|:---|
| Trigger 텍스트(default/ghost) | `text-sm font-medium`(14px, weight 500) | `typography.text.14-m` (정확히 일치) |
| Trigger 텍스트(line) | Size 섹션의 36/40/44/48 4단계 표 참고 | `text.14-m` / `text.16-m` / `title.20-m` / `title.24-b` |

------------------------------------------------------------------------

## Spacing

| 요소 | 값(px) | 대응 BDS Token |
|:---|:---|:---|
| List padding(`p-[3px]` → `p-1`) | 4px | `space.4` |
| List height(default/ghost, horizontal, `h-8`) | 32px | `size.32` |
| List height(line, horizontal) | 36/40/44/48px(size별) | Size 섹션 표 참고 |
| List gap(line variant, `gap-1`) | 4px | `space.4` |
| Trigger padding(default/ghost, `px-1.5 py-0.5`) | 6px / 2px | `space.6` / `space.2` |
| Trigger padding-y(line, pt/pb) | 8/12, 10/14, 11/13, 10/14px(size별) | Size 섹션 표 참고 |
| Trigger gap(default/ghost, `gap-1.5`) | 6px | `space.6` |
| Trigger gap(line) | 6/8/10/10px(size별) | Size 섹션 표 참고 |

> 원본 List padding은 `p-[3px]`(3px, Foundation 대응 없음)였으나, Tabs의
> 확정 BDS 스펙으로 `space.4`(4px)를 사용한다 — Tooltip Arrow(10px)처럼
> 원본 값을 그대로 유지하는 대신, Foundation Token으로 흡수하기로
> 확정했다.
>
> `line` 4단계의 height/gap/padding-y는 위 "## Size" 섹션의 실측
> 표와 44 tier 보정 + 4단계 공통 underline 간격 +2px 조정 설명을
> 그대로 따른다 — 여기 표는 중복 없이 요약만 한다.

------------------------------------------------------------------------

## Radius

| 요소 | 원본(shadcn) | 계산값 | BDS 적용값 |
|:---|:---|:---|:---|
| List(default/ghost variant) | `rounded-lg` | 10px(shadcn `--radius` 기반) | `radius.10` 직접 사용(`rounded-[10px]`) |
| Trigger | `rounded-md` | 8px(shadcn `--radius` 기반) | `radius.8` 직접 사용(`rounded-[8px]`) |
| List(line variant) | `rounded-none` | 0 | 변경 없음(`radius.0`) |

> 원본 값은 shadcn 전역 `--radius`(0.625rem) 기반 계산값이라 BDS
> Foundation과 우연히 일치하는 것이지, BDS가 소유한 값이 아니었다.
> Button/Input의 `--button-radius`/`--input-radius`처럼 전용 override
> 변수를 새로 만들지 않고, `radius.10`/`radius.8`을 코드에 직접
> 하드코딩했다 — Tabs List/Trigger가 서로 다른 radius를 쓰기 때문에
> Button/Input처럼 하나의 공유 변수(`--control-radius`)로 묶을 근거가
> 없다고 판단했다.

------------------------------------------------------------------------

## Shadow

**BDS는 Shadow Foundation/Semantic 토큰을 아직 정의하지 않았다**
(`design.md`에 `border.focus`의 focus ring이 box-shadow로 구현된다는
언급 외에는 Shadow 카테고리 자체가 없음). shadcn 원본은 default variant의
active Trigger에 `shadow-sm`(고정 회색조 box-shadow)을 적용했으나, BDS
기준이 없는 상태로 원본 값을 그대로 유지하는 것은 근거가 없다고 판단해
**Tabs에서는 Shadow를 사용하지 않는 것으로 확정**했다 — `shadow-sm`
클래스를 제거했다(line variant의 `shadow-none`은 원래도 그림자가 없어
변경 없음). 실측 결과 default active Trigger의 `box-shadow`는 `none`이다.

→ BDS Shadow Foundation/Semantic이 추가되면 그때 재검토한다.

------------------------------------------------------------------------

## Project Override 지점 (현재)

없음. `surface-subtle`/`content-secondary`/`content-primary`/
`surface-canvas`/`border-focus`/`content-disabled`는 `bds-tokens.css`의
전역 Semantic Color 변수를 그대로 참조하며, Radius는 위에서 설명한 대로
전용 override 변수 없이 직접 하드코딩했다. Tooltip과 마찬가지로,
반복적인 override 필요성이 확인되면 그때 연결점을 추가한다.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **Shadow Foundation/Semantic 부재** — 위 Shadow 섹션 참고. 토큰이
  추가되면 Tabs의 Shadow 사용 여부를 재검토한다.
- **Dark mode 값 미분리** — `bds-tokens.css`가 아직 light 단일 세트만
  정의하고 있어 dark에서도 같은 값이 쓰인다(Button/Input/Tooltip과 동일한
  기존 gap, 이번 라운드에서 별도로 손대지 않음).
- **Line 44 tier typography 토큰 gap** — `typography.title.20-m`의
  line-height(1.45)가 Figma 실측(1.5)과 다르다. 임의 신규 토큰을 만들지
  않기로 하고 기존 토큰 값을 그대로 쓰되, padding-y를 ±1px 보정해
  시각적 위치를 맞췄다 — Size 섹션 참고. 디자이너가 Figma 파일의 20px
  텍스트 스타일 연결(detached 여부)을 다시 확인하면 재검토.
- **Line Pressed/Disabled 텍스트 색상 토큰 gap** — Figma
  `text&icon/subtle`(Pressed)/`text&icon/helper`(Disabled)와 기존
  `content.secondary`/`content.disabled`가 개별 Foundation 단계
  기준으로는 완전히 일치하지 않는다. 새 Semantic 토큰을 만들지 않고
  기존 값을 그대로 썼다 — Color/State 섹션 참고.
- **Line height 36/44px가 Foundation `size.*` 스케일에 없음** — Radius
  선례처럼 전용 override 변수 없이 Tailwind 표준 클래스(`h-9`/`h-11`)로
  직접 하드코딩했다. 반복적으로 이 gap이 문제가 되면 Foundation에
  `size.36`/`size.44` 추가를 검토한다.
- **이번 라운드에서 자동 브라우저 스크린샷 비교 도구를 쓸 수 없었다** —
  코드/SSR 출력(class·data attribute 렌더링)까지만 검증했고, 특히 Line
  44 tier의 ±1px 보정과 2px underline의 실제 픽셀 위치는 사람이 Figma와
  나란히 놓고 육안으로 재확인하는 것을 권장한다.
