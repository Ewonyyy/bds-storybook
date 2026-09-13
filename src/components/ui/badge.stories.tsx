import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowUpRight, BadgeCheck } from "lucide-react"

import { Badge } from "./badge"
import { VariantGrid } from "@/components/dev-preview/storybook-docs"

/** docs/badge.md 기준. Button과 동일한 6종 Variant 구성을 그대로 따른다. */
const meta = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
  },
  args: { children: "Badge", variant: "default" },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: () => (
    <VariantGrid
      items={(
        ["default", "secondary", "destructive", "outline", "ghost", "link"] as const
      ).map((variant) => ({
        label: variant,
        children: (
          <Badge variant={variant} className="capitalize">
            {variant}
          </Badge>
        ),
      }))}
    />
  ),
}

export const IconLabel: Story = {
  render: () => (
    <VariantGrid
      items={(
        ["default", "secondary", "destructive", "outline", "ghost", "link"] as const
      ).map((variant) => ({
        label: variant,
        children: (
          <Badge variant={variant} className="capitalize">
            <BadgeCheck data-icon="inline-start" />
            {variant}
          </Badge>
        ),
      }))}
    />
  ),
}

export const Interactive: Story = {
  render: () => (
    <VariantGrid
      items={(["default", "secondary", "destructive", "ghost"] as const).map(
        (variant) => ({
          label: variant,
          children: (
            <Badge
              variant={variant}
              render={
                <a href="#">
                  <span className="capitalize">{variant}</span>
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              }
            />
          ),
        })
      )}
    />
  ),
}
