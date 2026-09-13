# BDS Design Tokens

> 이 문서는 팀원과 Claude Code가 Component 작업 시 참고하는 공통 기준 문서입니다.
> Component별 상세 규칙과 예외는 각 Component MD(`button.md` 등)에서 관리합니다.
>
> BDS Foundation/Semantic의 기준은 본 문서에서 정의한 체계와 역할입니다.

---

# Foundation

## Color

### Neutrals

| Token | Value |
|---|---|
| color.neutrals.white | #ffffff |
| color.neutrals.black | #000000 |

### Gray

| Token | Value |
|---|---|
| color.gray.50 | #f4f4f4 |
| color.gray.100 | #e0e0e0 |
| color.gray.200 | #c6c6c6 |
| color.gray.300 | #a8a8a8 |
| color.gray.400 | #8d8d8d |
| color.gray.500 | #6f6f6f |
| color.gray.600 | #525252 |
| color.gray.700 | #393939 |
| color.gray.800 | #262626 |
| color.gray.900 | #161616 |

### Gray Blue

| Token | Value |
|---|---|
| color.gray-blue.50 | #f1f2f4 |
| color.gray-blue.100 | #e4e7ed |
| color.gray-blue.200 | #c8ccd3 |
| color.gray-blue.300 | #a9aeb9 |
| color.gray-blue.400 | #9096a4 |
| color.gray-blue.500 | #808696 |
| color.gray-blue.600 | #656c7e |
| color.gray-blue.700 | #424b62 |
| color.gray-blue.800 | #333a48 |
| color.gray-blue.900 | #272c36 |

### Gray Purple

| Token | Value |
|---|---|
| color.gray-purple.50 | #f5f5f8 |
| color.gray-purple.100 | #e9e8ee |
| color.gray-purple.200 | #c7c5d0 |
| color.gray-purple.300 | #abaab4 |
| color.gray-purple.400 | #90909a |
| color.gray-purple.500 | #767680 |
| color.gray-purple.600 | #5e5e67 |
| color.gray-purple.700 | #46464f |
| color.gray-purple.800 | #2f3038 |
| color.gray-purple.900 | #1a1b23 |
| color.gray-purple.1000 | #171820 |
| color.gray-purple.1100 | #15161e |
| color.gray-purple.1200 | #13131a |

### Gray Warm

| Token | Value |
|---|---|
| color.gray-warm.50 | #f2f0ef |
| color.gray-warm.100 | #d8d0cf |
| color.gray-warm.200 | #b9b3b1 |
| color.gray-warm.300 | #9c9696 |
| color.gray-warm.400 | #7f7b7b |
| color.gray-warm.500 | #696363 |
| color.gray-warm.600 | #605d5d |
| color.gray-warm.700 | #4c4848 |
| color.gray-warm.800 | #272525 |
| color.gray-warm.900 | #171414 |

### Purple

| Token | Value |
|---|---|
| color.purple.50 | #f2eeff |
| color.purple.100 | #dedeff |
| color.purple.200 | #bfb6f5 |
| color.purple.300 | #ada0f8 |
| color.purple.400 | #8a61f0 |
| color.purple.500 | #6932eb |
| color.purple.600 | #5631c2 |
| color.purple.700 | #41199f |
| color.purple.800 | #330f83 |
| color.purple.900 | #2a0a67 |

### Blue

| Token | Value |
|---|---|
| color.blue.50 | #edf5ff |
| color.blue.100 | #d0e2ff |
| color.blue.200 | #a6c8ff |
| color.blue.300 | #78a9ff |
| color.blue.400 | #4589ff |
| color.blue.500 | #0a4eff |
| color.blue.600 | #0044d0 |
| color.blue.700 | #003dbc |
| color.blue.800 | #002d9c |
| color.blue.900 | #001d6c |

### Cyan

| Token | Value |
|---|---|
| color.cyan.50 | #e0f7fa |
| color.cyan.100 | #b2ebf2 |
| color.cyan.200 | #80deea |
| color.cyan.300 | #4dd0e1 |
| color.cyan.400 | #26c6da |
| color.cyan.500 | #00bcd4 |
| color.cyan.600 | #00acc1 |
| color.cyan.700 | #0097a7 |
| color.cyan.800 | #00838f |
| color.cyan.900 | #006064 |

