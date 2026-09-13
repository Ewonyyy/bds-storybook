import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { Check, Copy, Eye, Globe, Mic, Radio, Search, X } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./input-group"

/**
 * docs/input-group.md 기준. Input 위에 Icon/Text/Button addon을 얹는 조합
 * 컴포넌트 — size는 InputGroup과 InputGroupInput 양쪽에 동일하게 전달해야 한다
 * (자동 전파되지 않는 알려진 gap).
 */
const meta = {
  title: "Form Controls/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <InputGroup className="w-64">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search" />
    </InputGroup>
  ),
}

/** InputGroup의 아이콘, 텍스트, 버튼 addon을 sm/md/lg 사이즈별로 비교합니다. */
export const AddonSizeMatrix: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="w-full">
      <div className="grid grid-cols-[80px_repeat(3,minmax(0,1fr))] items-center gap-3">
        <span />
        <span className="text-xs text-muted-foreground">sm</span>
        <span className="text-xs text-muted-foreground">md</span>
        <span className="text-xs text-muted-foreground">lg</span>

        <span className="text-xs text-muted-foreground">아이콘</span>
        {(["sm", "md", "lg"] as const).map((size) => (
          <InputGroup key={size} size={size}>
            <InputGroupInput size={size} placeholder="Search" />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        ))}

        <span className="text-xs text-muted-foreground">텍스트</span>
        {(["sm", "md", "lg"] as const).map((size) => (
          <InputGroup key={size} size={size}>
            <InputGroupAddon>
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput size={size} placeholder="0.00" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>USD</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        ))}

        <span className="text-xs text-muted-foreground">버튼</span>
        {(["sm", "md", "lg"] as const).map((size) => (
          <InputGroup key={size} size={size}>
            <InputGroupInput size={size} placeholder="Search" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton aria-label="지우기" size="icon-xs">
                <X />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        ))}
      </div>
    </div>
  ),
}

function CopyInputGroup() {
  const [copied, setCopied] = useState(false)

  return (
    <InputGroup>
      <InputGroupInput readOnly defaultValue="https://x.com/shadcn" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label="복사"
          size="icon-xs"
          onClick={() => {
            navigator.clipboard.writeText("https://x.com/shadcn")
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          }}
        >
          {copied ? <Check /> : <Copy />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

/** Copy 버튼, Password, 양쪽 addon, URL, Textarea 등 InputGroup의 실사용 예시를 모아 보여줍니다. */
export const Cases: Story = {
  render: () => (
    <div className="w-96">
      <div className="flex max-w-sm flex-col gap-3">
        <CopyInputGroup />

        <InputGroup>
          <InputGroupInput type="password" placeholder="Password" />
          <InputGroupAddon align="inline-end">
            <Eye />
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <Mic />
          </InputGroupAddon>
          <InputGroupInput placeholder="Both sides" />
          <InputGroupAddon align="inline-end">
            <Radio className="animate-pulse text-red-500" />
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
          <InputGroupAddon align="inline-end">
            <Globe />
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupTextarea placeholder="메모" />
        </InputGroup>
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <InputGroup className="w-56">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search" disabled />
    </InputGroup>
  ),
}
