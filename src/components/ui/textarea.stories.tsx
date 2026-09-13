import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Textarea } from "./textarea"

/** docs/textarea.md 기준. min-height는 사이즈 공통 고정, font/padding만 sm/md/lg로 반응. */
const meta = {
  title: "Form Controls/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
  args: { placeholder: "메모", size: "md" },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

// Storybook layout:"centered"는 shrink-to-fit 컨테이너라 w-full(Default)/
// grid의 1fr(StateSizeMatrix)이 기준 삼을 확정 width를 못 받아 콘텐츠 크기로
// 눌린다(Accordion의 width 이슈와 동일한 원인). definite width wrapper로
// 감싸 기준을 고정해준다 — dev 페이지(정상 block 레이아웃)에서는 이미 안정적.
export const Default: Story = {
  render: (args) => (
    <div className="w-56 max-w-full">
      <Textarea {...args} />
    </div>
  ),
}

/** Textarea의 Default, Disabled, Invalid 상태를 sm/md/lg 사이즈별로 비교합니다. */
export const StateSizeMatrix: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="w-full">
      <div className="grid grid-cols-[80px_repeat(3,minmax(0,1fr))] items-start gap-3">
        <span />
        <span className="text-xs text-muted-foreground">sm</span>
        <span className="text-xs text-muted-foreground">md</span>
        <span className="text-xs text-muted-foreground">lg</span>

        <span className="pt-2 text-xs text-muted-foreground">Default</span>
        <Textarea size="sm" placeholder="Small" />
        <Textarea size="md" placeholder="Medium" />
        <Textarea size="lg" placeholder="Large" />

        <span className="pt-2 text-xs text-muted-foreground">Disabled</span>
        <Textarea size="sm" placeholder="Small" disabled />
        <Textarea size="md" placeholder="Medium" disabled />
        <Textarea size="lg" placeholder="Large" disabled />

        <span className="pt-2 text-xs text-muted-foreground">Invalid</span>
        <Textarea size="sm" placeholder="Small" aria-invalid />
        <Textarea size="md" placeholder="Medium" aria-invalid />
        <Textarea size="lg" placeholder="Large" aria-invalid />
      </div>
    </div>
  ),
}
