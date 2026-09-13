import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--button-radius)] bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-[var(--content-disabled)] aria-invalid:border-[var(--border-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--border-error)]/20 dark:aria-invalid:border-[var(--border-error)]/50 dark:aria-invalid:ring-[var(--border-error)]/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-[var(--interactive-primary-hover)] active:bg-[var(--interactive-primary-pressed)] disabled:bg-[var(--surface-disabled)]",
        outline:
          "border border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 disabled:border-[var(--border-disabled)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[var(--interactive-secondary-hover)] active:bg-[var(--interactive-secondary-pressed)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground disabled:bg-[var(--surface-disabled)]",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-[var(--interactive-danger-subtle)] text-[var(--interactive-danger-default)] hover:bg-[var(--interactive-danger-subtle-hover)] active:bg-[var(--interactive-danger-subtle-hover)] focus-visible:border-destructive/40 focus-visible:ring-destructive/20 disabled:bg-[var(--surface-disabled)]",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      // Recipe 출처: button.md — Foundation size.40/48/56, font.size.14/16/18,
      // space.16/20, size.16/20, space.6/8. lg의 padding/icon/gap은 md와 동일값
      // 유지(plateau) — shadcn 원본도 동일 패턴이라 근거 있음, Preview로 확정.
      size: {
        sm: "h-10 gap-1.5 px-4 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
        md: "h-12 gap-2 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-5",
        lg: "h-14 gap-2 px-5 text-lg has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-10 [&_svg:not([class*='size-'])]:size-4",
        "icon-md": "size-12 [&_svg:not([class*='size-'])]:size-5",
        "icon-lg": "size-14 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
