import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Fragment } from "react"
import Image from "next/image"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "./combobox"
import { InputGroup } from "./input-group"
import { ItemContent, ItemMedia, ItemTitle } from "./item"

interface Fruit {
  label: string
  value: string
  disabled?: boolean
}

const FRUITS: Fruit[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Durian", value: "durian", disabled: true },
  { label: "Grape", value: "grape" },
]

interface Language {
  id: string
  value: string
}

const LANGUAGES: Language[] = [
  { id: "js", value: "JavaScript" },
  { id: "ts", value: "TypeScript" },
  { id: "py", value: "Python" },
  { id: "java", value: "Java" },
  { id: "cpp", value: "C++" },
  { id: "go", value: "Go" },
  { id: "rust", value: "Rust" },
]

interface Produce {
  id: string
  label: string
  group: "Fruits" | "Vegetables"
}

interface ProduceGroup {
  value: string
  items: Produce[]
}

const PRODUCE: Produce[] = [
  { id: "fruit-apple", label: "Apple", group: "Fruits" },
  { id: "fruit-banana", label: "Banana", group: "Fruits" },
  { id: "fruit-mango", label: "Mango", group: "Fruits" },
  { id: "fruit-kiwi", label: "Kiwi", group: "Fruits" },
  { id: "veg-broccoli", label: "Broccoli", group: "Vegetables" },
  { id: "veg-carrot", label: "Carrot", group: "Vegetables" },
  { id: "veg-spinach", label: "Spinach", group: "Vegetables" },
]

function groupProduce(items: Produce[]): ProduceGroup[] {
  const groups: Record<string, Produce[]> = {}
  items.forEach((item) => {
    ;(groups[item.group] ??= []).push(item)
  })
  return ["Fruits", "Vegetables"].map((value) => ({
    value,
    items: groups[value] ?? [],
  }))
}

const GROUPED_PRODUCE = groupProduce(PRODUCE)

interface Token {
  id: string
  name: string
}

const TOKENS: Token[] = [
  { id: "kaia", name: "Kaia" },
  { id: "usdc", name: "USD Coin" },
  { id: "eth", name: "Ethereum" },
  { id: "btc", name: "Bitcoin" },
]

// ComboboxItem 목록과 ComboboxTrigger의 선택값 표시 둘 다에서 같은
// 아이콘+텍스트 레이아웃을 써야 해서 분리했다 — md 티어 아이콘/gap/텍스트
// 크기(24px/8px/14px)는 Item 서브파츠(ItemMedia/ItemContent/ItemTitle)
// 재사용으로 맞춘다. dev 페이지(src/app/dev/shadcn-test/combobox)와 동일.
function TokenLabel({ token }: { token: Token }) {
  return (
    <div className="group/item flex items-center gap-2" data-size="md">
      <ItemMedia variant="image">
        <Image src="/token-kaia.svg" alt="" width={24} height={24} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="font-normal">{token.name}</ItemTitle>
      </ItemContent>
    </div>
  )
}

/**
 * docs/combobox.md 기준. 텍스트 입력으로 목록을 검색/필터링해 값을 고르는
 * 컴포넌트 — 단일 선택과 Chips 기반 다중 선택을 모두 지원한다.
 */
