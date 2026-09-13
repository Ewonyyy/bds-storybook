import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { RadioGroup, RadioGroupItem } from "./radio-group"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./field"

/**
 * docs/radio.md 기준. Checkbox와 동일하게 Variant/Size 축은 없다 — 항상
 * `RadioGroup`으로 묶어서 쓴다.
 */
const meta = {
  title: "Form Controls/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radio는 여러 옵션 중 하나만 고를 수 있는 단일 선택 컨트롤입니다. 항상 RadioGroup으로 묶어서 씁니다 (docs/radio.md 기준).",
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <Field orientation="horizontal">
        <RadioGroupItem value="default" id="r1" />
        <FieldLabel htmlFor="r1" className="font-normal">
          Default
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="comfortable" id="r2" />
        <FieldLabel htmlFor="r2" className="font-normal">
          Comfortable
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="compact" id="r3" />
        <FieldLabel htmlFor="r3" className="font-normal">
          Compact
        </FieldLabel>
      </Field>
    </RadioGroup>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable-desc" className="max-w-md">
      <Field orientation="horizontal">
        <RadioGroupItem value="default-desc" id="rd1" />
        <FieldContent>
          <FieldLabel htmlFor="rd1" className="font-normal">
            Default
          </FieldLabel>
          <FieldDescription>표준 간격을 적용합니다.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="comfortable-desc" id="rd2" />
        <FieldContent>
          <FieldLabel htmlFor="rd2" className="font-normal">
            Comfortable
          </FieldLabel>
          <FieldDescription>요소 사이 여백을 더 넓게 둡니다.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="compact-desc" id="rd3" />
        <FieldContent>
          <FieldLabel htmlFor="rd3" className="font-normal">
            Compact
          </FieldLabel>
          <FieldDescription>여백을 최소화한 밀집 레이아웃입니다.</FieldDescription>
        </FieldContent>
      </Field>
    </RadioGroup>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="plus" className="max-w-md">
      <FieldLabel htmlFor="plus-plan">
        <Field orientation="horizontal">
          <FieldContent>
            <div className="font-medium">Plus</div>
            <FieldDescription>
              개인 및 소규모 팀을 위한 플랜입니다.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="plus" id="plus-plan" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="pro-plan">
        <Field orientation="horizontal">
          <FieldContent>
            <div className="font-medium">Pro</div>
            <FieldDescription>
              성장하는 비즈니스를 위한 플랜입니다.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="pro" id="pro-plan" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="enterprise-plan">
        <Field orientation="horizontal">
          <FieldContent>
            <div className="font-medium">Enterprise</div>
            <FieldDescription>
              대규모 팀 및 기업을 위한 플랜입니다.
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="enterprise" id="enterprise-plan" />
        </Field>
      </FieldLabel>
    </RadioGroup>
  ),
}

export const WithFieldSet: Story = {
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend>배터리 소모 수준</FieldLegend>
      <FieldDescription>선호하는 배터리 소모 수준을 선택하세요.</FieldDescription>
      <RadioGroup defaultValue="medium">
        <Field orientation="horizontal">
          <RadioGroupItem value="high" id="battery-high" />
          <FieldLabel htmlFor="battery-high" className="font-normal">
            높음
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="medium" id="battery-medium" />
          <FieldLabel htmlFor="battery-medium" className="font-normal">
            보통
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="low" id="battery-low" />
          <FieldLabel htmlFor="battery-low" className="font-normal">
            낮음
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  ),
}

export const GridLayout: Story = {
  render: () => (
    <RadioGroup defaultValue="medium" className="grid max-w-md grid-cols-2 gap-2">
      <FieldLabel htmlFor="size-small">
        <Field orientation="horizontal">
          <RadioGroupItem value="small" id="size-small" />
          <div className="font-medium">Small</div>
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="size-medium">
        <Field orientation="horizontal">
          <RadioGroupItem value="medium" id="size-medium" />
          <div className="font-medium">Medium</div>
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="size-large">
        <Field orientation="horizontal">
          <RadioGroupItem value="large" id="size-large" />
          <div className="font-medium">Large</div>
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="size-xlarge">
        <Field orientation="horizontal">
          <RadioGroupItem value="xlarge" id="size-xlarge" />
          <div className="font-medium">X-Large</div>
        </Field>
      </FieldLabel>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option2">
      <Field orientation="horizontal" data-disabled>
        <RadioGroupItem value="option1" id="disabled-1" disabled />
        <FieldLabel htmlFor="disabled-1" className="font-normal">
          Disabled
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option2" id="disabled-2" />
        <FieldLabel htmlFor="disabled-2" className="font-normal">
          Option 2
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option3" id="disabled-3" />
        <FieldLabel htmlFor="disabled-3" className="font-normal">
          Option 3
        </FieldLabel>
      </Field>
    </RadioGroup>
  ),
}

export const Invalid: Story = {
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend>알림 수신 방법</FieldLegend>
      <FieldDescription>알림을 받을 방법을 선택하세요.</FieldDescription>
      <RadioGroup defaultValue="email">
        <Field orientation="horizontal" data-invalid>
          <RadioGroupItem value="email" id="invalid-email" aria-invalid />
          <FieldLabel htmlFor="invalid-email" className="font-normal">
            이메일만
          </FieldLabel>
        </Field>
        <Field orientation="horizontal" data-invalid>
          <RadioGroupItem value="sms" id="invalid-sms" aria-invalid />
          <FieldLabel htmlFor="invalid-sms" className="font-normal">
            SMS만
          </FieldLabel>
        </Field>
        <Field orientation="horizontal" data-invalid>
          <RadioGroupItem value="both" id="invalid-both" aria-invalid />
          <FieldLabel htmlFor="invalid-both" className="font-normal">
            이메일 + SMS
          </FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  ),
}
