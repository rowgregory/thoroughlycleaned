'use client'

import React from 'react'
import SectionHeader from '../common/SectionHeader'
import ServiceCarousel from '../services/ServiceCarousel'
import Link from 'next/link'
import EditableTextArea from '../common/EditableTextArea'
import AbstractCircles1 from '@/app/icons/AbstractCircles1'
import { RootState, useAppSelector } from '@/app/redux/store'

const ServicesBlock = ({ textBlockMap }: any) => {
  const { services } = useAppSelector((state: RootState) => state.service)
  if (services?.length === 0) return

  return (
    <section className="bg-iceMist px-4 py-32 group relative">
      <div className="absolute bottom-0 left-0 z-0">
        <AbstractCircles1 />
      </div>
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full grid grid-cols-12 gap-y-8 md:gap-x-12">
        <div className="col-span-12 w-full">
          <SectionHeader
            subtitle={textBlockMap?.servicesBlockSubtitle}
            subtitleName="servicesBlockSubtitle"
            title={textBlockMap?.servicesBlockTitle}
            titleName="servicesBlockTitle"
            type="SERVICES_BLOCK"
            subtitleStyles="text-center"
            titleStyles="text-center"
            sectionStyles="flex flex-col justify-center items-center"
          />

          <ServiceCarousel services={services} />
          <div className="flex flex-col relative z-10 480:flex-row text-center 480:text-left items-center justify-center gap-y-2 480:gap-y-0 gap-x-2 mt-16">
            <EditableTextArea
              tag="h5"
              initialValue={textBlockMap?.servicesBlockLinkText}
              type="SERVICES_BLOCK"
              textBlockKey="servicesBlockLinkText"
              className="text-stealthGray font-semibold text-15"
            />
            <Link href="/services" className="text-neonIce font-semibold hover:underline">
              Explore All Options
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesBlock
