import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Save } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { Button } from "./button"
import { Kbd } from "./kbd"

/**
 * docs/tooltip.md 기준. "Button/Input과 달리 sm/md/lg 같은 Size variant를
 * 두지 않는다" — 단일 값만 존재한다.
 */
const meta = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Sides: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-6">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>
              {side}
            </TooltipTrigger>
            <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
}

export const Align: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-6">
        {(["start", "center", "end"] as const).map((align) => (
          <Tooltip key={align}>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>
              {align}
            </TooltipTrigger>
            <TooltipContent align={align}>Align {align}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  ),
}

export const LongText: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-6">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            Long text
          </TooltipTrigger>
          <TooltipContent>
            max-w-xs를 넘어가는 긴 설명 텍스트는 자동으로 줄바꿈됩니다.
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

export const WithKbd: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-6">
        <Tooltip>
          <TooltipTrigger
            render={<Button size="icon-sm" variant="outline" aria-label="Save" />}
          >
            <Save />
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">
              Save Changes <Kbd>S</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}
