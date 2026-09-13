import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonPage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm text-muted-foreground">
        Default (rounded-md = radius.8, bg-accent = surface.subtle)
      </h2>
      <Skeleton className="h-4 w-[250px]" />

      <h3 className="mt-2 text-xs text-muted-foreground">
        Base Demo (shadcn 공식 예제 — Avatar + Text)
      </h3>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Card (shadcn 공식 예제)
      </h3>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </section>
  )
}
