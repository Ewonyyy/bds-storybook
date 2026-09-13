import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Download, GitBranch, Plus, Search } from "lucide-react"

import { Button } from "./button"
import { Spinner } from "./spinner"
import { VariantGrid } from "@/components/dev-preview/storybook-docs"

/**
 * docs/button.md 기준. Variant/Size는 BDS가 소유하고, 구조·접근성·키보드/포커스
 * 처리만 Base UI(`@base-ui/react/button`)를 채용한다.
 */
const meta = {
  title: "Form Controls/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button은 사용자의 조작을 트리거하는 기본 인터랙티브 컴포넌트입니다 (docs/button.md 기준).",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon-sm", "icon-md", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Button의 6가지 variant와 sm/md/lg 사이즈 조합을 한눈에 비교합니다. */
export const VariantSizeMatrix: Story = {
  render: () => (
    <div className="grid grid-cols-[80px_repeat(3,auto)] items-center gap-3">
      <span />
      <span className="text-xs text-muted-foreground">sm</span>
      <span className="text-xs text-muted-foreground">md</span>
      <span className="text-xs text-muted-foreground">lg</span>

      {(
        ["default", "secondary", "outline", "ghost", "destructive", "link"] as const
      ).map((variant) => (
        <React.Fragment key={variant}>
          <span className="text-xs text-muted-foreground capitalize">
            {variant}
          </span>
          <Button variant={variant} size="sm">
            Button
          </Button>
          <Button variant={variant} size="md">
            Button
          </Button>
          <Button variant={variant} size="lg">
            Button
          </Button>
        </React.Fragment>
      ))}
    </div>
  ),
}

/** Button의 default, secondary, outline, ghost, destructive, link 6가지 variant를 보여줍니다. */
export const Variants: Story = {
  render: () => (
    <VariantGrid
      items={(
        ["default", "secondary", "outline", "ghost", "destructive", "link"] as const
      ).map((variant) => ({
        label: variant,
        children: <Button variant={variant}>Button</Button>,
      }))}
    />
  ),
}

/** Button의 sm/md/lg 사이즈를 보여줍니다. */
export const Sizes: Story = {
  render: () => (
    <VariantGrid
      items={(["sm", "md", "lg"] as const).map((size) => ({
        label: size,
        children: <Button size={size}>Button</Button>,
      }))}
    />
  ),
}

/** 아이콘만 있는 Button을 사이즈와 variant별로 보여줍니다. */
export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon-sm" aria-label="검색">
        <Search />
      </Button>
      <Button size="icon-md" aria-label="검색">
        <Search />
      </Button>
      <Button size="icon-lg" aria-label="검색">
        <Search />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="검색">
        <Search />
      </Button>
      <Button size="icon-md" variant="outline" aria-label="검색">
        <Search />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="검색">
        <Search />
      </Button>
      <Button size="icon-md" variant="ghost" aria-label="검색">
        <Search />
      </Button>
    </div>
  ),
}

/** 아이콘과 텍스트를 함께 배치한 Button을 variant와 사이즈별로 보여줍니다. */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button>
          <Download data-icon="inline-start" />
          Download
        </Button>
        <Button variant="outline">
          Next
          <GitBranch data-icon="inline-end" />
        </Button>
        <Button variant="secondary">
          <Plus data-icon="inline-start" />
          New
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">
          <Download data-icon="inline-start" />
          Download
        </Button>
        <Button size="md">
          <Download data-icon="inline-start" />
          Download
        </Button>
        <Button size="lg">
          <Download data-icon="inline-start" />
          Download
        </Button>
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <VariantGrid
      items={(
        ["default", "secondary", "outline", "ghost", "destructive", "link"] as const
      ).map((variant) => ({
        label: variant,
        children: (
          <Button variant={variant} disabled>
            Button
          </Button>
        ),
      }))}
    />
  ),
}

/** Spinner로 로딩 상태를 표시하는 Button을 보여줍니다. */
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Loading
      </Button>
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Loading
      </Button>
      <Button size="icon-md" disabled aria-label="로딩 중">
        <Spinner />
      </Button>
    </div>
  ),
}