### Red

| Token | Value |
|---|---|
| color.red.50 | #ffeaec |
| color.red.100 | #fdd4d6 |
| color.red.200 | #f4a7ac |
| color.red.300 | #ec777e |
| color.red.400 | #e64f57 |
| color.red.500 | #e3353f |
| color.red.600 | #e22732 |
| color.red.700 | #c91a25 |
| color.red.800 | #b31220 |
| color.red.900 | #9e0419 |

### Magenta

| Token | Value |
|---|---|
| color.magenta.50 | #ffe9f6 |
| color.magenta.100 | #ffd1e6 |
| color.magenta.200 | #faa1c9 |
| color.magenta.300 | #f66eab |
| color.magenta.400 | #f24391 |
| color.magenta.500 | #f02881 |
| color.magenta.600 | #f01879 |
| color.magenta.700 | #d60867 |
| color.magenta.800 | #a9004f |
| color.magenta.900 | #82003d |

### Orange

| Token | Value |
|---|---|
| color.orange.50 | #fffaf0 |
| color.orange.100 | #feebcb |
| color.orange.200 | #fbd38d |
| color.orange.300 | #f6ad55 |
| color.orange.400 | #ed8936 |
| color.orange.500 | #dd6b20 |
| color.orange.600 | #c05621 |
| color.orange.700 | #9c4221 |
| color.orange.800 | #7b341e |
| color.orange.900 | #652b19 |

### Yellow

| Token | Value |
|---|---|
| color.yellow.50 | #fffff0 |
| color.yellow.100 | #fefcbf |
| color.yellow.200 | #faf089 |
| color.yellow.300 | #f6e05e |
| color.yellow.400 | #ecc94b |
| color.yellow.500 | #d69e2e |
| color.yellow.600 | #b7791f |
| color.yellow.700 | #975a16 |
| color.yellow.800 | #744210 |
| color.yellow.900 | #5f370e |

### Green

| Token | Value |
|---|---|
| color.green.50 | #f0fff4 |
| color.green.100 | #c6f6d5 |
| color.green.200 | #9ae6b4 |
| color.green.300 | #68d391 |
| color.green.400 | #48bb78 |
| color.green.500 | #38a169 |
| color.green.600 | #25855a |
| color.green.700 | #276749 |
| color.green.800 | #22543d |
| color.green.900 | #1c4532 |

---

## Typography

### Font Family

| Token | Value |
|---|---|
| font.family.default | Pretendard |

### Font Weight

| Token | Value |
|---|---|
| font.weight.regular | 400 |
| font.weight.medium | 500 |
| font.weight.semibold | 600 |

### Font Size

| Token | Value |
|---|---|
| font.size.11 | 11px |
| font.size.12 | 12px |
| font.size.14 | 14px |
| font.size.16 | 16px |
| font.size.18 | 18px |
| font.size.20 | 20px |
| font.size.22 | 22px |
| font.size.24 | 24px |
| font.size.28 | 28px |
| font.size.32 | 32px |
| font.size.40 | 40px |
| font.size.48 | 48px |

### Line Height (배수, unitless)

| Token | Value |
|---|---|
| font.line-height.1.25 | 1.25 |
| font.line-height.1.3 | 1.3 |
| font.line-height.1.35 | 1.35 |
| font.line-height.1.4 | 1.4 |
| font.line-height.1.45 | 1.45 |
| font.line-height.1.5 | 1.5 |

---

## Size

| Token | Value |
|---|---|
| size.16 | 16px |
| size.18 | 18px |
| size.20 | 20px |
| size.24 | 24px |
| size.32 | 32px |
| size.40 | 40px |
| size.48 | 48px |
| size.56 | 56px |
| size.64 | 64px |

---

## Spacing

| Token | Value |
|---|---|
| space.2 | 2px |
| space.4 | 4px |
| space.6 | 6px |
| space.8 | 8px |
| space.10 | 10px |
| space.12 | 12px |
| space.14 | 14px |
| space.16 | 16px |
| space.20 | 20px |
| space.24 | 24px |
| space.28 | 28px |
| space.32 | 32px |
| space.36 | 36px |
| space.40 | 40px |

---

## Opacity

