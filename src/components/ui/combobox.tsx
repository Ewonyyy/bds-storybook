"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, ChevronDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

// Popup anchor: Base UI Combobox는 resolvedAnchor를
// `anchor ?? (inputInsidePopup ? triggerElement : inputGroupElement ?? inputElement)`
// 순서로 정하는데(ComboboxPositioner), 우리 InputGroup은 지금까지 여기 쓰는
// `ComboboxPrimitive.InputGroup`이 아니라 순수 스타일용 `@/components/ui/input-group`의
// div였다. 그래서 inputGroupElement가 store에 등록되지 않아 anchor가 항상
// 내부 <input>으로 폴백됐고, Chips 케이스처럼 <input>이 컨테이너 padding만큼
// 안쪽에서 시작하는 구조에서는 Popup이 컨테이너 왼쪽과 안 맞았다.
// Base UI 공식 문서(combobox.md)가 쓰는 구조 그대로 `ComboboxPrimitive.InputGroup`를
// 실제 박스(render prop으로 우리 스타일 컴포넌트를 합성)로 쓰고, `render` 없이
// 스타일만 있는 경우엔 `ComboboxPrimitive.Chips`처럼 자식으로 얹는다.

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(className)}
      {...props}
    >
      {children}
      <ChevronDown className="pointer-events-none text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <X className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  size = "md",
  ...props
}: Omit<ComboboxPrimitive.Input.Props, "size"> & {
  showTrigger?: boolean
  showClear?: boolean
  size?: "sm" | "md" | "lg"
}) {
  return (
    <ComboboxPrimitive.InputGroup
      render={<InputGroup size={size} className={cn("w-auto", className)} />}
    >
      <ComboboxPrimitive.Input
        render={<InputGroupInput size={size} disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </ComboboxPrimitive.InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-[10px] border border-[var(--border-subtle)] bg-popover text-popover-foreground shadow-[var(--shadow-200)] duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className
      )}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-[8px] py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:text-[var(--content-disabled)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <Check className="pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-[var(--border-subtle)]", className)}
      {...props}
    />
  )
}

// Recipe 출처: Input과 동일한 size.40/48/56, padding-x는 Input과 동일한
// space.10/12/14, font.size.14/16/18(r) — ComboboxInput(InputGroup)과
// 동일한 값을 그대로 재사용한다(input.md 참고). 단일 행 높이가 아니라
// "최소" 높이인 이유는 Chips가 여러 줄로 줄바꿈될 수 있어서다 — 원본도
// h-8이 아니라 min-h-8을 썼다.
//
// padding-y는 Input과 다른 값을 쓴다(10/12/14가 아니라 8/10/12) —
// min-height는 border+padding+content 합이 목표(40/48/56)를 넘는 순간
// 그대로 그 합만큼 늘어나 버린다(Input의 고정 height와 달리 "content가
// 넘쳐도 박스는 그대로"가 성립하지 않음). 계산상의 이상적인 padding-y는
// 8.5/11/13px이었지만 Foundation Spacing 토큰(space.2/4/6/8/10/12/14...)에
// 없는 값이라, `input.md`의 "가장 가까운 Foundation token으로 스냅" 원칙을
// 따라 한 단계 아래 토큰인 space.8/space.10/space.12로 스냅했다. 실측
// 확인(`getBoundingClientRect()`, 빈 상태·Chip 채운 상태 모두): 스냅한
// 값 그대로 sm/md/lg 전부 정확히 40px/48px/56px — 오차 없이 정확히
// 일치한다(반대쪽 토큰인 space.10/space.12/space.14는 40/48/56을 넘겨
// 42~43/50/58px로 커졌다).
const comboboxChipsVariants = cva(
  "rounded-[var(--input-radius)] border border-input bg-transparent bg-clip-padding transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/20 has-aria-invalid:border-[var(--border-error)] has-aria-invalid:ring-3 has-aria-invalid:ring-[var(--border-error)]/20 dark:bg-input/30 dark:has-aria-invalid:border-[var(--border-error)]/50 dark:has-aria-invalid:ring-[var(--border-error)]/40",
  {
    variants: {
      size: {
        sm: "min-h-10 px-[10px] py-[8px] text-sm",
        md: "min-h-12 px-[12px] py-[10px] text-base",
        lg: "min-h-14 px-[14px] py-[12px] text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function ComboboxChips({
  className,
  size = "md",
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props &
  VariantProps<typeof comboboxChipsVariants>) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-chips"
      className={cn(comboboxChipsVariants({ size }), className)}
    >
      <ComboboxPrimitive.Chips
        className="flex w-full flex-wrap items-center gap-1"
        {...props}
      />
    </ComboboxPrimitive.InputGroup>
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-[6px] bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:text-[var(--content-disabled)] has-data-[slot=combobox-chip-remove]:pr-0",
        className
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-sm" />}
          className="size-4 -ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <X className="pointer-events-none size-3" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
