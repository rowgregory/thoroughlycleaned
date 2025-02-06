import React, { FC } from 'react'
import EditableTextArea from './EditableTextArea'
import Picture from './Picture'

interface SectionHeaderProps {
  subtitle: string
  subtitleName: string
  title: string
  titleName: string
  type: string
  subtitleStyles?: string
  titleStyles?: string
  sectionStyles?: string
}

const SectionHeader: FC<SectionHeaderProps> = ({
  subtitle,
  subtitleName,
  title,
  titleName,
  type,
  subtitleStyles,
  titleStyles,
  sectionStyles
}) => {
  return (
    <section className={sectionStyles}>
      <div className="flex flex-col 400:flex-row items-start 400:items-center gap-x-3 mb-1">
        <Picture src="/images/logo-bubble-transparent.png" priority={false} className="w-20 h-20 object-contain animate-scaleBackForth" />
        <EditableTextArea
          tag="h1"
          initialValue={subtitle}
          type={type}
          textBlockKey={subtitleName}
          className={`${subtitleStyles} uppercase font-semibold text-iceberg`}
        />
      </div>
      <div className="mb-7">
        <EditableTextArea
          tag="h2"
          initialValue={title}
          type={type}
          textBlockKey={titleName}
          className={`${titleStyles} font-bold text-[32px] md:text-[37px] 990:text-[40px] text-charcoalBlack 990:leading-[50px] 990:max-w-4xl`}
        />
      </div>
    </section>
  )
}

export default SectionHeader
