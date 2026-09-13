import { Input } from "@/components/ui/input"

export default function InputPage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm text-muted-foreground">
        State × Size 매트릭스
      </h2>
      <div className="grid grid-cols-[80px_repeat(3,minmax(0,1fr))] items-center gap-3">
        <span />
        <span className="text-xs text-muted-foreground">sm</span>
        <span className="text-xs text-muted-foreground">md</span>
        <span className="text-xs text-muted-foreground">lg</span>

        <span className="text-xs text-muted-foreground">Default</span>
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />

        <span className="text-xs text-muted-foreground">Disabled</span>
        <Input size="sm" placeholder="Small" disabled />
        <Input size="md" placeholder="Medium" disabled />
        <Input size="lg" placeholder="Large" disabled />

        <span className="text-xs text-muted-foreground">Invalid</span>
        <Input size="sm" placeholder="Small" aria-invalid />
        <Input size="md" placeholder="Medium" aria-invalid />
        <Input size="lg" placeholder="Large" aria-invalid />
      </div>
    </section>
  )
}
