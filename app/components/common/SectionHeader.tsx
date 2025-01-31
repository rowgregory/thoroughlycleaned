import React, { FC } from 'react'
import EditableTextArea from './EditableTextArea'
import SectionHeaderIcon from '@/app/icons/SectionHeaderIcon'

interface SectionHeaderProps {
  subtitle: string
  subtitleName: string
  title: string
  titleName: string
  type: string
  subtitleStyles?: string
  titleStyles?: string
  sectionStyles?: string
  rows?: number
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
      <div className="flex items-center gap-x-3 mb-1">
        <SectionHeaderIcon />
        <EditableTextArea
          tag="h1"
          initialValue={subtitle}
          type={type}
          textBlockKey={subtitleName}
          className={`${subtitleStyles} uppercase text-skyAqua font-semibold`}
        />
      </div>
      <div className="mb-9">
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
