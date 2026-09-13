import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

// Storybook 매니저 UI(사이드바 선택 표시, 버튼, 링크 등)의 포인트 컬러.
// interactive.primary.default(color.purple.500, #6932eb)보다 2단계 밝은
// color.purple.300(#ada0f8)을 사용 — design.md Foundation Purple 스케일
// 참고. 실제 Semantic Token(interactive.primary.default)을 바꾸는 게
// 아니라 Storybook 매니저 UI 전용 장식색이라 Foundation 단계값을 그대로
// 가져다 쓴다. 매니저 UI는 별도 빌드 컨텍스트라 CSS 변수를 직접 참조할
// 수 없어 리터럴 hex로 둔다. base는 기존 다크 사이드바 그대로 유지.
const BDS_PRIMARY = '#ada0f8'

const theme = create({
  base: 'dark',
  colorPrimary: BDS_PRIMARY,
  colorSecondary: BDS_PRIMARY,
  barSelectedColor: BDS_PRIMARY,
})

addons.setConfig({
  theme,
})

// 참고: 사이드바 트리의 Docs(주황)/Story(청록) 아이콘 색은 `theme.color.gold`/
// `theme.color.seafoam` 필드로 노출돼 있지만, 실제로 그 아이콘들에는 반영되지
// 않는다(Storybook 사이드바 TreeNode 아이콘이 이 필드를 참조하지 않음, 실측
// 확인함) — 대신 `main.ts`의 `managerHead`에서 `svg[type="document"]`/
// `svg[type="story"]` CSS 선택자로 직접 오버라이드한다.