| Token | Value |
|---|---|
| opacity.10 | 10% |
| opacity.20 | 20% |
| opacity.30 | 30% |
| opacity.40 | 40% |
| opacity.50 | 50% |
| opacity.60 | 60% |
| opacity.70 | 70% |
| opacity.80 | 80% |
| opacity.90 | 90% |

---

## Radius

| Token | Value |
|---|---|
| radius.0 | 0 |
| radius.2 | 2px |
| radius.4 | 4px |
| radius.6 | 6px |
| radius.8 | 8px |
| radius.10 | 10px |
| radius.12 | 12px |
| radius.14 | 14px |
| radius.16 | 16px |
| radius.20 | 20px |
| radius.24 | 24px |
| radius.all | 1000 (fully rounded / pill 용) |

---

## Border Width

| Token | Value |
|---|---|
| border-width.1 | 1px |
| border-width.2 | 2px |

---

## Shadow

> Tailwind v4 기본 `shadow-sm/md/lg` scale(`tailwindcss@4.3.3`, `node_modules/tailwindcss/theme.css` 실측)을
> 그대로 3단계 Raw Token으로 채택했다. 별도 BDS 고유 값을 새로 설계하지 않고, 이미 Combobox(`shadow-md`)/
> Toast(`shadow-lg`)에서 검증 없이 쓰이고 있던 Tailwind 기본값을 Foundation Token으로 승격한 것이다.
> `shadow-none`(그림자 제거 리셋)은 값이 아니라 상태이므로 Foundation Token에 포함하지 않는다.

| Token | Value | Tailwind 대응 |
|---|---|---|
| shadow.100 | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | `shadow-sm` |
| shadow.200 | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | `shadow-md` |
| shadow.300 | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | `shadow-lg` |

---

## Foundation 사용 원칙

> `Size`, `Spacing`, `Opacity`, `Radius`, `Border Width`는 프로젝트/컴포넌트별로 역할이 달라질 수 있으므로
> `sm`, `md`, `lg`, `control`, `icon` 같은 역할형 이름을 Foundation에 추가하지 않습니다.
> Foundation은 값 자체를 나타내는 Raw Token으로 유지하고, 실제 역할과 조합은 각 Component MD에서 정의합니다.
>
> 예: Button 40px 높이는 `size.40`, 16px Icon은 `size.16`을 사용하며,
> `size.control.40`, `size.icon.16` 같은 별도 Foundation Token을 만들지 않습니다.

---

# Semantic

## Typography

> BDS Typography는 `Display / Title / Text / Label` 계층을 사용하며, Token은 dot notation으로 표기합니다.
> 기존 Figma Text Style 이름은 마이그레이션과 비교를 위한 참고 정보로만 유지합니다.

**Weight Suffix Mapping**

| Suffix | Weight 값 |
|---|---|
| `b` | Semi Bold (600) — Bold(700) 아님 |
| `m` | Medium (500) |
| `r` | Regular (400) |

Font Family는 전 스타일 공통으로 `font.family.default`(Pretendard)를 참조합니다.

### Display

| Token | Existing Figma Style (Reference) | Font Size | Weight | Line Height |
|---|---|---|---|---|
| typography.display.48-b | `Display/display-48-B` | font.size.48 | b (600) | font.line-height.1.25 |
| typography.display.48-m | `Display/display-48-M` | font.size.48 | m (500) | font.line-height.1.25 |
| typography.display.40-b | `Display/display-40-B` | font.size.40 | b (600) | font.line-height.1.3 |
| typography.display.40-m | `Display/display-40-M` | font.size.40 | m (500) | font.line-height.1.3 |

### Title

