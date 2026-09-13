"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        // peer-disabled: 는 native `disabled` 속성 기준이라 Checkbox/Radio(base-ui)처럼
        // 겉 요소엔 data-disabled만 붙는 컨트롤엔 안 먹는다. peer-data-disabled를 같이 둬서
        // 두 경우(native disabled / data-disabled) 모두 라벨이 흐려지게 한다.
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:text-[var(--content-disabled)] peer-disabled:cursor-not-allowed peer-disabled:text-[var(--content-disabled)] peer-data-disabled:cursor-not-allowed peer-data-disabled:text-[var(--content-disabled)]",
        className
      )}
      {...props}
    />
  )
}

export { Label }
