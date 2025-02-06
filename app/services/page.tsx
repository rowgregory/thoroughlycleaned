'use client'

import React from 'react'
import PageBanner from '../components/common/PageBanner'
import ServiceCard from '../components/services/ServiceCard'
import { ServiceCardProps } from '../types/service.types'
import { RootState, useAppSelector } from '../redux/store'

const Services = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { services } = useAppSelector((state: RootState) => state.service)

  return (
    <>
      <PageBanner
        type="SERVICES_PAGE"
        fileNameKey="servicesPageFile"
        titleNameKey="servicesPageBannerTitle"
        subtitleNameKey="servicesPageBannerSubtitle"
        textBlockMap={textBlockMap}
      />
      <div className="px-4 lg:px-14 py-32">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full grid grid-cols-12 gap-y-10 sm:gap-10">
          {services?.map((service: JSX.IntrinsicAttributes & ServiceCardProps, i: number) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Services
