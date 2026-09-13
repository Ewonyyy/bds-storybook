"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Recipe 출처: input-group.md — height는 Input과 동일한 size.40/48/56을
// 그대로 참조한다(InputGroup은 Input이 border 없이 얹히는 바깥 박스).
// size prop은 InputGroup 자신에게만 적용되고 안의 InputGroupInput/
// InputGroupTextarea에는 자동으로 전달되지 않는다 — 알려진 gap
// (input-group.md 참고), 필요하면 양쪽에 같은 size를 직접 지정한다.
//
// addon과 맞닿은 쪽 Input의 padding(`pl-*`/`pr-*`)은 더 이상 줄이지
// 않는다 — Input 자신의 Recipe padding(10/12/14)을 addon 유무와 무관
// 하게 그대로 쓴다. 예전엔 addon 쪽만 더 좁게(space.4/6/8) 깎아서
// "아이콘 옆은 좁고 반대쪽은 넓어 보인다"는 문제가 있었다 — icon-to-text
// 간격이 반대쪽(addon 없는 쪽)의 10/12/14 여백과 시각적으로 동등하게
// 느껴지도록, 깎지 않고 그대로 두기로 했다(input-group.md 참고, "간격
// 6을 추가해서 14를 맞춘다"는 지적 반영).
const inputGroupVariants = cva(
  "group/input-group relative flex w-full min-w-0 items-center rounded-[var(--input-radius)] border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-[var(--surface-disabled)] has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/20 has-[[data-slot][aria-invalid=true]]:border-[var(--border-error)] has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-[var(--border-error)]/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:has-[[data-slot][aria-invalid=true]]:ring-[var(--border-error)]/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3",
  {
    variants: {
      size: {
        sm: "h-10 has-[>textarea]:h-auto",
        md: "h-12 has-[>textarea]:h-auto",
        lg: "h-14 has-[>textarea]:h-auto",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

function InputGroup({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupVariants>) {
  return (
    <div
      data-slot="input-group"
      data-group-size={size}
      role="group"
      className={cn(inputGroupVariants({ size }), className)}
      {...props}
    />
  )
}

// Addon/Button 안의 아이콘(svg) 크기는 Group size를 따라 완만하게
// 커진다 — size.16(sm)/18(md)/20(lg). shadcn 공식 예제는 이 크기를
// 아예 고정(16px)해서 쓰지만, 실제로 렌더링해보면 lg Input(56px, 폰트
// 18px) 옆에서 16px 아이콘이 상대적으로 작아 보인다는 판단 하에
// **BDS는 의도적으로 공식과 다르게** 완만한 스케일을 택했다. 이전에
// Button 아이콘 스케일(16/20/20, +4 후 정체)을 그대로 빌려왔을 땐 md
// 단계에서 과하게 커 보여 원복했었는데, 이번엔 그보다 훨씬 작은 폭
// (+2, 16/18/20)으로 재도입한 것이다 — Foundation size.16/18/20 세
// 단계를 그대로 씀, 임의 보간 아님(input-group.md 참고).
const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-has-disabled/input-group:text-[var(--content-disabled)] in-data-[group-size=sm]:[&>svg:not([class*='size-'])]:size-4 in-data-[group-size=md]:[&>svg:not([class*='size-'])]:size-4.5 in-data-[group-size=lg]:[&>svg:not([class*='size-'])]:size-5",
  {
    variants: {
      align: {
        // addon 자신의 border 쪽 padding(pl/pr)은 "버튼이 없을 때만"
        // Input의 Recipe padding(10/12/14)과 맞춘다 — 아이콘/텍스트는
        // Input 콘텐츠와 정렬돼야 하는 타이포그래피 축이라 그렇다.
        // 버튼이 들어있을 땐 원본처럼 고정 8px(pl-2/pr-2)을 유지한다 —
        // 버튼은 그 자체로 hit-target/컨트롤 chrome이라 텍스트 정렬
        // 기준을 따를 필요가 없고, 원본도 항상 고정 간격이었다(공식
        // input-group-button.tsx 예제와 비교해서 확인, input-group.md
        // 참고).
        "inline-start":
          "order-first has-[>button]:pl-2 not-has-[>button]:in-data-[group-size=sm]:pl-2.5 not-has-[>button]:in-data-[group-size=md]:pl-3 not-has-[>button]:in-data-[group-size=lg]:pl-3.5 has-[>button:not([data-size^='icon'])]:ml-[-0.3rem]",
        "inline-end":
          "order-last has-[>button]:pr-2 not-has-[>button]:in-data-[group-size=sm]:pr-2.5 not-has-[>button]:in-data-[group-size=md]:pr-3 not-has-[>button]:in-data-[group-size=lg]:pr-3.5 has-[>button:not([data-size^='icon'])]:mr-[-0.3rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

// InputGroupButton의 footprint(hit-target 크기)는 Group size와 무관하게
// 고정이다(input-group.md 참고, Foundation에 24~32 사이 중간값이 없어서).
// 안의 아이콘(svg)은 Addon과 동일하게 Group size를 따라 16/18/20으로
// 반응한다(icon-xs/icon-sm 둘 다) — `xs`(텍스트+아이콘, 항상 14px 고정)
// 만 예외, 이 tier는 Addon 아이콘 스케일과 별개로 원래도 고정값이었다.
//
// 아이콘 크기는 반드시 명시로 지정해야 한다 — `[&>svg:not([class*='size-'])]`
// 셀렉터가 안 걸리면 안의 Button 자신의 기본(md, size-5=20px)이 그대로
// 새어 나온다. 원본 shadcn은 Button 자체 기본이 원래 작아서(16px) 이
// 문제가 없었지만, BDS Button은 기본이 더 커서 icon-xs/icon-sm/sm이
// 전부 의도보다 큰 아이콘으로 렌더링되고 있었다 — 실제 버그로 확인되어
// 전부 명시 처리했다(input-group.md 참고).
const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[var(--input-radius)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 gap-1.5 rounded-[var(--input-radius)] px-2 in-data-[group-size=sm]:[&>svg:not([class*='size-'])]:size-4 in-data-[group-size=md]:[&>svg:not([class*='size-'])]:size-4.5 in-data-[group-size=lg]:[&>svg:not([class*='size-'])]:size-5",
        "icon-xs":
          "size-6 rounded-[var(--input-radius)] p-0 has-[>svg]:p-0 in-data-[group-size=sm]:[&>svg:not([class*='size-'])]:size-4 in-data-[group-size=md]:[&>svg:not([class*='size-'])]:size-4.5 in-data-[group-size=lg]:[&>svg:not([class*='size-'])]:size-5",
        "icon-sm":
          "size-8 rounded-[var(--input-radius)] p-0 has-[>svg]:p-0 in-data-[group-size=sm]:[&>svg:not([class*='size-'])]:size-4 in-data-[group-size=md]:[&>svg:not([class*='size-'])]:size-4.5 in-data-[group-size=lg]:[&>svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

// InputGroupText는 아이콘과 달리 텍스트(타이포그래피) 콘텐츠라 Input
// 자신의 폰트 계단을 그대로 따라간다(14/16/18, sm/md/lg) — 아이콘을
// 완만하게만 스케일한 것과 다른 판단. "$ 0.00 USD"처럼 addon 텍스트와
// Input 텍스트가 한 줄처럼 읽혀야 하는 경우, 서로 다른 크기면 어색하다.
function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-muted-foreground in-data-[group-size=sm]:text-sm in-data-[group-size=md]:text-base in-data-[group-size=lg]:text-lg [&_svg]:pointer-events-none in-data-[group-size=sm]:[&_svg:not([class*='size-'])]:size-4 in-data-[group-size=md]:[&_svg:not([class*='size-'])]:size-4.5 in-data-[group-size=lg]:[&_svg:not([class*='size-'])]:size-5",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
