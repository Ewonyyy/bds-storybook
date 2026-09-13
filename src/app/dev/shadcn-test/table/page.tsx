"use client"

import { ImageIcon, MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

export default function TablePage() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Basic</h2>
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
      </div>

      <div className="flex flex-col gap-3">
        {/*
          shadcn 공식 예제엔 없는 조합 — 컬럼 헤더 대신 각 행의 첫 칸이
          제목(row header) 역할을 하는 가로형 테이블. 헤더 행 없이
          TableBody만 쓰고, 짝수 행에 옅은 배경(zebra stripe)을 준다.
        */}
        <h3 className="text-xs text-muted-foreground">Basic (가로형 - 행 제목)</h3>
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
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs text-muted-foreground">Footer (합계 행)</h3>
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
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs text-muted-foreground">Actions (행별 드롭다운 메뉴)</h3>
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
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xs text-muted-foreground">Actions (가로형 - 행 제목)</h3>
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
      </div>

      <div className="flex flex-col gap-3">
        {/*
          shadcn 공식 예제엔 없는 조합 — 행마다 썸네일 이미지가 들어간
          버전. 실제 상품 이미지가 없어서 아이콘 플레이스홀더로 대체.
        */}
        <h3 className="text-xs text-muted-foreground">With Image (썸네일)</h3>
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
                  {/* Item(md) 재사용 — 아이콘/gap/텍스트 크기를 이 행이 아니라
                      Item 컴포넌트의 확정값을 따르도록 통일했다. 테이블 셀
                      안에 얹는 거라 Item 자체의 테두리/패딩은 꺼서 셀에
                      맞춘다. */}
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
      </div>
    </section>
  )
}
