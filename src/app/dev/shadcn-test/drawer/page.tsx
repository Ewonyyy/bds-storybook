"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Toaster, toast } from "@/components/ui/toast"

const DELIVERY_TIMES = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "일반 배송",
    description: "25~35분 · 지금 바로 배차",
    badge: "가장 빠름",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "오후 5:00 – 5:15",
    description: "오후 4:45 조리 시작",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "오후 5:30 – 5:45",
    description: "퇴근길에 받기 좋아요",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "오후 6:00 – 6:15",
    description: "가장 인기 많음 · 수요 높음",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "오후 6:30 – 6:45",
    description: "주방 마감 전 마지막 슬롯",
  },
] as const

export default function DrawerPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          Basic (shadcn 공식 히어로 데모 — 데스크톱은 오른쪽, 모바일은
          하단)
        </h2>
        <BasicDrawerDemo />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          Position (왼쪽에서 열기)
        </h2>
        <Drawer swipeDirection="left">
          <DrawerTrigger render={<Button variant="secondary" />}>
            왼쪽 Drawer 열기
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>목표 설정</DrawerTitle>
              <DrawerDescription>하루 활동 목표를 설정하세요.</DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <div className="size-full rounded-2xl bg-muted" />
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button size="sm" />}>닫기</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Swipe Handle</h2>
        <Drawer showSwipeHandle>
          <DrawerTrigger render={<Button variant="secondary" />}>
            열기
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer</DrawerTitle>
              <DrawerDescription>
                스와이프 핸들이 있는 Drawer입니다.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <div className="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button size="sm" />}>닫기</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Nested Drawers</h2>
        <NestedDrawerDemo />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Non-Modal</h2>
        <Drawer modal={false} disablePointerDismissal swipeDirection="right">
          <DrawerTrigger render={<Button variant="outline" />}>
            Non-Modal
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>비모달 Drawer</DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <div className="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button size="sm" />}>닫기</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <p className="text-xs text-muted-foreground">
          배경을 클릭해도 안 닫힙니다 — 뒤쪽 페이지와 동시에 상호작용할 수
          있습니다.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Snap Points</h2>
        <Drawer snapPoints={SNAP_POINTS} showSwipeHandle>
          <DrawerTrigger render={<Button variant="outline" />}>
            Snap Drawer 열기
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>스냅 포인트</DrawerTitle>
              <DrawerDescription>
                드로어를 드래그해서 낮은 지점과 거의 전체 높이 사이를
                스냅해보세요.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 p-4">
              <div className="rounded-2xl bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:h-80 group-data-[swipe-axis=y]/drawer-popup:w-full" />
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button size="sm" />}>닫기</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          Responsive Dialog/Drawer
        </h2>
        <ResponsiveDialogDrawerDemo />
        <p className="text-xs text-muted-foreground">
          데스크톱(≥768px)에서는 Dialog, 모바일 너비에서는 Drawer로
          자동 전환됩니다. 브라우저 폭을 줄여서 확인해보세요.
        </p>
      </section>

      <Toaster />
    </div>
  )
}

const SNAP_POINTS = ["31rem", 1]

