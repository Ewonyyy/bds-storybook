import { Textarea } from "@/components/ui/textarea"

export default function TextareaPage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm text-muted-foreground">
        State × Size 매트릭스
      </h2>
      <div className="grid grid-cols-[80px_repeat(3,minmax(0,1fr))] items-start gap-3">
        <span />
        <span className="text-xs text-muted-foreground">sm</span>
        <span className="text-xs text-muted-foreground">md</span>
        <span className="text-xs text-muted-foreground">lg</span>

        <span className="pt-2 text-xs text-muted-foreground">Default</span>
        <Textarea size="sm" placeholder="Small" />
        <Textarea size="md" placeholder="Medium" />
        <Textarea size="lg" placeholder="Large" />

        <span className="pt-2 text-xs text-muted-foreground">Disabled</span>
        <Textarea size="sm" placeholder="Small" disabled />
        <Textarea size="md" placeholder="Medium" disabled />
        <Textarea size="lg" placeholder="Large" disabled />

        <span className="pt-2 text-xs text-muted-foreground">Invalid</span>
        <Textarea size="sm" placeholder="Small" aria-invalid />
        <Textarea size="md" placeholder="Medium" aria-invalid />
        <Textarea size="lg" placeholder="Large" aria-invalid />
      </div>
    </section>
  )
}
