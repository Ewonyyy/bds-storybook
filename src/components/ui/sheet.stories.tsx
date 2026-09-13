import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

/**
 * docs/sheet.md 기준. Dialog/Drawer와의 구분점은 MD "Sheet vs Dialog vs
 * Drawer" 참고 — `side` prop으로 4방향(top/right/bottom/left) 슬라이드.
 */
const meta = {
  title: "Overlay/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>열기</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>프로필 수정</SheetTitle>
          <SheetDescription>
            프로필 정보를 여기서 수정하세요. 완료되면 저장을 눌러주세요.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">이름</Label>
            <Input id="sheet-demo-name" size="sm" defaultValue="홍길동" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">아이디</Label>
            <Input id="sheet-demo-username" size="sm" defaultValue="@honggildong" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" size="sm">
            저장
          </Button>
          <SheetClose render={<Button variant="outline" size="sm" />}>
            닫기
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const SHEET_SIDES = [
  { value: "top", label: "위" },
  { value: "right", label: "오른쪽" },
  { value: "bottom", label: "아래" },
  { value: "left", label: "왼쪽" },
] as const

export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side.value}>
          <SheetTrigger render={<Button variant="outline" />}>
            {side.label}
          </SheetTrigger>
          <SheetContent
            side={side.value}
            className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
          >
            <SheetHeader>
              <SheetTitle>프로필 수정</SheetTitle>
              <SheetDescription>
                프로필 정보를 여기서 수정하세요. 완료되면 저장을 눌러주세요.
              </SheetDescription>
            </SheetHeader>
            <div className="no-scrollbar overflow-y-auto px-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <p key={index} className="mb-2 leading-relaxed">
                  {LOREM}
                </p>
              ))}
            </div>
            <SheetFooter>
              <Button type="submit" size="sm">
                저장
              </Button>
              <SheetClose render={<Button variant="outline" size="sm" />}>
                취소
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
}

export const NoCloseButton: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>열기</SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>닫기 버튼 없음</SheetTitle>
          <SheetDescription>
            이 시트는 우측 상단에 닫기 버튼이 없습니다. 바깥을 클릭하면
            닫힙니다.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}
