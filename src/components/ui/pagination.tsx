import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

// BDS Button은 sm/md/lg/icon-sm/icon-md/icon-lg 스케일이라(shadcn 원본의
// default/icon과 다름), 페이지 번호는 icon-sm, Previous/Next(텍스트 포함)는
// sm으로 매핑한다 — 둘 다 h-10(40px)이라 한 줄에서 높이가 맞는다.
type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon-sm",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={className}
      nativeButton={false}
      // data-slot: Button이 내부적으로 data-slot="button"을 하드코딩해서, render로
      // 넘긴 <a>에 data-slot="pagination-link"를 직접 주면 base-ui의 render-prop
      // 병합 순서가 서버/클라이언트에서 달라져 hydration mismatch가 났다.
      // Button 자신에게 prop으로 주면 {...props} 스프레드로 결정적으로 덮어써진다.
      data-slot="pagination-link"
      aria-current={isActive ? "page" : undefined}
      data-active={isActive}
      render={<a {...props} />}
    />
  )
}

function PaginationPrevious({
  className,
  text = "Previous",
  showText = true,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  text?: string
  showText?: boolean
}) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size={showText ? "sm" : "icon-sm"}
      className={cn(showText && "pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      {showText && <span className="hidden sm:block">{text}</span>}
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = "Next",
  showText = true,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  text?: string
  showText?: boolean
}) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size={showText ? "sm" : "icon-sm"}
      className={cn(showText && "pr-1.5!", className)}
      {...props}
    >
      {showText && <span className="hidden sm:block">{text}</span>}
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-10 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">더 많은 페이지</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