const meta = {
  title: "Form Controls/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Combobox items={FRUITS}>
      <div className="w-64">
        <ComboboxInput placeholder="예: Apple" showClear />
      </div>
      <ComboboxContent>
        <ComboboxEmpty>일치하는 과일이 없습니다.</ComboboxEmpty>
        <ComboboxList>
          {(item: Fruit) => (
            <ComboboxItem key={item.value} value={item} disabled={item.disabled}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

/** Combobox의 sm/md/lg 사이즈를 ComboboxInput과 ComboboxChips 각각에서 보여줍니다. */
export const Sizes: Story = {
  render: () => (
    <>
      <div className="flex flex-col gap-4">
        {(["sm", "md", "lg"] as const).map((size) => (
          <Combobox key={size} items={FRUITS}>
            <div className="w-64">
              <ComboboxInput size={size} placeholder="예: Apple" />
            </div>
            <ComboboxContent>
              <ComboboxList>
                {(item: Fruit) => <ComboboxItem key={item.value} value={item}>{item.label}</ComboboxItem>}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-6">
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size} className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground">{size}</span>
            <Combobox items={LANGUAGES} multiple>
              <div className="w-80">
                <ComboboxChips size={size}>
                  <ComboboxValue>
                    {(value: Language[]) => (
                      <>
                        {value.map((language) => (
                          <ComboboxChip key={language.id}>
                            {language.value}
                          </ComboboxChip>
                        ))}
                        <ComboboxChipsInput
                          placeholder={value.length > 0 ? "" : "예: TypeScript"}
                        />
                      </>
                    )}
                  </ComboboxValue>
                </ComboboxChips>
              </div>
              <ComboboxContent>
                <ComboboxEmpty>일치하는 언어가 없습니다.</ComboboxEmpty>
                <ComboboxList>
                  {(language: Language) => (
                    <ComboboxItem key={language.id} value={language}>
                      {language.value}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        ))}
      </div>
    </>
  ),
}

/** Chips를 이용해 여러 항목을 다중 선택하는 Combobox를 보여줍니다. */
export const Multiple: Story = {
  render: () => (
    <Combobox items={FRUITS} multiple>
      <div className="w-96">
        <ComboboxChips>
          <ComboboxValue>
            {(value: Fruit[]) => (
              <>
                {value.map((fruit) => (
                  <ComboboxChip key={fruit.value}>{fruit.label}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder={value.length > 0 ? "" : "예: Apple"} />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
      </div>
      <ComboboxContent>
        <ComboboxList>
          {(item: Fruit) => <ComboboxItem key={item.value} value={item}>{item.label}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Combobox items={FRUITS} disabled>
      <div className="w-64">
        <ComboboxInput placeholder="예: Apple" disabled />
      </div>
      <ComboboxContent>
        <ComboboxList>
          {(item: Fruit) => <ComboboxItem key={item.value} value={item}>{item.label}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

/** ComboboxGroup, ComboboxLabel, ComboboxSeparator로 항목을 그룹화하는 Combobox를 보여줍니다. */
export const Grouped: Story = {
  render: () => (
    <Combobox items={GROUPED_PRODUCE}>
      <div className="w-64">
        <ComboboxInput placeholder="농산물 검색" />
      </div>
      <ComboboxContent>
        <ComboboxEmpty>일치하는 항목이 없습니다.</ComboboxEmpty>
        <ComboboxList>
          {(group: ProduceGroup, index: number) => (
            <Fragment key={group.value}>
              {index > 0 && <ComboboxSeparator />}
              <ComboboxGroup items={group.items}>
                <ComboboxLabel>{group.value}</ComboboxLabel>
                <ComboboxCollection>
                  {(item: Produce) => (
                    <ComboboxItem key={item.id} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            </Fragment>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

/** ComboboxTrigger와 ComboboxValue로 아이콘과 텍스트가 있는 select 스타일 Combobox를 보여줍니다. */
export const TriggerValue: Story = {
  render: () => (
    <Combobox items={TOKENS} itemToStringLabel={(token: Token) => token.name}>
      <div className="w-64">
        <ComboboxTrigger
          // InputGroup은 <div>라 nativeButton=false로 알려줘야 Base UI가
          // role="combobox" 기준으로 키보드 활성화를 처리한다.
          nativeButton={false}
          render={
            <InputGroup className="justify-between px-[12px] py-[12px] text-base" />
          }
        >
          <ComboboxValue>
            {(token: Token | null) =>
              token ? (
                <TokenLabel token={token} />
              ) : (
                <span className="text-muted-foreground">토큰 검색</span>
              )
            }
          </ComboboxValue>
        </ComboboxTrigger>
      </div>
      <ComboboxContent>
        <ComboboxEmpty>일치하는 토큰이 없습니다.</ComboboxEmpty>
        <ComboboxList>
          {(token: Token) => (
            <ComboboxItem key={token.id} value={token}>
              <TokenLabel token={token} />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}
