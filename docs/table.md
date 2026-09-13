# Table

Table은 행/열 구조의 데이터를 보여주는 컴포넌트다. 행별 액션이 필요한
경우를 위해 `DropdownMenu`도 같이 추가했다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — 순수 HTML `<table>` 래퍼
  (`Table`/`TableHeader`/`TableBody`/`TableFooter`/`TableRow`/`TableHead`/
  `TableCell`/`TableCaption`), `DropdownMenu`는 `@base-ui/react/menu`
  (`MenuPrimitive`)에 의존.
- 코드: `src/components/ui/table.tsx`, `src/components/ui/dropdown-menu.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/table`

------------------------------------------------------------------------

## 색상: design.md 어댑터를 그대로 따른다

| 사용처 | 클래스 | 경로 | Semantic Token |
|---|---|---|---|
| 행 구분선 / 헤더 밑줄 / Footer 윗줄 | `border-[var(--border-subtle)]` | `--border-subtle` | `border.subtle` |
| 행 hover / 선택됨 배경 | `hover:bg-muted` / `data-[state=selected]:bg-muted` | `--muted` → `--surface-subtle` | `surface.subtle` |
| 헤더 텍스트 | `text-foreground` | `--foreground` → `--content-primary` | `content.primary` |
| Caption / 보조 텍스트 | `text-muted-foreground` | `--content-secondary` | `content.secondary` |
| DropdownMenu 배경 | `bg-popover` | `--popover` → `--surface-elevated` | `surface.elevated` |
| DropdownMenu 삭제 항목 | `text-destructive` / `focus:bg-destructive/10` | `--status-error` | `status.error` (배경 10%는 `opacity.10`과 일치) |

### 고친 부분: border.subtle 통일

Accordion/Alert/Toast/Card와 동일한 이유 — `border`(→`border.default`)
대신 `border.subtle`로 교체. 행 구분선처럼 반복되는 가는 선에는 더 옅은
톤이 맞다고 이미 여러 컴포넌트에서 확정된 기준이라 Table/DropdownMenu에도
그대로 적용했다.

------------------------------------------------------------------------

## shadcn 공식 예제 중 일부만 재현 + 자체 추가 2종

GitHub `registry/bases/base/examples/table-example.tsx`에는 원래 7종
(Basic / With Footer / Simple / With Badges / **With Actions** / With
Select / With Input)이 있는데, 이 중 **Basic**과 **With Footer**("Footer
(합계 행)"), **With Actions**("Actions (행별 드롭다운 메뉴)") 3개만
가져왔다. `With Badges` / `With Select` / `With Input`은 반영되지 않았다.

대신 shadcn 공식 예제엔 없는 2종을 자체로 추가했다(코드 주석에도 명시돼
있음):

- **Basic (가로형 - 행 제목)**: 컬럼 헤더 대신 각 행의 첫 칸이 제목
  역할을 하는 형태. 헤더 행 없이 `TableBody`만 쓰고 짝수 행에
  `bg-muted/50`(zebra stripe)을 준다.
- **With Image (썸네일)**: 행마다 썸네일 이미지가 들어간 버전. 실제
  상품 이미지가 없어서 아이콘 플레이스홀더(`bg-muted` 사각형 + 아이콘)로
  대체했다.
- **Actions (가로형 - 행 제목)**: 위 두 패턴(가로형 + 드롭다운 액션)을
  합친 조합.

`With Actions`는 shadcn 원본 그대로 `DropdownMenuTrigger`를
`render={<Button variant="ghost" size="icon-sm" className="size-8" />}`로
렌더링한다(원본은 `size="icon"`이지만, BDS Button엔 `icon-sm`/`icon-md`/
`icon-lg`만 있어서 가장 작은 `icon-sm`으로 대응).

------------------------------------------------------------------------

## Project Override 지점 (현재)

- Border: 행 구분선/헤더/Footer/DropdownMenu Separator 전부
  `border.subtle`로 고정.
- DropdownMenu 아이콘 버튼: `size="icon-sm"`(BDS 스케일의 가장 작은
  아이콘 사이즈)로 대응.

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **With Badges / With Select / With Input**: shadcn 공식 예제에는
  있지만 이번 범위에서 제외됨 — 필요해지면 추가.
- **Shadow 토큰**: `DropdownMenuContent`는 `shadow-md`(Tailwind 기본
  스케일)를 쓴다. `component/combobox` 브랜치에 Shadow Foundation Token
  (`shadow.100/200/300`)이 추가돼 있지만 아직 이 브랜치엔 merge 전이라
  반영하지 않았다 — combobox 토큰이 merge되면 재검토.
- **`shadow-lg`(DropdownMenuSubContent)**: 서브메뉴 기능 자체가 Table
  테스트 페이지에서 아직 안 쓰여서 검증하지 않음.
