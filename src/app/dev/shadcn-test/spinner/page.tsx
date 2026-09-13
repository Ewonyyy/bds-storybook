import { ArrowUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerPage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm text-muted-foreground">Default (size-4 = size.16)</h2>
      <Spinner />

      <h3 className="mt-2 text-xs text-muted-foreground">
        Size (className override — currentColor 상속 확인용 크기만 다름)
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        <Spinner className="size-4" />
        <Spinner className="size-5" />
        <Spinner className="size-6" />
        <Spinner className="size-8" />
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Color (currentColor 상속 — BDS Content Semantic Color를 가진 부모
        요소의 text color를 그대로 따라감)
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-[var(--content-primary)]">
          <Spinner />
        </span>
        <span className="text-[var(--content-secondary)]">
          <Spinner />
        </span>
        <span className="text-[var(--content-disabled)]">
          <Spinner />
        </span>
        <span className="text-[var(--content-brand)]">
          <Spinner />
        </span>
        <span className="text-[var(--content-error)]">
          <Spinner />
        </span>
        <div className="flex flex-col items-center gap-1">
          <span className="inline-flex rounded bg-[var(--interactive-primary-default)] p-2 text-[var(--content-inverse)]">
            <Spinner />
          </span>
          <span className="text-[10px] text-muted-foreground">
            content.inverse
          </span>
        </div>
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">
        In context (Button 내부 — content.inverse 상속)
      </h3>
      <div className="flex flex-wrap items-center gap-2">
        <Button disabled>
          <Spinner />
          Loading
        </Button>
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">Badge + Spinner</h3>
      <div className="flex flex-wrap items-center gap-4">
        <Badge>
          <Spinner data-icon="inline-start" />
          Syncing
        </Badge>
        <Badge variant="secondary">
          <Spinner data-icon="inline-start" />
          Updating
        </Badge>
        <Badge variant="outline">
          <Spinner data-icon="inline-start" />
          Processing
        </Badge>
      </div>

      <h3 className="mt-2 text-xs text-muted-foreground">Input Group + Spinner</h3>
      <div className="flex w-full max-w-md flex-col gap-4">
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." disabled />
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
        <InputGroup>
          <InputGroupTextarea placeholder="Send a message..." disabled />
          <InputGroupAddon align="block-end">
            <Spinner /> Validating...
            <InputGroupButton className="ml-auto" variant="default">
              <ArrowUpIcon />
              <span className="sr-only">Send</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </section>
  )
}
