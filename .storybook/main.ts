import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/components/ui/**/*.mdx",
    "../src/components/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "../public"
  ],
  // 사이드바 트리의 Docs/Story 아이템 아이콘 색(기본: 주황/청록)을 BDS
  // 포인트 컬러(color.purple.300, #ada0f8 — manager.ts와 동일 값)로 통일.
  // `theme.color.gold`/`seafoam`으로는 이 아이콘들이 안 바뀌어서(실측
  // 확인), emotion 해시가 아닌 안정적인 `type` 속성을 직접 타겟한다.
  managerHead: (head) => `
    ${head}
    <style>
      svg[type="document"], svg[type="story"] {
        color: #ada0f8 !important;
      }
    </style>
  `,
};
export default config;