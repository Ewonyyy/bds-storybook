import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Recipe 출처: textarea.md — min-height는 size.64 고정(사이즈와 무관,
// 콘텐츠에 따라 자동으로 늘어나므로). font/padding-x/padding-y만
// Input과 동일한 계단(font.size.14/16/18-r, space.10/12/14)으로
// sm/md/lg에 반응한다 — Input과 나란히 쓰일 때 폰트 px가 안 맞으면
// 실제로 어색하다는 이유로 사이즈 variant를 도입했다(과거엔 "단일
// Recipe"였으나 되돌림, textarea.md 참고).
const textareaVariants = cva(
  "flex field-sizing-content min-h-16 w-full rounded-[var(--input-radius)] border border-input bg-transparent transition-colors outline-none placeholder:text-[var(--content-placeholder)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:border-[var(--border-disabled)] disabled:bg-[var(--surface-disabled)] disabled:text-[var(--content-disabled)] disabled:placeholder:text-[var(--content-disabled)] aria-invalid:border-[var(--border-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--border-error)]/20 dark:aria-invalid:border-[var(--border-error)]/50 dark:aria-invalid:ring-[var(--border-error)]/40",
  {
    variants: {
      size: {
        sm: "px-[10px] py-[10px] text-sm",
        md: "px-[12px] py-[12px] text-base",
        lg: "px-[14px] py-[14px] text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function Textarea({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ size }), className)}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
