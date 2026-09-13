import { ArrowUpRight, BadgeCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const

export default function BadgePage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm text-muted-foreground">
        Variant (default / secondary / destructive / outline / ghost / link)
      </h2>
      <div className="flex flex-wrap items-center gap-2">
        {VARIANTS.map((variant) => (
          <Badge key={variant} variant={variant} className="capitalize">
            {variant}
          </Badge>
        ))}
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">Icon + Label</h3>
      <div className="flex flex-wrap items-center gap-2">
        {VARIANTS.map((variant) => (
          <Badge key={variant} variant={variant} className="capitalize">
            <BadgeCheck data-icon="inline-start" />
            {variant}
          </Badge>
        ))}
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Interactive (render로 &lt;a&gt; 렌더링, hover 확인)
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        {(["default", "secondary", "destructive", "ghost"] as const).map(
          (variant) => (
            <Badge
              key={variant}
              variant={variant}
              render={
                <a href="#">
                  <span className="capitalize">{variant}</span>
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              }
            />
          )
        )}
      </div>
    </section>
  )
}
