# Alert

Alert는 페이지/섹션 안에 고정으로 표시하는 알림 박스다. 화면 구석에 떴다
사라지는 Toast와 달리, 사용자가 닫기 전까지 그 자리에 계속 남아있는다.

------------------------------------------------------------------------

## 기준 문서

- Foundation / Semantic: `design.md`
- 구현 기반: shadcn/ui `base` 스타일 — primitive 의존 없이 `cva` + 순수
  `<div>`. (base-ui를 쓰는 Accordion/Toast와 달리 인터랙션이 없어서 별도
  primitive가 필요 없다.)
- 코드: `src/components/ui/alert.tsx`
- 테스트 페이지: `src/app/dev/shadcn-test/alert`

------------------------------------------------------------------------

## variant: default / destructive

| variant | 용도 |
|---|---|
| `default` | 일반 안내 |
| `destructive` | 에러/실패 알림 |

서브컴포넌트: `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction`(우측
상단 고정 액션 버튼 자리).

------------------------------------------------------------------------

## 색상: design.md 어댑터를 그대로 따른다

| 사용처 | 클래스 | 경로 | Semantic Token |
|---|---|---|---|
| 배경 | `bg-card` | `--card` → `--surface-elevated` | `surface.elevated` |
| 기본 텍스트 | `text-card-foreground` | `--card-foreground` → `--content-primary` | `content.primary` |
| destructive 텍스트/아이콘 | `text-destructive` | `--destructive` → `--status-error` | `status.error` |
| 설명 텍스트 | `text-muted-foreground` | `--content-secondary` | `content.secondary` |

### 고친 부분: border

shadcn 원본(GitHub `bases/base/ui/alert.tsx` + `style-nova.css`
`.cn-alert`)도 그냥 `border` 하나만 쓰지만, 그건 shadcn 프로젝트 자체의
전역 `--border`가 옅은 회색이기 때문에 성립하는 것이다. 우리 프로젝트의
`border.default`는 Input/Select 같은 control용으로 정의돼 있어 그대로
쓰면 원본보다 눈에 띄게 진하게 나온다. Toast/Accordion과 동일한 이유로
`border.subtle`로 교체했다.

```
border            →  border border-[var(--border-subtle)]
```

------------------------------------------------------------------------

## Project Override 지점 (현재)

- Border: 위 설명대로 `border.subtle`로 고정.
- Action 버튼 크기: 테스트 페이지 전용 `h-6`/`px-2`/`gap-1`/`text-xs`
  오버라이드 (BDS Button 컴포넌트 자체 사이즈 스케일은 변경하지 않음,
  아래 "알려진 미해결 항목" 참고).

------------------------------------------------------------------------

## 알려진 미해결 항목 (v1 범위 밖)

- **Warning 톤**: 테스트 페이지의 "Custom Colors (Warning)" 예시는
  `design.md`에 `status.warning` 토큰이 없어서 raw hex(`border-[#fbd38d]`
  등, Foundation Orange 팔레트 값)로 임시 처리돼 있다. `status.warning`을
  Semantic으로 승격하는 건 별도 논의가 필요해 보류 상태 — 지금은 만들지
  않기로 확인함.
- **Action 버튼 크기**: shadcn 공식 페이지의 "Action" 예제를 실측해보니
  실제 크기는 `24px`(`h-6`)/`gap-1`(4px)/`px-2`(8px)/`text-xs`(12px)였다
  (문서에 적힌 코드 자체엔 크기 지정이 없음). 이 값들은 전부 Foundation
  토큰(`size.24`/`space.4`/`space.8`/`font.size.12`)과 일치하지만, BDS
  `Button` 컴포넌트의 공식 사이즈 스케일(`sm`=40px가 최소)엔 이 크기가
  없어서, `AlertAction` 안에서 쓰이는 이 인스턴스에만 `className`으로
  오버라이드했다(Toast의 `h-7`/`size-7` 오버라이드와 동일한 방식). 나중에
  Button에 더 작은 공식 사이즈(예: `xs`)가 추가되면 이 오버라이드를 그
  공식 사이즈로 교체하는 걸 재검토 — Toast의 `h-7`(28px) 오버라이드와
  같이 검토할 것(용도가 다름: Alert은 텍스트 버튼, Toast Close는 아이콘
  전용 — 같은 값으로 통일될지는 미정).
