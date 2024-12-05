import React, { FC } from 'react'

interface SectionHeaderProps {
  icon: string
  header: string
  title: string
}

const SectionHeader: FC<SectionHeaderProps> = ({ icon, header, title }) => {
  return (
    <>
      <div className="flex items-center gap-x-3 mb-5 mt-20 990:mt-0">
        <div className={`${icon} bg-no-repeat bg-contain bg-center w-12 h-12`} />
        <h1 className="uppercase text-skyAqua poppins-semibold">{header}</h1>
      </div>
      <h2 className="poppins-bold text-center 990:text-left text-[37px] 990:text-[40px] text-[#111111] leading-[50px] mb-9">
        {title}
      </h2>
    </>
  )
}

export default SectionHeader
