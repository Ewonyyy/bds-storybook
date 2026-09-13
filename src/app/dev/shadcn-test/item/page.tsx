import Image from "next/image"

import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"

export default function ItemPage() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          Size — sm / md / lg
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs text-muted-foreground">sm (아이콘 16px)</h3>
            <Item size="sm" className="max-w-sm px-0">
              <ItemMedia variant="image">
                <Image src="/token-kaia.svg" alt="" width={16} height={16} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Username</ItemTitle>
              </ItemContent>
            </Item>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xs text-muted-foreground">
              md (아이콘 24px) — 텍스트 14px 확정 / 16px도 다수 사용
            </h3>
            <Item size="md" className="max-w-sm px-0">
              <ItemMedia variant="image">
                <Image src="/token-kaia.svg" alt="" width={24} height={24} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Username</ItemTitle>
              </ItemContent>
            </Item>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xs text-muted-foreground">
              lg (아이콘 32px) — 텍스트 20px 확정 / 24px도 다수 사용
            </h3>
            <Item size="lg" className="max-w-sm px-0">
              <ItemMedia variant="image">
                <Image src="/token-kaia.svg" alt="" width={32} height={32} />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Username</ItemTitle>
              </ItemContent>
            </Item>
          </div>
        </div>
      </div>
    </section>
  )
}