| Token | Existing Figma Style (Reference) | Font Size | Weight | Line Height |
|---|---|---|---|---|
| typography.title.32-b | `Title/title-32-B` | font.size.32 | b (600) | font.line-height.1.35 |
| typography.title.32-m | `Title/title-32-M` | font.size.32 | m (500) | font.line-height.1.35 |
| typography.title.28-b | `Title/title-28-B` | font.size.28 | b (600) | font.line-height.1.4 |
| typography.title.28-m | `Title/title-28-M` | font.size.28 | m (500) | font.line-height.1.4 |
| typography.title.24-b | `Title/title-24-B` | font.size.24 | b (600) | font.line-height.1.4 |
| typography.title.24-m | `Title/title-24-M` | font.size.24 | m (500) | font.line-height.1.4 |
| typography.title.24-r | `Title/title-24-R` | font.size.24 | r (400) | font.line-height.1.4 |
| typography.title.22-b | `Title/title-22-B` | font.size.22 | b (600) | font.line-height.1.4 |
| typography.title.22-m | `Title/title-22-M` | font.size.22 | m (500) | font.line-height.1.4 |
| typography.title.22-r | `Title/title-22-R` | font.size.22 | r (400) | font.line-height.1.4 |
| typography.title.20-b | `Title/title-20-B` | font.size.20 | b (600) | font.line-height.1.45 |
| typography.title.20-m | `Title/title-20-M` | font.size.20 | m (500) | font.line-height.1.45 |
| typography.title.20-r | `Title/title-20-R` | font.size.20 | r (400) | font.line-height.1.45 |
| typography.title.18-b | `Title/title-18-B` | font.size.18 | b (600) | font.line-height.1.45 |
| typography.title.18-m | `Title/title-18-M` | font.size.18 | m (500) | font.line-height.1.45 |
| typography.title.18-r | `Title/title-18-R` | font.size.18 | r (400) | font.line-height.1.45 |

> title-32, title-28은 Regular(r)이 존재하지 않음 (b, m만 존재).

### Text

| Token | Existing Figma Style (Reference) | Font Size | Weight | Line Height |
|---|---|---|---|---|
| typography.text.18-b | — (BDS 신규, Figma 대응 없음) | font.size.18 | b (600) | font.line-height.1.5 |
| typography.text.18-m | — (BDS 신규, Figma 대응 없음) | font.size.18 | m (500) | font.line-height.1.5 |
| typography.text.18-r | — (BDS 신규, Figma 대응 없음) | font.size.18 | r (400) | font.line-height.1.5 |
| typography.text.16-b | `Text/text-16-B` | font.size.16 | b (600) | font.line-height.1.5 |
| typography.text.16-m | `Text/text-16-M` | font.size.16 | m (500) | font.line-height.1.5 |
| typography.text.16-r | `Text/text-16-R` | font.size.16 | r (400) | font.line-height.1.5 |
| typography.text.14-b | `Text/text-14-B` | font.size.14 | b (600) | font.line-height.1.4 |
| typography.text.14-m | `Text/text-14-M` | font.size.14 | m (500) | font.line-height.1.4 |
| typography.text.14-r | `Text/text-14-R` | font.size.14 | r (400) | font.line-height.1.4 |
| typography.text.12-b | `Text/text-12-B` | font.size.12 | b (600) | font.line-height.1.4 |
| typography.text.12-m | `Text/text-12-M` | font.size.12 | m (500) | font.line-height.1.4 |
| typography.text.12-r | `Text/text-12-R` | font.size.12 | r (400) | font.line-height.1.4 |

> `typography.text.18-*`는 Button lg Recipe(`button.md` 참고)를 위해 추가된 BDS 신규 토큰입니다. Line Height는 임의 보간 없이 가장 가까운 앵커인 `text.16`의 값(1.5)을 그대로 상속했습니다.

### Label

| Token | Existing Figma Style (Reference) | Font Size | Weight | Line Height |
|---|---|---|---|---|
| typography.label.11-b | `Label/label-11-B` | font.size.11 | b (600) | font.line-height.1.4 |
| typography.label.11-m | `Label/label-11-M` | font.size.11 | m (500) | font.line-height.1.4 |
| typography.label.11-r | `Label/label-11-R` | font.size.11 | r (400) | font.line-height.1.4 |

> `Heading/heading2xl`은 Display/Title/Text/Label 체계 밖의 별도 변수로 제외합니다.

---

## Color

> Semantic Color는 특정 Component 이름이 아니라 **UI에서 반복되는 역할**을 기준으로 정의합니다.
> Component는 Semantic Token을 우선 사용하고, 명확한 공통 Semantic이 없는 경우에만 Foundation Token을 직접 사용합니다.
>
> 기존 Figma Variable 이름(`Stroke/level-*`, `Background/*`, `Text & Icon/*`, `Primary/*` 등)은
> BDS Semantic의 Source of Truth로 유지하지 않습니다. Component MD를 정리할 때 아래 Semantic 역할에 맞춰 매핑합니다.
>
> 같은 Foundation Color를 여러 Semantic Token이 참조할 수 있습니다. 값이 같더라도 역할이 다르면 Token은 분리합니다.
> 반대로 특정 Component 하나에서만 필요한 상태를 위해 전역 Semantic Token을 미리 만들지 않습니다.

