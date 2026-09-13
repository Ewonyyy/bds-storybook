"use client"

import * as React from "react"
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
} from "@/components/ui/combobox"
import { InputGroup } from "@/components/ui/input-group"
import { ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"

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
  { label: "Mango", value: "mango" },
  { label: "Strawberry", value: "strawberry" },
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
// 재사용으로 맞춘다.
function TokenLabel({ token }: { token: Token }) {
  return (
    <div className="group/item flex items-center gap-2" data-size="md">
      <ItemMedia variant="image">
        <Image src="/token-kaia.svg" alt="" width={24} height={24} />
      </ItemMedia>
      <ItemContent>
        {/* font-normal: Item 원본은 font-medium이지만, 이 목록에서는
            다른 Combobox 항목들과 굵기를 맞추려고 400으로 오버라이드한다. */}
        <ItemTitle className="font-normal">{token.name}</ItemTitle>
      </ItemContent>
    </div>
  )
}

const SIZES = ["sm", "md", "lg"] as const

export default function ComboboxPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          Size (sm / md / lg — Input과 동일한 height/padding/typography)
        </h2>
        <div className="flex flex-wrap items-end gap-6">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col gap-1.5">
              <span className="text-xs text-muted-foreground">{size}</span>
              <Combobox items={FRUITS}>
                <div className="w-64">
                  <ComboboxInput size={size} placeholder="예: Apple" showClear />
                </div>
                <ComboboxContent>
                  <ComboboxEmpty>일치하는 과일이 없습니다.</ComboboxEmpty>
                  <ComboboxList>
                    {(item: Fruit) => (
                      <ComboboxItem
                        key={item.value}
                        value={item}
                        disabled={item.disabled}
                      >
                        {item.label}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-end gap-6">
          {SIZES.map((size) => (
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
        <p className="text-xs text-muted-foreground">
          trigger/clear 아이콘은 Input Group의 사이즈 반응형 계단(16/18/20px)을
          그대로 따라간다. Chips 컨테이너도 min-height/padding/typography가
          Input과 동일하게 스케일되며, 개별 Chip 뱃지 자체(높이/ChipRemove)는
          사이즈와 무관하게 고정이다.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          기본 단일 선택 (검색/필터링, disabled item, empty state)
        </h2>
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
        <p className="text-xs text-muted-foreground">
          &quot;Durian&quot;은 disabled item입니다. &quot;xyz&quot;처럼 존재하지
          않는 값을 입력하면 empty state가 표시됩니다.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          Group / Label / Separator
        </h2>
        <Combobox items={GROUPED_PRODUCE}>
          <div className="w-64">
            <ComboboxInput placeholder="농산물 검색" />
          </div>
          <ComboboxContent>
            <ComboboxEmpty>일치하는 항목이 없습니다.</ComboboxEmpty>
            <ComboboxList>
              {(group: ProduceGroup, index: number) => (
                <React.Fragment key={group.value}>
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
                </React.Fragment>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          Chips 다중 선택 (ChipRemove icon-sm 크기/정렬 확인)
        </h2>
        <Combobox items={LANGUAGES} multiple>
          <div className="w-96">
            <ComboboxChips>
              <ComboboxValue>
                {(value: Language[]) => (
                  <>
                    {value.map((language) => (
                      <ComboboxChip key={language.id}>
                        {language.value}
                      </ComboboxChip>
                    ))}
                    <ComboboxChipsInput
                      placeholder={
                        value.length > 0 ? "" : "예: TypeScript"
                      }
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
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm text-muted-foreground">
          아이콘+텍스트 (Item 서브파츠 재사용 — 토큰 선택)
        </h2>
        {/* ComboboxInput(네이티브 <input>)은 문자열만 표시할 수 있어
            선택된 토큰의 아이콘을 못 그린다 — Base UI 공식 select-style
            패턴(Trigger가 <button>, Value가 렌더 프롭으로 임의 JSX를
            그림)대로 ComboboxTrigger+ComboboxValue로 바꿨다. Token이
            { id, name } 형태라 label/value 필드가 없어 기본 stringify가
            JSON 문자열로 떨어지던 것도 itemToStringLabel로 함께 고친다. */}
        <Combobox items={TOKENS} itemToStringLabel={(token: Token) => token.name}>
          <div className="w-64">
            <ComboboxTrigger
              // InputGroup은 <div>라 nativeButton=false로 알려줘야
              // Base UI가 (Enter/Space 등) 키보드 활성화를 <button> 없이도
              // role="combobox" 기준으로 처리한다 — 안 주면 콘솔 경고와
              // 함께 키보드로는 popup이 안 열린다(클릭은 정상 동작).
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
                // ComboboxItem의 상하 padding(py-1)은 다른 목록들과 동일하게
                // 그대로 둔다 — md 티어 아이콘(24px)이 더 커서 행 높이
                // 자체는 다른 목록(28px)보다 커지지만(32px), padding 값은
                // 형식을 통일하는 게 우선이라 따로 줄이지 않는다.
                <ComboboxItem key={token.id} value={token}>
                  <TokenLabel token={token} />
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <p className="text-xs text-muted-foreground">
          ComboboxItem의 선택/하이라이트/포커스는 그대로 두고, 아이콘·간격·
          텍스트 크기만 Item의 md 티어 값(아이콘 24px, gap 8px, 텍스트
          14px)을 서브파츠(ItemMedia/ItemContent/ItemTitle)로 재사용했다.
        </p>
      </section>
    </div>
  )
}
