import * as React from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Download, GitBranch, Plus, Search } from "lucide-react"

export default function ButtonPage() {
  return (
    <>
      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          Variant × Size 매트릭스
        </h2>
        <div className="grid grid-cols-[80px_repeat(3,auto)] items-center gap-3">
          <span />
          <span className="text-xs text-muted-foreground">sm</span>
          <span className="text-xs text-muted-foreground">md</span>
          <span className="text-xs text-muted-foreground">lg</span>

          {(
            ["default", "secondary", "outline", "ghost", "destructive", "link"] as const
          ).map((variant) => (
            <React.Fragment key={variant}>
              <span className="text-xs text-muted-foreground capitalize">
                {variant}
              </span>
              <Button variant={variant} size="sm">
                Button
              </Button>
              <Button variant={variant} size="md">
                Button
              </Button>
              <Button variant={variant} size="lg">
                Button
              </Button>
            </React.Fragment>
          ))}
        </div>

        <h3 className="mt-2 text-xs text-muted-foreground">
          Disabled (Variant × md)
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default" size="md" disabled>
            Default
          </Button>
          <Button variant="secondary" size="md" disabled>
            Secondary
          </Button>
          <Button variant="outline" size="md" disabled>
            Outline
          </Button>
          <Button variant="ghost" size="md" disabled>
            Ghost
          </Button>
          <Button variant="destructive" size="md" disabled>
            Destructive
          </Button>
          <Button variant="link" size="md" disabled>
            Link
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Icon (아이콘 전용)</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-sm" aria-label="검색">
            <Search />
          </Button>
          <Button size="icon-md" aria-label="검색">
            <Search />
          </Button>
          <Button size="icon-lg" aria-label="검색">
            <Search />
          </Button>
          <Button size="icon-sm" variant="outline" aria-label="검색">
            <Search />
          </Button>
          <Button size="icon-md" variant="outline" aria-label="검색">
            <Search />
          </Button>
          <Button size="icon-lg" variant="outline" aria-label="검색">
            <Search />
          </Button>
          <Button size="icon-md" variant="ghost" aria-label="검색">
            <Search />
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">With Icon (아이콘 + 텍스트)</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            <Download data-icon="inline-start" />
            Download
          </Button>
          <Button variant="outline">
            Next
            <GitBranch data-icon="inline-end" />
          </Button>
          <Button variant="secondary">
            <Plus data-icon="inline-start" />
            New
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">
            <Download data-icon="inline-start" />
            Download
          </Button>
          <Button size="md">
            <Download data-icon="inline-start" />
            Download
          </Button>
          <Button size="lg">
            <Download data-icon="inline-start" />
            Download
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Loading (Spinner)</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>
            <Spinner data-icon="inline-start" />
            Loading
          </Button>
          <Button variant="outline" disabled>
            <Spinner data-icon="inline-start" />
            Loading
          </Button>
          <Button size="icon-md" disabled aria-label="로딩 중">
            <Spinner />
          </Button>
        </div>
      </section>
    </>
  )
}
