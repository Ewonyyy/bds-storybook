"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

// Line variant는 sm/md/lg 3단이 아니라 Figma가 실측 기준으로 쓰는
// 숫자 라벨 그대로 4단(36/40/44/48)을 쓴다 — Button/Input과 다른
// 네이밍 체계지만, Figma 파일이 이미 이 라벨로 스펙을 정의하고 있어
// 임의로 sm/md/lg로 옮기지 않기로 확정했다(tabs.md 참고). Default/Ghost
// variant는 이 size 축과 무관하게 항상 기존 Button sm 규격(단일값)을
// 쓴다 — size는 line 전용이라 `data-line-size`로만 흘려보낸다.
const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-[10px] p-1 text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none group-data-horizontal/tabs:data-[line-size=36]:h-9 group-data-horizontal/tabs:data-[line-size=40]:h-10 group-data-horizontal/tabs:data-[line-size=44]:h-11 group-data-horizontal/tabs:data-[line-size=48]:h-12",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
        // ghost: 컨테이너 배경 없이(투명) Active Trigger만 배경을 갖는
        // 형태 — Badge/Button에서 이미 같은 의미로 쓰는 "ghost" 네이밍을
        // 그대로 재사용했다(tabs.md 참고, outline/muted는 다른 의미로
        // 이미 쓰이고 있어 후보에서 제외).
        ghost: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  size = "36",
  ...props
}: TabsPrimitive.List.Props &
  VariantProps<typeof tabsListVariants> & {
    size?: "36" | "40" | "44" | "48"
  }) {
  const lineSize = variant === "line" ? size : undefined
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-line-size={lineSize}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-[8px] border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:text-[var(--content-disabled)] has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:text-[var(--content-disabled)] group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        // ghost: active 배경만 surface.canvas(흰색) 대신 surface.subtle로
        // 교체 — 컨테이너 배경이 없어 흰색은 대비가 없고, Tabs엔 Shadow
        // 토큰도 없어 그림자로도 구분이 안 되기 때문(tabs.md 참고).
        "group-data-[variant=ghost]/tabs-list:data-active:bg-[var(--surface-subtle)] dark:group-data-[variant=ghost]/tabs-list:data-active:bg-[var(--surface-subtle)]",
        // Line 4단계(36/40/44/48, Figma 실측) — 각 tier의 height는
        // TabsList의 `data-line-size` 기반 h-9/10/11/12(tabsListVariants
        // 참고)를 `h-[calc(100%-1px)]`로 그대로 상속받으므로 Trigger에
        // 별도 height 지정은 불필요하다. pt/pb는 대칭이 아니라 의도적으로
        // 배분한다 — height가 고정된 상태에서 pt를 줄이고 pb를 그만큼
        // 늘리면(합은 유지) 콘텐츠(아이콘+텍스트)가 위로 이동해 하단
        // underline과의 시각적 간격만 늘어난다. 4단계 모두 원래 대칭
        // 값(36: 10/10, 40·48: 12/12) 대비 pt -2px / pb +2px로 옮겨
        // underline과의 간격을 2px 늘렸다.
        "group-data-[line-size=36]/tabs-list:text-sm group-data-[line-size=36]/tabs-list:leading-[1.4] group-data-[line-size=36]/tabs-list:font-medium group-data-[line-size=36]/tabs-list:gap-1.5 group-data-[line-size=36]/tabs-list:pt-2 group-data-[line-size=36]/tabs-list:pb-3 group-data-[line-size=36]/tabs-list:[&_svg:not([class*='size-'])]:size-4",
        "group-data-[line-size=40]/tabs-list:text-base group-data-[line-size=40]/tabs-list:leading-[1.5] group-data-[line-size=40]/tabs-list:font-medium group-data-[line-size=40]/tabs-list:gap-2 group-data-[line-size=40]/tabs-list:pt-2.5 group-data-[line-size=40]/tabs-list:pb-3.5 group-data-[line-size=40]/tabs-list:[&_svg:not([class*='size-'])]:size-4.5",
        // 44 tier: typography.title.20-m(line-height 1.45)을 그대로 쓴다
        // — Figma 실측값(1.5)을 하드코딩하지 않기로 확정. 대신 1.5→1.45로
        // 짧아진 line-box 높이(20px 기준 1px 차이)만큼 pt/pb를 반대로
        // ±1px 옮긴 13/11(pt/pb)이 기존 보정 기준값이었고, 여기서 다시
        // underline 간격 +2px(pt -2 / pb +2)를 더해 11/13으로 확정했다 —
        // line-height 자체를 조작하지 않고 레이아웃 여백만 보정한다는
        // 원칙은 그대로 유지(tabs.md 참고).
        "group-data-[line-size=44]/tabs-list:text-xl group-data-[line-size=44]/tabs-list:leading-[1.45] group-data-[line-size=44]/tabs-list:font-medium group-data-[line-size=44]/tabs-list:gap-2.5 group-data-[line-size=44]/tabs-list:pt-[11px] group-data-[line-size=44]/tabs-list:pb-[13px] group-data-[line-size=44]/tabs-list:[&_svg:not([class*='size-'])]:size-5",
        "group-data-[line-size=48]/tabs-list:text-2xl group-data-[line-size=48]/tabs-list:leading-[1.4] group-data-[line-size=48]/tabs-list:font-semibold group-data-[line-size=48]/tabs-list:gap-2.5 group-data-[line-size=48]/tabs-list:pt-2.5 group-data-[line-size=48]/tabs-list:pb-3.5 group-data-[line-size=48]/tabs-list:[&_svg:not([class*='size-'])]:size-6",
        // Selected indicator: 항상 after 가상요소(shadcn 원본 방식) —
        // border-bottom을 시도했다가 되돌렸다. vertical/horizontal 모두
        // 색은 원본 그대로(content.primary, `after:bg-foreground`)
        // 유지한다 — Selected 텍스트도 세 variant 공통 content.primary로
        // 확정했고(tabs.md 참고), shadcn 원본이 "indicator 색 = active
        // 텍스트 색(둘 다 foreground)"으로 통일하는 의도를 그대로
        // 따른다. Figma는 horizontal line 밑줄을 `primary/main`(브랜드
        // 퍼플)로 정의하지만, 원본 구조/의도를 우선해 색은 채택하지 않고
        // 두께 2px / radius 0만 Figma 실측을 반영했다(tabs.md 참고,
        // size tier 36/40/44/48과 무관하게 동일하게 적용된다).
        "after:absolute after:opacity-0 after:transition-opacity after:rounded-none",
        "group-data-vertical/tabs:after:bg-foreground group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-vertical/tabs:group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        "group-data-[variant=line]/tabs-list:group-data-horizontal/tabs:after:bg-foreground group-data-[variant=line]/tabs-list:group-data-horizontal/tabs:after:inset-x-0 group-data-[variant=line]/tabs-list:group-data-horizontal/tabs:after:bottom-0 group-data-[variant=line]/tabs-list:group-data-horizontal/tabs:after:h-0.5 group-data-[variant=line]/tabs-list:group-data-horizontal/tabs:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
