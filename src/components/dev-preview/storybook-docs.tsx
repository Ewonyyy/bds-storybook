import * as React from "react"
import styles from "./storybook-docs.module.css"

/**
 * Storybook 커스텀 MDX 문서 페이지 공용 빌딩 블록.
 * shadcn Checkbox 문서(ui.shadcn.com/docs/components/base/checkbox)의 정보 구조를
 * 참고해 Radio/Button/Select 등 다른 컴포넌트 MDX에서도 그대로 재사용하도록 만들었습니다.
 * 실제 렌더링되는 값(색상/간격/타이포)은 storybook-docs.module.css의 BDS 토큰만 씁니다.
 */

export function DocIntro({
  title,
  description,
}: {
  title: string
  description: React.ReactNode
}) {
  return (
    <>
      <h1 className={styles.docTitle}>{title}</h1>
      <p className={styles.docDescription}>{description}</p>
    </>
  )
}

/** shadcn 문서의 각 섹션(Checked State, Invalid State, Basic, Disabled, Group ...)에 대응합니다. */
export function DocSection({
  title,
  description,
  children,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className={styles.docSection}>
      <h2 className={styles.docSectionTitle}>{title}</h2>
      {description ? <p className={styles.docSectionDescription}>{description}</p> : null}
      {children}
    </section>
  )
}

/** 한 섹션 안에서 Uncontrolled/Controlled처럼 하위 예시를 나눌 때 씁니다. */
export function DocSubsection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className={styles.docSubsectionTitle}>{title}</h3>
      {children}
    </div>
  )
}

/** shadcn 데모 박스에 대응하는 Preview 컨테이너. 실제 미리보기(Canvas)는 children으로 넣습니다. */
export function DocPreview({ children }: { children: React.ReactNode }) {
  return <div className={styles.docPreview}>{children}</div>
}

/** "BDS 전용 확장" 섹션(shadcn 문서엔 없는 Property)을 시각적으로 구분합니다. */
export function DocExtensionSection({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.docExtSection}>
      <p className={styles.docExtLabel}>BDS 전용 확장 — shadcn 문서에는 없는 Property입니다</p>
      {children}
    </div>
  )
}

export interface VariantGridItem {
  /** items 배열 안에서 겹치지 않으면 label을 그대로 key로 씁니다. */
  key?: string
  /** 캡션으로 표시할 이름 (예: "Checked", "16px", "radius.4"). */
  label: string
  children: React.ReactNode
}

/**
 * Storybook Story의 States/Sizes/Radius처럼 "여러 Variant를 나란히 놓고 그 아래 캡션을
 * 붙이는" 반복 패턴을 공용화한 컴포넌트입니다. 원래 각 .stories.tsx 파일마다 똑같은
 * flex/gap 인라인 스타일을 새로 작성했는데(checkbox.stories.tsx States/Size/Radius,
 * radio.stories.tsx States/Sizes 등), 여기 하나로 모았습니다.
 *
 * 사용 방식과 렌더링 결과(레이아웃 수치)는 기존 인라인 스타일과 동일합니다 — 순수 추출.
 */
export function VariantGrid({ items }: { items: VariantGridItem[] }) {
  return (
    <div className={styles.variantGrid}>
      {items.map((item) => (
        <div key={item.key ?? item.label} className={styles.variantGridItem}>
          {item.children}
          <span className={styles.variantGridLabel}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
