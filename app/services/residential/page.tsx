'use client'

import React from 'react'
import BubbleBtn from '@/app/components/common/BubbleBtn'
import PageBanner from '@/app/components/common/PageBanner'
import SectionHeader from '../../components/common/SectionHeader'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { Service } from '@/app/redux/features/serviceSlice'
import ServiceCard from '@/app/components/services/ServiceCard'
import EditableImage from '@/app/components/common/EditableImage'
import EditableTextArea from '@/app/components/common/EditableTextArea'
import { setOpenModalClientLeadPublic } from '@/app/redux/features/appSlice'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import AbstractCorner1 from '@/app/icons/AbstractCorner1'

const Residential = () => {
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const serviceType = path.split('/')[2]
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)
  const { services } = useAppSelector((state: RootState) => state.service)
  const filteredServices = services?.filter((service: any) => service.serviceType.toLowerCase() === serviceType)

  return (
    <>
      <PageBanner
        type="SERVICE_RESIDENTIAL_PAGE"
        fileNameKey="serviceResidentialBannerFile"
        titleNameKey="serviceResidentialBannerTitle"
        subtitleNameKey="serviceResidentialBannerSubtitle"
        textBlockMap={textBlockMap}
      />
      <div className="px-4 lg:px-12 xl:px-4 py-32 relative">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full grid grid-cols-12 gap-y-10 990:gap-x-10">
          <div className="order-2 990:order-1 flex items-center justify-center col-span-12 990:col-span-6">
            <EditableImage
              src={textBlockMap?.SERVICE_RESIDENTIAL_PAGE?.serviceResidentialFile?.value}
              type="SERVICE_RESIDENTIAL_PAGE"
              textBlockKey="serviceResidentialFile"
              className="w-full h-full aspect-video 990:aspect-square hidden 480:block"
              priority={false}
            />
          </div>
          <div className="order-1 990:order-2 col-span-12 990:col-span-6 flex justify-center flex-col h-full">
            <SectionHeader
              subtitle={textBlockMap?.SERVICE_RESIDENTIAL_PAGE?.serviceResidentialSubtitle}
              subtitleName="serviceResidentialSubtitle"
              title="Bringing comfort and cleanliness to your doorstep."
              titleName={textBlockMap?.SERVICE_RESIDENTIAL_PAGE?.serviceResidentialTitle}
              type="SERVICE_RESIDENTIAL_PAGE"
            />
            <EditableTextArea
              tag="p"
              initialValue={textBlockMap?.SERVICE_RESIDENTIAL_PAGE?.serviceResidentialDescription}
              type="SERVICE_RESIDENTIAL_PAGE"
              textBlockKey="serviceResidentialDescription"
              className="mb-12 text-gray-800"
            />
            <div onClick={() => dispatch(setOpenModalClientLeadPublic())} className="760:w-60 w-full cursor-pointer">
              <BubbleBtn bubbleColor="bg-iceberg" text="Contact Us" />
            </div>
          </div>
        </div>
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full grid grid-cols-12 gap-y-10 sm:gap-10 mt-14">
          {filteredServices?.map((service: Service, i: number) => (
            <ServiceCard key={i} {...service} />
          ))}
        </div>
        <div className="absolute bottom-0 right-0">
          <AbstractCorner1 />
        </div>
      </div>
    </>
  )
}

export default Residential
