"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/dev/shadcn-test/accordion", label: "Accordion" },
  { href: "/dev/shadcn-test/alert", label: "Alert" },
  { href: "/dev/shadcn-test/alert-dialog", label: "Alert Dialog" },
  { href: "/dev/shadcn-test/badge", label: "Badge" },
  { href: "/dev/shadcn-test/button", label: "Button" },
  { href: "/dev/shadcn-test/checkbox", label: "Checkbox" },
  { href: "/dev/shadcn-test/combobox", label: "Combobox" },
  { href: "/dev/shadcn-test/dialog", label: "Dialog" },
  { href: "/dev/shadcn-test/drawer", label: "Drawer" },
  { href: "/dev/shadcn-test/field", label: "Field" },
  { href: "/dev/shadcn-test/input", label: "Input" },
  { href: "/dev/shadcn-test/input-group", label: "Input Group" },
  { href: "/dev/shadcn-test/item", label: "Item" },
  { href: "/dev/shadcn-test/pagination", label: "Pagination" },
  { href: "/dev/shadcn-test/radio", label: "Radio" },
  { href: "/dev/shadcn-test/sheet", label: "Sheet" },
  { href: "/dev/shadcn-test/skeleton", label: "Skeleton" },
  { href: "/dev/shadcn-test/spinner", label: "Spinner" },
  { href: "/dev/shadcn-test/table", label: "Table" },
  { href: "/dev/shadcn-test/tabs", label: "Tabs" },
  { href: "/dev/shadcn-test/textarea", label: "Textarea" },
  { href: "/dev/shadcn-test/toast", label: "Toast" },
  { href: "/dev/shadcn-test/tooltip", label: "Tooltip" },
] as const

/**
 * design.md 시멘틱 토큰만으로 새로 받은 shadcn 컴포넌트를 스킨한
 * 격리 테스트 페이지들의 공용 레이아웃. 컴포넌트별로 라우트를 나눠서
 * (1) 페이지 하나가 무한정 길어지는 것을 막고 (2) 여러 명이 동시에
 * 작업할 때 같은 파일을 건드려 생기는 git 충돌을 줄인다.
 */
export default function ShadcnTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const currentLabel = NAV_ITEMS.find((item) => item.href === pathname)?.label

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-16 p-10">
      <nav className="sticky top-10 flex h-fit w-40 shrink-0 flex-col gap-1 self-start">
        <p className="mb-3 text-sm font-semibold text-muted-foreground">
          shadcn + design.md
        </p>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
              pathname === item.href && "bg-muted font-medium text-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <main className="flex w-full flex-1 flex-col gap-8">
        <h1 className="border-b pb-6 text-2xl font-bold">{currentLabel}</h1>
        {children}
      </main>
    </div>
  )
}
