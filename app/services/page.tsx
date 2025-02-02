'use client'

import React from 'react'
import PageBanner from '../components/common/PageBanner'
import ServiceCard from '../components/services/ServiceCard'
import { useFetchPageSpecificTextBlocksQuery } from '../redux/services/textBlockApi'
import { ServiceCardProps } from '../types/service.types'
import { useFetchServicesQuery } from '../redux/services/serviceApi'
import SkeletonLoader from '../components/app/SkeleonLoader'

const Services = () => {
  const { isLoading: loadingServices, data: service } = useFetchServicesQuery()
  const { isLoading: loadingTextBlocks, data } = useFetchPageSpecificTextBlocksQuery(['SERVICES_PAGE', 'SERVICES_BLOCK'])

  return (
    <>
      <PageBanner
        type="SERVICES_PAGE"
        fileNameKey="servicesPageFile"
        titleNameKey="servicesPageBannerTitle"
        subtitleNameKey="servicesPageBannerSubtitle"
        textBlockMap={data?.transformedTextBlocks}
        isLoading={loadingTextBlocks}
      />
      <div className="px-4 lg:px-14 py-32">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full flex flex-col md:gap-x-12">
          <div className="grid grid-cols-12 gap-y-10 sm:gap-10">
            {loadingServices
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonLoader key={i} className="col-span-12 760:col-span-6 990:col-span-4 w-full h-full shadow-serviceCard" />
                ))
              : service?.services?.map((service: JSX.IntrinsicAttributes & ServiceCardProps, i: number) => (
                  <ServiceCard key={i} {...service} />
                ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Services