### Surface

배경 및 UI 표면에 사용하는 Color입니다.

| Token | Foundation Color | Value | Usage |
|---|---|---|---|
| `surface.canvas` | `color.neutrals.white` | `#ffffff` | Page / App 전체 배경 |
| `surface.default` | `color.neutrals.white` | `#ffffff` | Input, Select Trigger 등 기본 Component Surface |
| `surface.subtle` | `color.gray-purple.50` | `#f5f5f8` | 약한 구분 영역, Option / Control Hover Surface |
| `surface.elevated` | `color.neutrals.white` | `#ffffff` | Select Content, Popover, Dropdown, Card 등 상위 Surface |
| `surface.inverse` | `color.neutrals.black` | `#000000` | 반전된 Dark Surface |
| `surface.disabled` | `color.gray-purple.50` | `#f5f5f8` | Filled / Selected Control의 Disabled Background |

> `surface.canvas`, `surface.default`, `surface.elevated`는 현재 동일한 Foundation Color를 참조하지만
> 역할이 다르므로 분리합니다.
>
> Unchecked Checkbox처럼 Disabled 상태에서도 Background가 White로 유지되어야 하는 Component는
> `surface.disabled`를 강제하지 않고 `surface.default + border.disabled + content.disabled` 조합을 사용할 수 있습니다.
>
> `surface.strong`, `surface.overlay`는 현재 공통 사용 근거가 부족하므로 정의하지 않습니다.
> Dialog / Modal 등 실제 공통 사용 사례가 생길 때 추가합니다.

---

### Content

Text와 Icon 등 Surface 위에 표시되는 콘텐츠 Color입니다.

| Token | Foundation Color | Value | Usage |
|---|---|---|---|
| `content.primary` | `color.gray-purple.900` | `#1a1b23` | 기본 Text / Icon |
| `content.secondary` | `color.gray-purple.600` | `#5e5e67` | Description, Helper, Secondary Label |
| `content.placeholder` | `color.gray-purple.500` | `#767680` | 빈 입력 필드의 힌트 텍스트 (Input / Textarea `::placeholder`) |
| `content.disabled` | `color.gray-purple.200` | `#c7c5d0` | Disabled Text / Icon |
| `content.inverse` | `color.neutrals.white` | `#ffffff` | Dark / Primary Surface 위 Text / Icon |
| `content.brand` | `color.purple.500` | `#6932eb` | 비인터랙티브 Brand 강조 Text / Icon |
| `content.error` | `color.red.600` | `#e22732` | Error Message / Invalid State Content |

> Text와 Icon은 동일한 역할의 Color를 공유하므로 별도의 Icon Semantic Group을 만들지 않습니다.
>
> **`content.placeholder`는 `content.secondary`에서 분리한 별도 토큰입니다.** 원래 Placeholder는
> `content.secondary`(`gray-purple.600`)를 공유했으나, 이 값은 Description / Helper처럼 **읽으라고
> 있는 보조 텍스트**라 가독성 위해 진한 편이고, 그 결과 Placeholder가 입력값(`content.primary`)과
> 잘 구분되지 않고 "이미 입력된 콘텐츠"처럼 보였습니다. Placeholder는 "여기 비었음"을 알리는
> 힌트라 한 단계 옅은 `gray-purple.500`(`#767680`)로 분리했습니다 — shadcn 원본의 placeholder
> 밝기(`--muted-foreground` = `oklch(0.556 0 0)` ≈ `#737373`)와 거의 일치하며, 입력값 / Placeholder /
> Disabled 세 상태가 `gray-purple.900 → 500 → 200`으로 고른 밝기 사다리를 이룹니다.
> Disabled 상태의 Placeholder는 이 토큰을 쓰지 않고 `content.disabled`로 덮습니다(각 Component MD 참고).
>
> `content.tertiary`, `content.success`, `content.warning`, `content.info`는 현재 공통 사용 근거가 부족하므로 정의하지 않습니다.

