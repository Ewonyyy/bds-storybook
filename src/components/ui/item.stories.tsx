import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import Image from "next/image"
import { Wallet } from "lucide-react"

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "./item"

const IMAGE_SIZES = { sm: 16, md: 24, lg: 32 } as const

/**
 * docs/item.md 기준. size: sm/md/lg(아이콘·gap·타이포가 함께 스케일).
 * variant: default/outline/muted.
 */
const meta = {
  title: "Data Display/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "muted"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Item variant="outline" className="w-80">
      <ItemMedia variant="icon">
        <Wallet />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>지갑 연결</ItemTitle>
        <ItemDescription>Kaia 지갑을 연결해 토큰을 확인하세요.</ItemDescription>
      </ItemContent>
    </Item>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["default", "outline", "muted"] as const).map((variant) => (
        <Item key={variant} variant={variant} className="w-80">
          <ItemMedia variant="icon">
            <Wallet />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{variant}</ItemTitle>
            <ItemDescription>variant=&quot;{variant}&quot;</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
}

/** Item의 sm/md/lg 사이즈를 보여줍니다. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Item key={size} size={size} className="w-80">
          <ItemMedia variant="image">
            <Image
              src="/token-kaia.svg"
              alt=""
              width={IMAGE_SIZES[size]}
              height={IMAGE_SIZES[size]}
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>size = {size}</ItemTitle>
          </ItemContent>
        </Item>
      ))}
    </div>
  ),
}
