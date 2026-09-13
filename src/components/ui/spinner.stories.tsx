import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowUpIcon } from "lucide-react"

import { Spinner } from "./spinner"
import { VariantGrid } from "@/components/dev-preview/storybook-docs"
import { Badge } from "./badge"
import { Button } from "./button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "./input-group"

/**
 * docs/spinner.md 기준. 별도 Size prop이 없다 — 기본 `size-4`(16px)이고,
 * 더 큰 크기는 `className`으로 덮어쓴다(shadcn 원본 패턴 그대로).
 */
const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Spinner의 다양한 크기를 비교합니다. */
export const Sizes: Story = {
  render: () => (
    <VariantGrid
      items={[
        { label: "size-4 (기본, 16px)", children: <Spinner /> },
        { label: "size-5 (20px)", children: <Spinner className="size-5" /> },
        { label: "size-6 (24px)", children: <Spinner className="size-6" /> },
        { label: "size-8 (32px)", children: <Spinner className="size-8" /> },
      ]}
    />
  ),
}

export const Color: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-[var(--content-primary)]">
        <Spinner />
      </span>
      <span className="text-[var(--content-secondary)]">
        <Spinner />
      </span>
      <span className="text-[var(--content-disabled)]">
        <Spinner />
      </span>
      <span className="text-[var(--content-brand)]">
        <Spinner />
      </span>
      <span className="text-[var(--content-error)]">
        <Spinner />
      </span>
      <div className="flex flex-col items-center gap-1">
        <span className="inline-flex rounded bg-[var(--interactive-primary-default)] p-2 text-[var(--content-inverse)]">
          <Spinner />
        </span>
        <span className="text-[10px] text-muted-foreground">
          content.inverse
        </span>
      </div>
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>
        <Spinner />
        Loading
      </Button>
    </div>
  ),
}

export const BadgeSpinner: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge>
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Processing
      </Badge>
    </div>
  ),
}

export const InputGroupSpinner: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Send a message..." disabled />
        <InputGroupAddon align="block-end">
          <Spinner /> Validating...
          <InputGroupButton className="ml-auto" variant="default">
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}