---

### Border

Divider 및 Control Outline에 사용하는 Color입니다.

| Token | Foundation Color | Value | Usage |
|---|---|---|---|
| `border.subtle` | `color.gray-purple.100` | `#e9e8ee` | 약한 Divider / Section 구분선 |
| `border.default` | `color.gray-purple.300` | `#abaab4` | Input, Select, Checkbox, Radio 등 기본 Control Border |
| `border.disabled` | `color.gray-purple.200` | `#c7c5d0` | Disabled Control Border |
| `border.focus` | `color.gray-purple.600` | `#5e5e67` | Focus Border / Focus Ring의 기준 Color |
| `border.error` | `color.red.600` | `#e22732` | Invalid / Error Control Border |

> `border.focus`는 Border뿐 아니라 focus 시 나타나는 ring(box-shadow)까지 이 값을 함께 참조합니다.
> 원래 `color.purple.500`(브랜드 컬러)이었으나, shadcn 원본 관례(무채색) 및 Button/Input/Checkbox/Radio에서 실제 렌더링해본 결과를 근거로
> 무채색으로 변경했습니다 — 선택/체크 상태 색(`interactive.primary.*`)과는 별개 토큰이라 이 변경은 그쪽에 영향을 주지 않습니다. 정확한 값은 위 표 참고.
>
> Ring 투명도는 Button/Input에서 최종 `20%`로 확정했습니다(shadcn 원본의 focus ring 50%는 error ring 20%보다 과하게 도드라져 보여 낮춤).
> Checkbox/Radio도 동일하게 `20%`로 맞췄습니다(`checkbox.tsx`/`radio-group.tsx`의 `focus-visible:ring-ring/20` 참고).

> `border.strong`은 현재 공통 역할이 명확하지 않으므로 정의하지 않습니다.
> Black / White처럼 Component Variant 자체가 색상을 명시하는 경우에는 필요한 범위에서 Foundation Color를 직접 사용할 수 있습니다.

---

### Interactive

Button Action, Checkbox / Radio Selected 등 사용자의 조작과 직접 연결되는 Color입니다.

| Token | Foundation Color | Value | Usage |
|---|---|---|---|
| `interactive.primary.default` | `color.purple.500` | `#6932eb` | Primary Action / Checked / Selected Default |
| `interactive.primary.hover` | `color.purple.600` | `#5631c2` | Primary Action / Checked / Selected Hover |
| `interactive.primary.pressed` | `color.purple.700` | `#41199f` | Primary Action / Checked / Selected Pressed |
| `interactive.secondary.default` | `color.gray-purple.600` | `#5e5e67` | Secondary Filled Action Default |
| `interactive.secondary.hover` | `color.gray-purple.700` | `#46464f` | Secondary Filled Action Hover |
| `interactive.secondary.pressed` | `color.gray-purple.800` | `#2f3038` | Secondary Filled Action Pressed |
| `interactive.danger.default` | `color.red.600` | `#e22732` | Destructive Action Default |
| `interactive.danger.hover` | `color.red.700` | `#c91a25` | Destructive Action Hover |
| `interactive.danger.pressed` | `color.red.800` | `#b31220` | Destructive Action Pressed |
| `interactive.danger.subtle` | `color.red.50` | `#ffeaec` | Destructive Action(연한 톤) Background Default |
| `interactive.danger.subtle-hover` | `color.red.100` | `#fdd4d6` | Destructive Action(연한 톤) Background Hover / Pressed |

