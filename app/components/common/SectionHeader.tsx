import React, { FC } from 'react'

interface SectionHeaderProps {
  icon: string
  header: string
  title: string
  titleStyles?: string
  headerStyles?: string
}

const SectionHeader: FC<SectionHeaderProps> = ({
  icon,
  header,
  title,
  titleStyles,
  headerStyles
}) => {
  return (
    <>
      <div data-aos="fade-up" className="flex items-center gap-x-3 mb-5 mt-20 990:mt-0">
        <div className={`${icon} bg-no-repeat bg-contain bg-center w-12 h-12`} />
        <h1 className={`${headerStyles} uppercase text-skyAqua poppins-semibold`}>{header}</h1>
      </div>
      <h2
        data-aos="fade-up"
        className={`${titleStyles} poppins-bold text-[26px] md:text-[37px] 990:text-[40px] text-charcoalBlack 990:leading-[50px] mb-9 990:max-w-2xl`}
      >
        {title}
      </h2>
    </>
  )
}

export default SectionHeader
