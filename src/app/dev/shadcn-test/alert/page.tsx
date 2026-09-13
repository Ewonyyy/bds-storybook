import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
} from "lucide-react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function AlertPage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm text-muted-foreground">Basic</h2>
      <Alert className="max-w-md">
        <CheckCircle2Icon />
        <AlertTitle>계정 정보가 업데이트되었습니다</AlertTitle>
        <AlertDescription>
          프로필 정보가 저장되었습니다. 변경 사항은 즉시 반영됩니다.
        </AlertDescription>
      </Alert>

      <h3 className="mt-2 text-xs text-muted-foreground">Destructive</h3>
      <Alert variant="destructive" className="max-w-md">
        <AlertCircleIcon />
        <AlertTitle>결제에 실패했습니다</AlertTitle>
        <AlertDescription>
          결제를 처리할 수 없습니다. 결제 수단을 확인한 후 다시 시도해
          주세요.
        </AlertDescription>
      </Alert>

      <h3 className="mt-2 text-xs text-muted-foreground">Action</h3>
      <Alert className="max-w-md">
        <AlertTitle>다크 모드를 사용할 수 있습니다</AlertTitle>
        <AlertDescription>
          프로필 설정에서 활성화해 시작해보세요.
        </AlertDescription>
        <AlertAction>
          {/* variant="default": shadcn 문서에 적힌 코드는 outline이지만
              실제 라이브 사이트 렌더링은 filled primary — 실측값을
              따랐다. h-6/px-2/gap-1/text-xs도 같은 실측(24px/8px/4px/
              12px) — 전부 Foundation 토큰과 일치하지만 BDS Button엔 이
              크기의 공식 사이즈가 없어서 이 인스턴스만 className으로
              오버라이드(Toast의 h-7 오버라이드와 동일한 방식).
              docs/alert.md "알려진 미해결 항목" 참고. */}
          <Button
            variant="default"
            size="sm"
            className="h-6 gap-1 rounded-[10px] px-2 text-xs"
          >
            활성화
          </Button>
        </AlertAction>
      </Alert>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Custom Colors (Warning)
      </h3>
      {/*
        Semantic Status에 Warning 토큰이 아직 없음(design.md: "보류 —
        Warning, Info: 사용 근거 부족"). 새 raw 색을 만드는 대신 이미 있는
        Foundation Orange 팔레트를 재사용 — color.orange.200(border) /
        color.orange.50(bg) / color.orange.900(text). 다크모드는 design.md에
        아직 다크모드 착수 전이라 별도 대응하지 않음.
      */}
      <Alert className="max-w-md border-[#fbd38d] bg-[#fffaf0] text-[#652b19]">
        <AlertTriangleIcon />
        <AlertTitle>구독이 3일 후 만료됩니다.</AlertTitle>
        <AlertDescription className="text-[#652b19]/80">
          서비스 중단을 피하려면 지금 갱신하거나 유료 플랜으로 업그레이드해
          계속 이용하세요.
        </AlertDescription>
      </Alert>
    </section>
  )
}