> Primary Interaction은 Foundation의 정규 Purple scale을 그대로 사용합니다.
>
> - Default: `color.purple.500`
> - Hover: `color.purple.600`
> - Pressed: `color.purple.700`
>
> 기존 제품/Figma에서 사용하던 중간 색상은 참고하되, 해당 값을 보존하기 위해 임의의 Foundation 단계(예: 550)를 추가하지 않습니다.
>
> `interactive.secondary`는 역할과 단계가 명확하도록 무채색 계열의 연속된 세 단계(Default/Hover/Pressed)를
> 기본값으로 정의합니다. 정확한 값은 위 표 참고.
>
> Disabled는 별도의 `interactive.disabled`를 만들지 않습니다.
>
> - Background: `surface.disabled`
> - Content: `content.disabled`
> - Border: `border.disabled`
>
> `interactive.danger`는 `status.error`(대표 에러 Color)와 Default 단계가 정확히 같은
> `color.red.600`을 공유합니다 — "에러 상태 빨강"과 "Destructive 버튼 빨강"이 하나의 빨강으로
> 인식되도록 의도한 선택입니다. 원래 `red.500`을 먼저 검토했으나, shadcn 원본 destructive
> 색(`oklch(0.577 0.245 27.325)`, sRGB로 `#dc2626` 근방)과 밝기를 비교한 결과 `red.500`이
> 원본보다 눈에 띄게 밝고(`red.500`의 인지 밝기가 원본보다 약 15% 높음), `red.600`이 원본과
> 가장 가까웠습니다(약 4% 차이). Hover/Pressed는 `interactive.primary`와 동일한 +100/+200
> 단계 패턴(600→700→800)을 따릅니다 — 이 폭은 `interactive.primary`의 500→700 낙차(약 40%
> 어두워짐)보다도 완만해서(600→800 약 30%) 과하게 어두워지지 않습니다.
>
> **`interactive.danger.subtle*`는 Button destructive의 연한 배경 톤**을 위한 별도
> 토큰이다. shadcn 원본(`base-nova` 스타일)은 이 톤을 opacity로 만든다
> (`bg-destructive/10`, hover `/20`) — 실제로 `color.red.600`을 흰 배경 위에서 10%/20%
> 섞으면 `color.red.50`/`color.red.100`과 거의 정확히 일치한다(직접 계산해서 확인:
> red.600 10% blend ≈ `#fce9ea` vs red.50 `#ffeaec`, 20% blend ≈ `#f9d4d6` vs red.100
> `#fdd4d6`). 즉 **원본이 opacity로 흉내 내던 색을 고정 Foundation 값으로 그대로
> 대체할 수 있다** — 배경에 따라 실제 색이 달라지는 opacity 특유의 문제 없이 똑같은
> 톤을 재현한다. opacity의 실질적 이점(라이트/다크 배경에 자동으로 맞는 톤이 나옴,
> 그래서 원본도 `dark:bg-destructive/20`처럼 dark 전용 opacity 값을 별도로 뒀다)은
> 지금 다크모드를 만들지 않기로 한 상태라 당장은 포기해도 손해가 없다 — 다크모드를
> 실제로 만들 때는 `interactive.danger.subtle-dark` 같은 별도 고정 토큰을 그때
> 추가한다.
>
> Pressed는 별도 3단계(`subtle-pressed`)를 만들지 않고 **`subtle-hover`와 동일한
> 값을 재사용**한다 — shadcn 원본도 destructive에 hover만 있고 press 전용 색은
> 없다(마우스를 누르려면 이미 hover 상태를 거치므로 원본에서도 사실상 항상 같은
> 색으로 보인다). `interactive.primary`/`interactive.secondary`처럼 3단계가 필요한
> 근거가 없어 굳이 세 번째 값을 새로 만들지 않았다.

---

### Status

상태 자체의 의미를 전달하는 대표 Color입니다.

| Token | Foundation Color | Value | Usage |
|---|---|---|---|
| `status.success` | `color.green.400` | `#48bb78` | Success 상태의 대표 Color |
| `status.error` | `color.red.600` | `#e22732` | Error / Invalid 상태의 대표 Color |

> `status.error`는 원래 `color.red.500`이었으나, `interactive.danger` 정의 과정에서 shadcn
> 원본 destructive 색과 밝기를 비교한 결과 `red.600`이 더 가깝다고 판단되어 함께 조정했습니다
> (`interactive.danger.default`와 같은 값 공유, 근거는 위 Interactive 섹션 참고).
>
> `status.warning`, `status.info`는 현재 공통 사용 근거가 부족하므로 정의하지 않습니다.
>
> `status.*`는 특정 요소의 Content나 Border 역할이 아니라, **상태 자체의 의미를
> 대표해서 전달하는 UI**에 사용합니다. 반대로 요소의 역할이 명확한 경우엔 역할별
> Semantic Token을 우선 사용합니다 — Text/Icon 콘텐츠처럼 Content 역할이 명확하면
> `content.*`(예: `content.error`)를, Control Border/Outline처럼 Border 역할이
> 명확하면 `border.*`(예: `border.error`)를 먼저 참조합니다.
>
> 아직 역할별 토큰이 정의되지 않은 축(예: Surface)은, 실제 Component에서 필요성이
> 확인되는 시점에 역할별 Semantic Token을 추가합니다.

