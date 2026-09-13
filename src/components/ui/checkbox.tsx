"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative shrink-0 outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50",
        // focus ring: shadcn 원본은 50% — Button/Input에서 이미 20%로 확정한 기준(design.md
        // 참고)에 맞춰 여기도 20%로 맞춘다. 나머지 색상은 border-input(→border.default)/
        // bg-primary·border-primary(→interactive.primary.default)/text-primary-foreground
        // (→content.inverse) 전부 기존 어댑터를 그대로 통과한다.
        "border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary aria-invalid:aria-checked:border-primary aria-invalid:border-[var(--border-error)] dark:aria-invalid:border-[var(--border-error)]/50 focus-visible:border-ring focus-visible:ring-ring/20 aria-invalid:ring-[var(--border-error)]/20 dark:aria-invalid:ring-[var(--border-error)]/40 flex size-4 items-center justify-center rounded-[4px] border transition-colors group-has-disabled/field:opacity-50 focus-visible:ring-3 aria-invalid:ring-3 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input group-has-[:focus-visible]/field-label:data-checked:border-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
