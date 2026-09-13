import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Toaster, toast } from "./toast"
import { Button } from "./button"

/**
 * docs/toast.md 기준. `@base-ui/react/toast`의 전역 싱글턴 매니저
 * (`toast.add/update/close/promise`)를 쓴다 — Root가 아니라 트리거 버튼으로
 * 시연한다. type 5종: success/warning/error/info/loading.
 */
const meta = {
  title: "Feedback/Toast",
  component: Toaster,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/** success, warning, error, info, loading → success 타입별 Toast를 보여줍니다. */
export const Types: Story = {
  render: () => (
    <>
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
      <Toaster />
    </>
  ),
}

export const WithAction: Story = {
  render: () => (
    <>
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
      <Toaster />
    </>
  ),
}

export const Promise: Story = {
  render: () => (
    <>
      <Button
        variant="outline"
        onClick={() => {
          const fakeRequest = new globalThis.Promise<string>((resolve, reject) =>
            setTimeout(
              () => (Math.random() > 0.5 ? resolve("ok") : reject(new Error("네트워크 오류"))),
              1500
            )
          )
          toast
            .promise(fakeRequest, {
              loading: "저장 중…",
              success: "저장되었습니다",
              error: (err) => `실패: ${err.message}`,
            })
            .catch(() => {})
          fakeRequest.catch(() => {})
        }}
      >
        랜덤 성공/실패
      </Button>
      <Toaster />
    </>
  ),
}
