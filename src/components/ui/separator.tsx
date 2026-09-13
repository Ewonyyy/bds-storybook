"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        // Divider 역할이라 border.default(→bg-border)가 아니라 Accordion/Alert/
        // Card/Table/Toast/DropdownMenu/Combobox와 동일하게 border.subtle을 쓴다.
        "shrink-0 bg-[var(--border-subtle)] data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