function BasicDrawerDemo() {
  const [open, setOpen] = React.useState(false)
  const [deliveryTime, setDeliveryTime] = React.useState("asap")
  const isMobile = useIsMobile()

  function handleConfirm() {
    const selected = DELIVERY_TIMES.find((time) => time.value === deliveryTime)
    if (!selected) {
      return
    }
    setOpen(false)
    toast.add({
      title: "배송 시간이 확정되었습니다",
      description: selected.label,
    })
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger render={<Button variant="secondary" />}>
        열기
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>배송 시간을 선택하세요</DrawerTitle>
          <DrawerDescription>
            최대한 빠르게 준비해드릴게요.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <RadioGroup
            value={deliveryTime}
            onValueChange={setDeliveryTime}
            className="gap-2"
          >
            {DELIVERY_TIMES.map((time) => (
              <FieldLabel key={time.value} htmlFor={time.id}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="flex items-center gap-2">
                      {time.label}
                      {"badge" in time ? (
                        <Badge variant="secondary">{time.badge}</Badge>
                      ) : null}
                    </FieldTitle>
                    <FieldDescription>{time.description}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={time.value} id={time.id} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button size="sm" onClick={handleConfirm}>
            배송 시간 확정
          </Button>
          <DrawerClose render={<Button variant="outline" size="sm" />}>
            취소
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function NestedDrawerDemo() {
  const isMobile = useIsMobile()
  const swipeDirection = isMobile ? "down" : "right"

  return (
    <Drawer showSwipeHandle={isMobile} swipeDirection={swipeDirection}>
      <DrawerTrigger render={<Button variant="secondary" />}>
        열기
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>
            같은 방향으로 또 다른 Drawer를 열어보세요.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:aspect-video group-data-[swipe-axis=y]/drawer-popup:w-full" />
        </div>
        <DrawerFooter>
          <Drawer showSwipeHandle={isMobile} swipeDirection={swipeDirection}>
            <DrawerTrigger render={<Button variant="outline" size="sm" />}>
              중첩 Drawer 열기
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>중첩 Drawer</DrawerTitle>
                <DrawerDescription>
                  부모 Drawer는 이 뒤에 그대로 남아있습니다.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 p-4">
                <div className="bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:aspect-video group-data-[swipe-axis=y]/drawer-popup:w-full" />
              </div>
              <DrawerFooter>
                <Drawer
                  showSwipeHandle={isMobile}
                  swipeDirection={swipeDirection}
                >
                  <DrawerTrigger
                    render={<Button variant="outline" size="sm" />}
                  >
                    세 번째 Drawer 열기
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>세 번째 Drawer</DrawerTitle>
                      <DrawerDescription>
                        Drawer 두 개가 이 뒤에 겹쳐 쌓여있습니다.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex-1 p-4">
                      <div className="bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:aspect-video group-data-[swipe-axis=y]/drawer-popup:w-full" />
                    </div>
                    <DrawerFooter>
                      <Drawer
                        showSwipeHandle={isMobile}
                        swipeDirection={swipeDirection}
                      >
                        <DrawerTrigger
                          render={<Button variant="outline" size="sm" />}
                        >
                          네 번째 Drawer 열기
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>네 번째 Drawer</DrawerTitle>
                            <DrawerDescription>
                              스택에서 가장 앞에 있는 Drawer입니다.
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="flex-1 p-4">
                            <div className="bg-muted group-data-[swipe-axis=x]/drawer-popup:size-full group-data-[swipe-axis=y]/drawer-popup:aspect-video group-data-[swipe-axis=y]/drawer-popup:w-full" />
                          </div>
                          <DrawerFooter>
                            <DrawerClose
                              render={<Button variant="outline" size="sm" />}
                            >
                              닫기
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                      <DrawerClose
                        render={<Button variant="outline" size="sm" />}
                      >
                        닫기
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <DrawerClose render={<Button variant="outline" size="sm" />}>
                  닫기
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <DrawerClose render={<Button variant="outline" size="sm" />}>
            닫기
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ResponsiveDialogDrawerDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button variant="outline" />}>
          프로필 수정
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>프로필 수정</DialogTitle>
            <DialogDescription>
              프로필 정보를 여기서 수정하세요. 완료되면 저장을 눌러주세요.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={<Button variant="outline" />}>
        프로필 수정
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>프로필 수정</DrawerTitle>
          <DrawerDescription>
            프로필 정보를 여기서 수정하세요. 완료되면 저장을 눌러주세요.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="p-4" />
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="drawer-email">이메일</Label>
        <Input
          type="email"
          id="drawer-email"
          size="sm"
          defaultValue="shadcn@example.com"
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="drawer-username">아이디</Label>
        <Input id="drawer-username" size="sm" defaultValue="@shadcn" />
      </div>
      <Button type="submit" size="sm">
        저장
      </Button>
    </form>
  )
}
