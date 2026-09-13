"use client"

import { Button } from "@/components/ui/button"
import { Toaster, toast } from "@/components/ui/toast"

export default function ToastPage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm text-muted-foreground">타입별 (5종)</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "success",
              title: "저장되었습니다",
              description: "변경사항이 정상적으로 반영되었습니다.",
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "warning",
              title: "주의가 필요합니다",
              description: "일부 항목이 비어 있습니다.",
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "error",
              title: "오류가 발생했습니다",
              description: "잠시 후 다시 시도해주세요.",
            })
          }
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.add({
              type: "info",
              title: "알려드립니다",
              description: "새 업데이트를 확인할 수 있습니다.",
            })
          }
        >
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const id = toast.add({
              type: "loading",
              title: "처리 중입니다…",
              timeout: 0,
            })
            setTimeout(() => {
              toast.update(id, {
                type: "success",
                title: "완료되었습니다",
                timeout: 4000,
              })
            }, 1500)
          }}
        >
          Loading → Success
        </Button>
      </div>

      <h3 className="mt-4 text-xs text-muted-foreground">Action 포함</h3>
      <div>
        <Button
          variant="outline"
          onClick={() => {
            const id = toast.add({
              title: "항목이 삭제되었습니다",
              description: "8월 31일 (일) 오전 9:00",
              actionProps: {
                children: "실행 취소",
                onClick: () => toast.close(id),
              },
            })
          }}
        >
          Undo 액션
        </Button>
      </div>

      <h3 className="mt-4 text-xs text-muted-foreground">Promise 연동</h3>
      <div>
        <Button
          variant="outline"
          onClick={() => {
            const fakeRequest = new Promise<string>((resolve, reject) =>
              setTimeout(
                () => (Math.random() > 0.5 ? resolve("ok") : reject(new Error("네트워크 오류"))),
                1500
              )
            )
            toast.promise(fakeRequest, {
              loading: "저장 중…",
              success: "저장되었습니다",
              error: (err) => `실패: ${err.message}`,
            })
            // toast.promise가 별도로 구독하기 때문에, 원본 Promise도 반드시
            // catch해서 콘솔의 unhandledRejection 경고를 막는다.
            fakeRequest.catch(() => {})
          }}
        >
          랜덤 성공/실패
        </Button>
      </div>

      <Toaster />
    </section>
  )
}
