import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Button } from "./button"
import { Field, FieldGroup } from "./field"
import { Input } from "./input"
import { Label } from "./label"

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."

/**
 * docs/dialog.md 기준. 모달 대화상자 — docs/dialog.md "Dialog vs Alert
 * Dialog"에서 역할 구분을 설명한다(Dialog는 범용, Alert Dialog는 확인/
 * 취소 전용).
 */
const meta = {
  title: "Overlay/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      {/* contents: form이 block이라 flex 자식(section)의 stretch를
          못 받아 트리거 버튼만 다른 데모보다 폭이 좁아지는 문제가
          있었다 — form을 레이아웃에서 없는 것처럼 만들어서 해결. */}
      <form className="contents">
        <DialogTrigger render={<Button variant="outline">열기</Button>} />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>프로필 수정</DialogTitle>
            <DialogDescription>
              프로필 정보를 여기서 수정하세요. 완료되면 저장을
              눌러주세요.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="dialog-name">이름</Label>
              <Input
                id="dialog-name"
                name="name"
                size="sm"
                defaultValue="홍길동"
              />
            </Field>
            <Field>
              <Label htmlFor="dialog-username">아이디</Label>
              <Input
                id="dialog-username"
                name="username"
                size="sm"
                defaultValue="@honggildong"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" size="sm" />}>
              취소
            </DialogClose>
            <Button type="submit" size="sm">
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  ),
}

export const CustomCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>공유</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>링크 공유</DialogTitle>
          <DialogDescription>
            이 링크가 있으면 누구나 볼 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="dialog-share-link" className="sr-only">
              링크
            </Label>
            <Input
              id="dialog-share-link"
              size="sm"
              defaultValue="https://example.com/docs/dialog"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose render={<Button type="button" size="sm" />}>
            닫기
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        닫기 버튼 없음
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>닫기 버튼 없음</DialogTitle>
          <DialogDescription>
            이 다이얼로그는 우측 상단에 닫기 버튼이 없습니다.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
}

export const StickyFooter: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Sticky Footer
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            내용이 스크롤되는 동안에도 하단 액션 버튼은 항상 보입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              {LOREM}
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>
            닫기
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const ScrollableContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Scrollable Content
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>
            내용이 길어지면 스크롤되고, 헤더는 그대로 고정됩니다.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              {LOREM}
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  ),
}
