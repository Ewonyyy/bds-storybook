"use client"

import * as React from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Check, Copy, Eye, Globe, Mic, Radio, Search, X } from "lucide-react"

function CopyInputGroup() {
  const [copied, setCopied] = React.useState(false)

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

export default function InputGroupPage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm text-muted-foreground">
        Addon 종류 × Size 매트릭스
      </h2>
      <div className="grid grid-cols-[80px_repeat(3,minmax(0,1fr))] items-center gap-3">
        <span />
        <span className="text-xs text-muted-foreground">sm</span>
        <span className="text-xs text-muted-foreground">md</span>
        <span className="text-xs text-muted-foreground">lg</span>

        <span className="text-xs text-muted-foreground">아이콘</span>
        <InputGroup size="sm">
          <InputGroupInput size="sm" placeholder="Search" />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup size="md">
          <InputGroupInput size="md" placeholder="Search" />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup size="lg">
          <InputGroupInput size="lg" placeholder="Search" />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <span className="text-xs text-muted-foreground">텍스트</span>
        <InputGroup size="sm">
          <InputGroupAddon>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput size="sm" placeholder="0.00" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup size="md">
          <InputGroupAddon>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput size="md" placeholder="0.00" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup size="lg">
          <InputGroupAddon>
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput size="lg" placeholder="0.00" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <span className="text-xs text-muted-foreground">버튼</span>
        <InputGroup size="sm">
          <InputGroupInput size="sm" placeholder="Search" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="지우기" size="icon-xs">
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup size="md">
          <InputGroupInput size="md" placeholder="Search" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="지우기" size="icon-xs">
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup size="lg">
          <InputGroupInput size="lg" placeholder="Search" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="지우기" size="icon-xs">
              <X />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Case 모음 (공식 예제 기반)
      </h3>
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

        <InputGroup>
          <InputGroupInput placeholder="Disabled" disabled />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </section>
  )
}
