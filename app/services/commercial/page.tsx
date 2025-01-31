'use client'

import React from 'react'
import BubbleBtn from '@/app/components/common/BubbleBtn'
import PageBanner from '@/app/components/common/PageBanner'
import { useAppDispatch } from '@/app/redux/store'
import SectionHeader from '../../components/common/SectionHeader'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { Service } from '@/app/redux/features/serviceSlice'
import ServiceCard from '@/app/components/services/ServiceCard'
import EditableImage from '@/app/components/common/EditableImage'
import EditableTextArea from '@/app/components/common/EditableTextArea'
import { useFetchPageSpecificTextBlocksQuery } from '@/app/redux/services/textBlockApi'
import { useFetchServicesByTypeQuery } from '@/app/redux/services/serviceApi'
import { setOpenModalClientLeadPublic } from '@/app/redux/features/appSlice'
import SkeletonLoader from '@/app/components/app/SkeleonLoader'

const Commercial = () => {
  const dispatch = useAppDispatch()
  const path = useCustomPathname()
  const serviceType = path.split('/')[2]
  const { isLoading: loadingServices, data: services } = useFetchServicesByTypeQuery(serviceType)
  const { isLoading: loadingTextBlocks, data: textBlockMap } = useFetchPageSpecificTextBlocksQuery(['SERVICE_COMMERCIAL_PAGE'])

  return (
    <>
      <PageBanner
        type="SERVICE_COMMERCIAL_PAGE"
        fileNameKey="serviceCommercialBannerFile"
        titleNameKey="serviceCommercialBannerTitle"
        subtitleNameKey="serviceCommercialBannerSubtitle"
        textBlockMap={textBlockMap?.transformedTextBlocks}
        isLoading={loadingTextBlocks}
      />
      <div className="px-4 lg:px-12 xl:px-4 py-32 relative">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full grid grid-cols-12 gap-y-10 990:gap-x-10">
          <div className="order-2 990:order-1 flex items-center justify-center col-span-12 990:col-span-6">
            {loadingTextBlocks ? (
              <SkeletonLoader className="w-full h-full aspect-video 990:aspect-square" />
            ) : (
              <EditableImage
                src={textBlockMap?.transformedTextBlocks?.SERVICE_COMMERCIAL_PAGE?.serviceCommercialFile?.value}
                type="SERVICE_COMMERCIAL_PAGE"
                textBlockKey="serviceCommercialFile"
                className="w-full object-cover h-full aspect-video 990:aspect-square"
                priority={false}
              />
            )}
          </div>
          <div className="order-1 990:order-2 col-span-12 990:col-span-6 flex justify-center flex-col h-full">
            <SectionHeader
              subtitle={textBlockMap?.transformedTextBlocks?.SERVICE_COMMERCIAL_PAGE?.serviceCommercialSubtitle}
              subtitleName="serviceCommercialSubtitle"
              title={textBlockMap?.transformedTextBlocks?.SERVICE_COMMERCIAL_PAGE?.serviceCommercialTitle}
              titleName="serviceCommercialTitle"
              type="SERVICE_COMMERCIAL_PAGE"
            />
            <EditableTextArea
              tag="p"
              initialValue={textBlockMap?.transformedTextBlocks?.SERVICE_COMMERCIAL_PAGE?.serviceCommercialDescription}
              type="SERVICE_COMMERCIAL_PAGE"
              textBlockKey="serviceCommercialDescription"
              className="poppins-regular mb-12 text-gray-800"
            />
            <div onClick={() => dispatch(setOpenModalClientLeadPublic())} className="760:w-60 w-full cursor-pointer">
              <BubbleBtn bubbleColor="bg-sunny" text="Contact Us" />
            </div>
          </div>
        </div>
        <div className="mmax-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full grid grid-cols-12 gap-y-10 sm:gap-10 mt-14">
          {loadingServices
            ? Array.from({ length: 3 }).map((_, i) => (
                <SkeletonLoader key={i} className="col-span-12 760:col-span-6 990:col-span-4 shadow-serviceCard" />
              ))
            : services?.services?.map((service: Service, i: number) => <ServiceCard key={i} {...service} />)}
        </div>
      </div>
    </>
  )
}

export default Commercial
