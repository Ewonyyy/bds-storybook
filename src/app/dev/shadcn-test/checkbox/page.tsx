"use client"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const tableData = [
  { id: "1", name: "김서연", email: "seoyeon.kim@example.com", role: "Admin" },
  { id: "2", name: "박민준", email: "minjun.park@example.com", role: "User" },
  { id: "3", name: "이지우", email: "jiwoo.lee@example.com", role: "User" },
  { id: "4", name: "최도윤", email: "doyoon.choi@example.com", role: "Editor" },
]

export default function CheckboxPage() {
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
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Basic</h2>
        <Field orientation="horizontal">
          <Checkbox id="terms" />
          <FieldLabel htmlFor="terms">이용약관에 동의합니다</FieldLabel>
        </Field>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs text-muted-foreground">With Description</h3>
        <Field orientation="horizontal" className="max-w-md">
          <Checkbox id="terms-2" defaultChecked />
          <FieldContent>
            <FieldLabel htmlFor="terms-2">이용약관에 동의합니다</FieldLabel>
            <FieldDescription>
              이 체크박스를 클릭하면 이용약관에 동의하는 것으로 간주됩니다.
            </FieldDescription>
          </FieldContent>
        </Field>
      </div>

      <div className="flex flex-col gap-3">
        {/* Field에 data-invalid를 주면 fieldVariants의 data-[invalid=true]:text-[var(--content-error)]가
            텍스트 색을 상속시켜서, 체크박스뿐 아니라 라벨 텍스트도 같이 error 색이 된다. */}
        <h3 className="text-xs text-muted-foreground">Invalid</h3>
        <Field orientation="horizontal" data-invalid>
          <Checkbox id="terms-3" aria-invalid />
          <FieldLabel htmlFor="terms-3">이용약관에 동의합니다</FieldLabel>
        </Field>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs text-muted-foreground">Disabled</h3>
        <Field orientation="horizontal">
          <Checkbox id="toggle" disabled />
          <FieldLabel htmlFor="toggle">알림 받기</FieldLabel>
        </Field>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs text-muted-foreground">With Title (카드형)</h3>
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

      <div className="flex flex-col gap-3">
        <h3 className="text-xs text-muted-foreground">In Table</h3>
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
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs text-muted-foreground">Group</h3>
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
      </div>

      <div className="flex flex-col gap-3">
        {/*
          shadcn 공식 예제엔 없는 조합 — 자체 추가. 라벨 앞에 (필수)/(선택)를
          순수 텍스트로 붙인 약관 동의 리스트. (필수)만 content.brand 색으로
          강조하고(비인터랙티브 순수 강조 텍스트라 interactive.primary가 아니라
          content.brand가 역할에 맞음) (선택)은 라벨과 동일한 색 그대로 둔다. FieldLabel이
          flex(gap-2)라서 (필수) span을 바로 자식으로 두면 뒤 텍스트와의
          사이가 gap만큼 벌어진다 — 그래서 라벨 안 전체를 span 하나로
          한 번 더 감싸서 FieldLabel의 flex item을 1개로 유지하고, 그
          안에서 (필수) span만 인라인으로 색을 입힌다.
        */}
        <h3 className="text-xs text-muted-foreground">
          Terms Agreement ((필수)/(선택) 표시)
        </h3>
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
      </div>
    </section>
  )
}
