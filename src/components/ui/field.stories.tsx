import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Search } from "lucide-react"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "./field"
import { Input } from "./input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"
import { Textarea } from "./textarea"
import { Checkbox } from "./checkbox"

/**
 * docs/field.md 기준 — "이 컴포넌트는 대부분 레이아웃/타이포그래피다": 자체
 * variant/size 축은 없고, orientation(vertical/horizontal/responsive)과
 * disabled/invalid 상태 전파가 핵심이다.
 */
const meta = {
  title: "Form Controls/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" placeholder="you@example.com" />
      <FieldDescription>가입 확인 메일을 받을 주소입니다.</FieldDescription>
    </Field>
  ),
}

/** Field가 비활성화된 상태의 모습을 보여줍니다. */
export const Disabled: Story = {
  render: () => (
    <Field className="w-72" data-disabled>
      <FieldLabel htmlFor="email-disabled">Email</FieldLabel>
      <Input id="email-disabled" placeholder="you@example.com" disabled />
      <FieldDescription>이 필드는 비활성화되어 있습니다.</FieldDescription>
    </Field>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field className="w-72" data-invalid>
      <FieldLabel htmlFor="email-invalid">Email</FieldLabel>
      <Input id="email-invalid" placeholder="you@example.com" aria-invalid />
      <FieldError>올바른 이메일 주소를 입력해주세요.</FieldError>
    </Field>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal">
      <Checkbox id="terms" />
      <FieldLabel htmlFor="terms">이용약관에 동의합니다</FieldLabel>
    </Field>
  ),
}

/** FieldLabel로 Field를 감싸 카드 형태로 구성하는 패턴을 보여줍니다. */
export const CardStyle: Story = {
  render: () => (
    <FieldLabel htmlFor="toggle" className="w-72">
      <Field orientation="horizontal">
        <Checkbox id="toggle" defaultChecked />
        <FieldContent>
          <FieldTitle>알림 받기</FieldTitle>
          <FieldDescription>언제든지 알림을 켜고 끌 수 있습니다.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldLabel>
  ),
}

/** Field와 조합할 수 있는 Input, Textarea, InputGroup의 sm/md/lg 사이즈를 한눈에 비교합니다. */
export const ControlSizeMatrix: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="w-full">
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
    </div>
  ),
}

/** FieldGroup으로 여러 Field를 구성하고, Invalid / Disabled 상태를 비교합니다. */
export const FieldGroupStates: Story = {
  render: () => (
    <div className="w-96">
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
    </div>
  ),
}
