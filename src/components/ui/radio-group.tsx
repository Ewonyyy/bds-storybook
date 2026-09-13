"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        // focus ring: shadcn 원본은 50% — Checkbox/Button/Input에서 이미 20%로
        // 확정한 기준(design.md 참고)에 맞춰 여기도 20%로 통일한다. 나머지 색상은
        // border-input(→border.default)/data-checked:bg-primary·border-primary
        // (→interactive.primary.default)/text-primary-foreground(→content.inverse)
        // 전부 기존 어댑터를 그대로 통과한다.
        //
        // 버그 수정: base-ui Radio Root는 <span role="radio">로 렌더링되는데,
        // shadcn 원본이 쓴 disabled:opacity-50/disabled:cursor-not-allowed는
        // 네이티브 CSS :disabled 의사클래스 기반이라 <span>에는 절대 안 먹는다
        // (실측 확인: opacity 1, cursor auto로 렌더링됨). base-ui가 실제로
        // 설정하는 건 aria-disabled="true"이므로 aria-disabled: variant로
        // 교체 — 클릭 차단(기능)은 이미 되고 있었고, 이건 순수 시각적 버그였다.
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-invalid:border-[var(--border-error)] aria-invalid:ring-3 aria-invalid:ring-[var(--border-error)]/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-[var(--border-error)]/50 dark:aria-invalid:ring-[var(--border-error)]/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-4 items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