---

### ⚠️ 다크모드 착수 전 체크리스트

BDS는 아직 다크모드를 만들지 않았습니다(라이트 단일 세트만 존재). shadcn
원본은 여러 상태 색을 opacity(`bg-x/10`, `dark:bg-x/20` 등)로 만들어서
라이트/다크 배경에 자동으로 맞는 톤을 얻었는데, BDS는 그 opacity를
"배경에 따라 색이 달라진다"는 이유로 대부분 **고정 hex 값**으로
바꿨습니다. 그 결과 **다크모드를 실제로 만들 때, 아래 항목들은 라이트
값을 그대로 다크에 쓸 수 없고 각각 다크 전용 고정값을 새로 정의해야
합니다** — opacity였다면 공짜로 따라왔을 다크 대응을, 지금은 수동으로
채워야 하는 대가입니다.

| 컴포넌트 | 항목 | 원본(opacity) | BDS 현재(라이트 고정값만) |
|---|---|---|---|
| Input / Textarea | Disabled bg/border/text | `bg-x/50`, `dark:bg-x/30`, `dark:disabled:bg-x/80` | `surface.disabled` / `border.disabled` / `content.disabled` |
| InputGroup | Disabled bg | `has-disabled:bg-x/50`, `dark:has-disabled:bg-x/80` | `surface.disabled` |
| Label / Field(FieldLabel, FieldTitle) | Disabled text | `opacity-50` | `content.disabled` |
| Button (전 variant) | Disabled bg/border/text | `disabled:opacity-50` | `surface.disabled` / `border.disabled` / `content.disabled` |
| Button destructive | 연한 배경(subtle) | `bg-destructive/10`, `hover:/20`, `dark:/20`, `dark:hover:/30` | `interactive.danger.subtle`, `subtle-hover` (라이트만) |

> 아직 손대지 않고 opacity 그대로 남겨둔 것도 있습니다 — `InputGroupAddon`의
> `group-data-[disabled=true]/input-group:opacity-50`(아이콘/버튼/텍스트가
> 섞인 이질적 콘텐츠라 예외로 남김, `input-group.md` 참고), `FieldLabel`의
> 카드형 focus ring(`has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50`
> — Checkbox/Radio 작업 때 같이 재검토 대상, `field.md` 참고). 배경
> 워시(`has-data-checked:bg-primary/10`)는 라이트/다크 모두 이미 같은 값을
> 쓰고 있어 다크모드 재검토 대상에서는 제외됩니다.

---

### shadcn/ui Theme Adapter

> shadcn/ui 기존 Theme Token 이름은 유지하고 BDS Semantic Token을 참조하도록 연결합니다.
> shadcn Theme Token은 BDS Semantic과 shadcn Component 사이의 Compatibility Layer이며,
> BDS Semantic의 이름을 shadcn에 맞춰 변경하지 않습니다.

```css
--background: var(--surface-canvas);
--foreground: var(--content-primary);

--card: var(--surface-elevated);
--card-foreground: var(--content-primary);

--popover: var(--surface-elevated);
--popover-foreground: var(--content-primary);

--primary: var(--interactive-primary-default);
--primary-foreground: var(--content-inverse);

--secondary: var(--interactive-secondary-default);
--secondary-foreground: var(--content-inverse);

--muted: var(--surface-subtle);
--muted-foreground: var(--content-secondary);

--accent: var(--surface-subtle);
--accent-foreground: var(--content-primary);

--border: var(--border-default);
--input: var(--border-default);
--ring: var(--border-focus);

--destructive: var(--status-error);
```

> BDS에서 직접 제작하는 Component는 `--modal-background`, `--panel-background` 같은
> Component별 Color Token을 새로 만들지 않고 BDS Semantic Token을 직접 사용합니다.
>
> Component별 Size / Spacing / Radius / State 조합은 각 Component MD에서 정의합니다.
