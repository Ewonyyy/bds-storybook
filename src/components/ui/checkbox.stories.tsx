import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"

import { Checkbox } from "./checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "./field"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { VariantGrid } from "@/components/dev-preview/storybook-docs"

/**
 * docs/checkbox.md 기준. Variant/Size 축은 없다(shadcn 원본과 동일하게 단일
 * 스타일) — States(checked/indeterminate/invalid/disabled)만 존재한다.
 */
const meta = {
  title: "Form Controls/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox는 켜고/끄는 이진 선택 컨트롤입니다. `indeterminate`(일부 선택) 상태도 지원합니다 (docs/checkbox.md 기준).",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

/** checked와 무관하게 독립적으로 켤 수 있는 Indeterminate 상태를 보여줍니다. */
export const Indeterminate: Story = {
  args: { indeterminate: true },
}

export const Invalid: Story = {
  render: () => (
    <Field orientation="horizontal" data-invalid>
      <Checkbox id="terms-3" aria-invalid />
      <FieldLabel htmlFor="terms-3">이용약관에 동의합니다</FieldLabel>
    </Field>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field orientation="horizontal" className="w-fit">
      <Checkbox disabled />
    </Field>
  ),
}

export const States: Story = {
  render: () => (
    <VariantGrid
      items={[
        { label: "Unchecked", children: <Checkbox /> },
        { label: "Checked", children: <Checkbox defaultChecked /> },
        { label: "Indeterminate", children: <Checkbox indeterminate /> },
        { label: "Invalid", children: <Checkbox aria-invalid /> },
        {
          label: "Disabled",
          children: (
            <Field orientation="horizontal" className="w-fit">
              <Checkbox disabled />
            </Field>
          ),
        },
        {
          label: "Checked + Disabled",
          children: (
            <Field orientation="horizontal" className="w-fit">
              <Checkbox defaultChecked disabled />
            </Field>
          ),
        },
      ]}
    />
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Field orientation="horizontal" className="max-w-md">
      <Checkbox id="terms-2" defaultChecked />
      <FieldContent>
        <FieldLabel htmlFor="terms-2">이용약관에 동의합니다</FieldLabel>
        <FieldDescription>
          이 체크박스를 클릭하면 이용약관에 동의하는 것으로 간주됩니다.
        </FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const WithTitle: Story = {
  render: () => (
    // Storybook의 layout: "centered" 데코레이터는 확정된 폭을 주지 않아
    // FieldGroup/FieldLabel/Field/FieldContent의 w-full/flex-1 체인이
    // min-content로 collapse된다(한글이 글자 단위로 줄바꿈됨). dev 페이지는
    // 확정 폭의 일반 block 레이아웃 안에 있어 문제가 없다 — 여기서는 동일한
    // 폭(max-w-md=28rem)을 가진 wrapper로 감싸 폭을 확정해준다.
    <div className="w-[28rem]">
      <FieldGroup className="max-w-md">
        <FieldLabel htmlFor="toggle-2">
          <Field orientation="horizontal">
            <Checkbox id="toggle-2" defaultChecked />
            <FieldContent>
              <FieldTitle>알림 받기</FieldTitle>
              <FieldDescription>
                언제든지 알림을 켜고 끌 수 있습니다.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="toggle-4">
          <Field orientation="horizontal" data-disabled>
            <Checkbox id="toggle-4" disabled />
            <FieldContent>
              <FieldTitle>알림 받기</FieldTitle>
              <FieldDescription>
                언제든지 알림을 켜고 끌 수 있습니다.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>
      </FieldGroup>
    </div>
  ),
}

const tableData = [
  { id: "1", name: "김서연", email: "seoyeon.kim@example.com", role: "Admin" },
  { id: "2", name: "박민준", email: "minjun.park@example.com", role: "User" },
  { id: "3", name: "이지우", email: "jiwoo.lee@example.com", role: "User" },
  { id: "4", name: "최도윤", email: "doyoon.choi@example.com", role: "Editor" },
]

function InTableDemo() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set(["1"]))
  const selectAll = selectedRows.size === tableData.length

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? new Set(tableData.map((row) => row.id)) : new Set())
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const next = new Set(selectedRows)
    if (checked) {
      next.add(id)
    } else {
      next.delete(id)
    }
    setSelectedRows(next)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row) => (
          <TableRow
            key={row.id}
            data-state={selectedRows.has(row.id) ? "selected" : undefined}
          >
            <TableCell>
              <Checkbox
                id={`row-${row.id}`}
                checked={selectedRows.has(row.id)}
                onCheckedChange={(checked) => handleSelectRow(row.id, checked === true)}
              />
            </TableCell>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const InTable: Story = {
  render: () => <InTableDemo />,
}

export const Group: Story = {
  render: () => (
    <Field className="max-w-md">
      <FieldLabel>바탕화면에 표시할 항목:</FieldLabel>
      <Field orientation="horizontal">
        <Checkbox id="desktop-hard-disks" />
        <FieldLabel htmlFor="desktop-hard-disks" className="font-normal">
          하드 디스크
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="desktop-external-disks" />
        <FieldLabel htmlFor="desktop-external-disks" className="font-normal">
          외장 디스크
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="desktop-cds-dvds" />
        <FieldLabel htmlFor="desktop-cds-dvds" className="font-normal">
          CD, DVD
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="desktop-servers" />
        <FieldLabel htmlFor="desktop-servers" className="font-normal">
          연결된 서버
        </FieldLabel>
      </Field>
    </Field>
  ),
}

/** 약관 동의 항목에 (필수)/(선택) 표시를 붙인 Checkbox 조합을 보여줍니다. */
export const TermsAgreement: Story = {
  render: () => (
    <Field className="max-w-md">
      <Field orientation="horizontal">
        <Checkbox id="terms-required" />
        <FieldLabel htmlFor="terms-required" className="font-normal">
          <span>
            이용약관 동의<span className="ml-1 text-[var(--content-brand)]">(필수)</span>
          </span>
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="privacy-required" />
        <FieldLabel htmlFor="privacy-required" className="font-normal">
          <span>
            개인정보 수집 및 이용 동의<span className="ml-1 text-[var(--content-brand)]">(필수)</span>
          </span>
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="marketing-optional" />
        <FieldLabel htmlFor="marketing-optional" className="font-normal">
          마케팅 정보 수신 동의 (선택)
        </FieldLabel>
      </Field>
    </Field>
  ),
}
