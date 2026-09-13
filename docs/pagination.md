# Pagination

Pagination은 여러 페이지로 나뉜 목록/테이블을 넘나드는 네비게이션이다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — primitive 의존 없음, `Button`
  조합(`render` prop으로 `<a>`를 렌더링)으로 구현.
- 코드: `src/components/ui/pagination.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/pagination`

------------------------------------------------------------------------

## 서브컴포넌트

`Pagination`(nav) / `PaginationContent`(ul) / `PaginationItem`(li) /
`PaginationLink`(페이지 번호) / `PaginationPrevious` / `PaginationNext` /
`PaginationEllipsis`(생략 표시).

------------------------------------------------------------------------

## 고친 부분: Button 사이즈 매핑

shadcn 원본은 자기 프로젝트 `Button`의 `default`/`icon` 사이즈를 쓰는데,
BDS `Button`엔 그 이름이 없다 (`sm`/`md`/`lg`/`icon-sm`/`icon-md`/`icon-lg`).
그래서:

| shadcn 원본 | BDS 매핑 | 이유 |
|---|---|---|
| 페이지 번호 `size="icon"` | `icon-sm` | |
| Previous/Next `size="default"` | `sm` | 둘 다 h-10(40px)이라 한 줄에서 높이가 맞음 |

색상(체크됨/hover 등)은 `Button`의 `outline`(`isActive`)/`ghost`(기본)
variant를 그대로 재사용하므로 별도 토큰 작업이 필요 없었다.

------------------------------------------------------------------------

## 고친 부분: showText prop (아이콘 전용 지원)

shadcn 원본의 Previous/Next는 `hidden sm:block`으로 텍스트를 반응형으로만
숨긴다 (좁은 화면에서만 숨음). 아이콘 버튼만 쓰고 싶은 경우를 위해
`showText` prop을 추가했다 — `false`면 텍스트 없이 `icon-sm` 크기로
렌더링된다.

```tsx
<PaginationPrevious href="#" showText={false} />
<PaginationNext href="#" showText={false} />
```

> shadcn 원본에도 "Icons Only"(Select와 조합한 rows-per-page 패턴)
> 변형이 있지만, `Select` 컴포넌트가 별도로 필요해서 이번 범위에서는
> 만들지 않았다. `showText`는 그 조합 없이 아이콘 전용 Previous/Next만
> 필요한 경우를 위한 것이다.

------------------------------------------------------------------------

## 버그: data-slot 충돌로 인한 hydration mismatch

`PaginationLink`는 `Button`에 `render={<a data-slot="pagination-link" .../>}`
형태로 커스텀 엘리먼트를 넘기는데, `Button`이 내부적으로
`data-slot="button"`을 하드코딩해서 두 값이 충돌했다. base-ui의
render-prop 병합 순서가 서버/클라이언트에서 다르게 해석되면서
hydration mismatch 콘솔 에러가 발생했다.

**고친 방법**: `data-slot`을 `render`로 넘기는 `<a>`가 아니라 **`Button`
자신의 prop**으로 옮겼다 — `{...props}` 스프레드로 결정적으로 덮어써지므로
서버/클라이언트가 항상 같은 값을 렌더링한다.

```tsx
// Before (충돌)
<Button render={<a data-slot="pagination-link" {...props} />} />

// After (해결)
<Button data-slot="pagination-link" render={<a {...props} />} />
```

------------------------------------------------------------------------

## Project Override 지점 (현재)

- 사이즈 매핑: 페이지 번호 `icon-sm`, Previous/Next `sm`.
- `showText` prop 추가 (shadcn 원본엔 없음).

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **Icons Only + Select 조합**: `Select` 컴포넌트 작업 후 필요하면 추가.
- **RTL**: shadcn 원본에 RTL 예제가 있으나 프로젝트에 RTL 지원 계획이
  없어 만들지 않음.
