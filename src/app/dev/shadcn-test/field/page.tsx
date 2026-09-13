import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Search } from "lucide-react"

export default function FieldPage() {
  return (
    <>
      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          Control 종류 × Size 매트릭스
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="field-input-sm">Input (sm)</FieldLabel>
            <Input id="field-input-sm" size="sm" placeholder="Small" />
            <FieldDescription>설명 텍스트</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-input-md">Input (md)</FieldLabel>
            <Input id="field-input-md" size="md" placeholder="Medium" />
            <FieldDescription>설명 텍스트</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-input-lg">Input (lg)</FieldLabel>
            <Input id="field-input-lg" size="lg" placeholder="Large" />
            <FieldDescription>설명 텍스트</FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="field-textarea-sm">Textarea (sm)</FieldLabel>
            <FieldContent>
              <Textarea id="field-textarea-sm" size="sm" placeholder="Small" />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-textarea-md">Textarea (md)</FieldLabel>
            <FieldContent>
              <Textarea id="field-textarea-md" size="md" placeholder="Medium" />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-textarea-lg">Textarea (lg)</FieldLabel>
            <FieldContent>
              <Textarea id="field-textarea-lg" size="lg" placeholder="Large" />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="field-group-sm">Input Group (sm)</FieldLabel>
            <InputGroup size="sm">
              <InputGroupInput id="field-group-sm" size="sm" placeholder="Search" />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-group-md">Input Group (md)</FieldLabel>
            <InputGroup size="md">
              <InputGroupInput id="field-group-md" size="md" placeholder="Search" />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="field-group-lg">Input Group (lg)</FieldLabel>
            <InputGroup size="lg">
              <InputGroupInput id="field-group-lg" size="lg" placeholder="Search" />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>

        <h3 className="mt-2 text-xs text-muted-foreground">
          State (Invalid / Disabled)
        </h3>
        <FieldGroup className="max-w-sm">
          <Field data-invalid="true">
            <FieldLabel htmlFor="username">아이디</FieldLabel>
            <Input id="username" aria-invalid defaultValue="a" />
            <FieldError>아이디는 3자 이상이어야 합니다.</FieldError>
          </Field>

          <Field data-disabled="true">
            <FieldLabel htmlFor="field-disabled">비활성</FieldLabel>
            <Input id="field-disabled" placeholder="Disabled" disabled />
            <FieldDescription>이 필드는 비활성화되어 있습니다.</FieldDescription>
          </Field>
        </FieldGroup>
      </section>
    </>
  )
}
