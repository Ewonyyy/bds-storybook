import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TooltipPage() {
  return (
    <TooltipProvider>
      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Side (top/right/bottom/left)</h2>
        <div className="flex flex-wrap items-center gap-6">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                {side}
              </TooltipTrigger>
              <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Align (start/center/end)</h2>
        <div className="flex flex-wrap items-center gap-6">
          {(["start", "center", "end"] as const).map((align) => (
            <Tooltip key={align}>
              <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                {align}
              </TooltipTrigger>
              <TooltipContent align={align}>Align {align}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          Long Text (max-w-xs 줄바꿈)
        </h2>
        <div className="flex flex-wrap items-center gap-6">
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>
              Long text
            </TooltipTrigger>
            <TooltipContent>
              max-w-xs를 넘어가는 긴 설명 텍스트는 자동으로 줄바꿈됩니다.
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">With kbd</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Tooltip>
            <TooltipTrigger
              render={<Button size="icon-sm" variant="outline" aria-label="Save" />}
            >
              <Save />
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex items-center gap-2">
                Save Changes <Kbd>S</Kbd>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </TooltipProvider>
  )
}
