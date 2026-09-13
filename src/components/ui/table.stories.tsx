import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ImageIcon, MoreHorizontalIcon } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Item, ItemContent, ItemMedia, ItemTitle } from "./item"

const invoices = [
  { invoice: "INV001", paymentStatus: "결제완료", totalAmount: "₩250,000", paymentMethod: "신용카드" },
  { invoice: "INV002", paymentStatus: "대기중", totalAmount: "₩150,000", paymentMethod: "PayPal" },
  { invoice: "INV003", paymentStatus: "미결제", totalAmount: "₩350,000", paymentMethod: "계좌이체" },
  { invoice: "INV004", paymentStatus: "결제완료", totalAmount: "₩450,000", paymentMethod: "신용카드" },
  { invoice: "INV005", paymentStatus: "결제완료", totalAmount: "₩550,000", paymentMethod: "PayPal" },
  { invoice: "INV006", paymentStatus: "대기중", totalAmount: "₩200,000", paymentMethod: "계좌이체" },
  { invoice: "INV007", paymentStatus: "미결제", totalAmount: "₩300,000", paymentMethod: "신용카드" },
]

const products = [
  { name: "무선 마우스", price: "₩29,900", category: "액세서리", stock: 42 },
  { name: "기계식 키보드", price: "₩129,900", category: "액세서리", stock: 7 },
  { name: "USB-C 허브", price: "₩49,900", category: "케이블/허브", stock: 0 },
  { name: "노트북 스탠드", price: "₩39,900", category: "액세서리", stock: 15 },
]

/** docs/table.md 기준. */
const meta = {
  title: "Data Display/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Table>
      <TableBody>
        {invoices.map((invoice, index) => (
          <TableRow key={invoice.invoice} className={index % 2 === 1 ? "bg-muted/50" : undefined}>
            <TableCell className="w-[100px] font-medium">{invoice.invoice}</TableCell>
            <TableCell className="text-muted-foreground">{invoice.paymentStatus}</TableCell>
            <TableCell className="text-muted-foreground">{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right text-muted-foreground">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

/** 합계 행이 있는 Table Footer를 보여줍니다. */
export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.slice(0, 3).map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>합계</TableCell>
          <TableCell className="text-right">₩2,500,000</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

export const Actions: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon-sm" className="size-8" />}
                >
                  <MoreHorizontalIcon />
                  <span className="sr-only">메뉴 열기</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>수정</DropdownMenuItem>
                  <DropdownMenuItem>복제</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">삭제</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const HorizontalActions: Story = {
  render: () => (
    <Table>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product.name} className={index % 2 === 1 ? "bg-muted/50" : undefined}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="text-muted-foreground">{product.category}</TableCell>
            <TableCell className="text-muted-foreground">{product.price}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon-sm" className="size-8" />}
                >
                  <MoreHorizontalIcon />
                  <span className="sr-only">메뉴 열기</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>수정</DropdownMenuItem>
                  <DropdownMenuItem>복제</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">삭제</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell>
              <Item size="md" className="w-fit border-0 bg-transparent p-0">
                <ItemMedia
                  variant="image"
                  className="rounded-md bg-muted text-muted-foreground"
                >
                  <ImageIcon className="size-4" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="font-medium">
                    {product.name}
                  </ItemTitle>
                </ItemContent>
              </Item>
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.stock === 0 ? "품절" : `${product.stock}개`}</TableCell>
            <TableCell className="text-right">{product.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
