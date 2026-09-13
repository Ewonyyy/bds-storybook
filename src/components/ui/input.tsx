import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Recipe 출처: input.md — Foundation size.40/48/56, font.size.14/16/18(r),
// space.10/12/14(padding-x, padding-y 둘 다). padding-x는 Button 스케일
// (space.16/20)을 가져오지 않고 shadcn 원본 앵커(px-2.5=10px)를 기준으로
// 사이즈별로 완만하게 스케일했다 — padding-y와 동일한 계단(10/12/14).
// padding-y는 height - line-height로 실측 계산한 값이며, lg는 정확히
// 안 떨어져 가장 가까운 Foundation 값(space.14)으로 고정 — Preview로 확정.
const inputVariants = cva(
  "flex w-full min-w-0 rounded-[var(--input-radius)] border border-input bg-transparent text-foreground transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[var(--content-placeholder)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[var(--border-disabled)] disabled:bg-[var(--surface-disabled)] disabled:text-[var(--content-disabled)] disabled:placeholder:text-[var(--content-disabled)] aria-invalid:border-[var(--border-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--border-error)]/20 dark:aria-invalid:border-[var(--border-error)]/50 dark:aria-invalid:ring-[var(--border-error)]/40",
  {
    variants: {
      size: {
        sm: "h-10 px-[10px] py-[10px] text-sm",
        md: "h-12 px-[12px] py-[12px] text-base",
        lg: "h-14 px-[14px] py-[14px] text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({ className, type, size = "md", ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
