"use client"

import { Trash2, TriangleAlert } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function AlertDialogPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Basic</h2>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            열기
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말 진행하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                이 작업은 되돌릴 수 없습니다. 계속하기 전에 다시 한번
                확인해주세요.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction>계속하기</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Small (size=sm)</h2>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            열기
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>변경사항을 저장할까요?</AlertDialogTitle>
              <AlertDialogDescription>
                저장하지 않으면 변경사항이 사라집니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction>저장</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Media</h2>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            열기
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia>
                <TriangleAlert />
              </AlertDialogMedia>
              <AlertDialogTitle>세션이 곧 만료됩니다</AlertDialogTitle>
              <AlertDialogDescription>
                5분 후 자동으로 로그아웃됩니다. 계속 작업하시려면 연장해
                주세요.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>로그아웃</AlertDialogCancel>
              <AlertDialogAction>연장하기</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Small with Media</h2>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            열기
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia>
                <TriangleAlert />
              </AlertDialogMedia>
              <AlertDialogTitle>알림 권한이 꺼져 있습니다</AlertDialogTitle>
              <AlertDialogDescription>
                설정에서 알림을 켜야 중요한 소식을 받을 수 있습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>나중에</AlertDialogCancel>
              <AlertDialogAction>설정으로 이동</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">Destructive</h2>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            계정 삭제
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                <Trash2 />
              </AlertDialogMedia>
              <AlertDialogTitle>계정을 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                계정을 삭제하면 모든 데이터가 영구적으로 사라지며 복구할 수
                없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel variant="outline">취소</AlertDialogCancel>
              <AlertDialogAction variant="destructive">삭제</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  )
}
