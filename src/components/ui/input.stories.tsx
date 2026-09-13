import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Input } from "./input"

/** docs/input.md 기준. */
const meta = {
  title: "Form Controls/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  args: { placeholder: "예: Apple", size: "md" },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Storybook layout:"centered"는 shrink-to-fit 컨테이너라 w-full(Default)/
// grid의 1fr(StateSizeMatrix)이 기준 삼을 확정 width를 못 받아 콘텐츠 크기로
// 눌린다(Accordion의 width 이슈와 동일한 원인). definite width wrapper로
// 감싸 기준을 고정해준다 — dev 페이지(정상 block 레이아웃)에서는 이미 안정적.
export const Default: Story = {
  render: (args) => (
    <div className="w-48 max-w-full">
      <Input {...args} />
    </div>
  ),
}

/** Input의 Default, Disabled, Invalid 상태를 sm/md/lg 사이즈별로 비교합니다. */
export const StateSizeMatrix: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="w-full">
      <div className="grid grid-cols-[80px_repeat(3,minmax(0,1fr))] items-center gap-3">
        <span />
        <span className="text-xs text-muted-foreground">sm</span>
        <span className="text-xs text-muted-foreground">md</span>
        <span className="text-xs text-muted-foreground">lg</span>

        <span className="text-xs text-muted-foreground">Default</span>
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />

        <span className="text-xs text-muted-foreground">Disabled</span>
        <Input size="sm" placeholder="Small" disabled />
        <Input size="md" placeholder="Medium" disabled />
        <Input size="lg" placeholder="Large" disabled />

        <span className="text-xs text-muted-foreground">Invalid</span>
        <Input size="sm" placeholder="Small" aria-invalid />
        <Input size="md" placeholder="Medium" aria-invalid />
        <Input size="lg" placeholder="Large" aria-invalid />
      </div>
    </div>
  ),
}
