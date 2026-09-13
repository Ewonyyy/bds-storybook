import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AccordionPage() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm text-muted-foreground">
        Single (기본값, 1개만 열림)
      </h2>
      <Accordion defaultValue={["item-1"]} className="max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger>이 컴포넌트는 접근 가능한가요?</AccordionTrigger>
          <AccordionContent>
            네. WAI-ARIA 디자인 패턴을 따릅니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>스타일 커스터마이징이 가능한가요?</AccordionTrigger>
          <AccordionContent>
            네. 기본 스타일이 제공되며, 필요하면 자유롭게 커스터마이징할 수
            있습니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" disabled>
          <AccordionTrigger>비활성 아이템</AccordionTrigger>
          <AccordionContent>클릭해도 열리지 않습니다.</AccordionContent>
        </AccordionItem>
      </Accordion>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Multiple (여러 개 동시에 열림)
      </h3>
      <Accordion multiple defaultValue={["m-1", "m-2"]} className="max-w-md">
        <AccordionItem value="m-1">
          <AccordionTrigger>첫 번째 항목</AccordionTrigger>
          <AccordionContent>
            multiple 옵션이 켜져 있으면 여러 항목을 동시에 펼쳐둘 수
            있습니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="m-2">
          <AccordionTrigger>두 번째 항목</AccordionTrigger>
          <AccordionContent>
            이 항목도 첫 번째 항목과 별개로 열려 있습니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Border (전체 테두리 + 항목 구분선)
      </h3>
      <Accordion className="max-w-lg rounded-lg border" defaultValue={["billing"]}>
        <AccordionItem value="billing" className="border-b px-4 last:border-b-0">
          <AccordionTrigger>결제는 어떻게 이루어지나요?</AccordionTrigger>
          <AccordionContent>
            월간/연간 구독 플랜을 제공하며, 매 주기 시작 시 결제됩니다.
            언제든 해지할 수 있습니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="security" className="border-b px-4 last:border-b-0">
          <AccordionTrigger>데이터는 안전한가요?</AccordionTrigger>
          <AccordionContent>
            네. 전송 및 저장 시 암호화를 적용하고 있습니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="integration" className="border-b px-4 last:border-b-0">
          <AccordionTrigger>어떤 연동을 지원하나요?</AccordionTrigger>
          <AccordionContent>
            Slack, Zapier 등 다양한 외부 도구와 연동할 수 있습니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <h3 className="mt-2 text-xs text-muted-foreground">
        Card (Card 컴포넌트로 감싼 형태)
      </h3>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>구독 및 결제</CardTitle>
          <CardDescription>
            계정, 플랜, 결제, 해지에 대한 자주 묻는 질문입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion defaultValue={["plans"]}>
            <AccordionItem value="plans">
              <AccordionTrigger>어떤 구독 플랜이 있나요?</AccordionTrigger>
              <AccordionContent>
                Starter, Professional, Enterprise 3단계 플랜을 제공합니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="billing-card">
              <AccordionTrigger>결제는 어떻게 이루어지나요?</AccordionTrigger>
              <AccordionContent>
                매 결제 주기 시작 시 자동 결제되며, 결제 후 이메일로
                영수증을 받습니다.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cancel">
              <AccordionTrigger>구독을 해지하려면요?</AccordionTrigger>
              <AccordionContent>
                계정 설정에서 언제든 해지할 수 있으며, 위약금은 없습니다.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </section>
  )
}
