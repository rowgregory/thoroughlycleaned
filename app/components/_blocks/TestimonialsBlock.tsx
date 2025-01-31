'use client'

import React, { FC, useRef } from 'react'
import Slider from 'react-slick'
import AwesomeIcon from '../common/AwesomeIcon'
import { arrowLeftIcon, arrowRightIcon } from '@/app/icons'
import SectionHeader from '../common/SectionHeader'
import TestimonialsCarousel from '../testimonials/TestimonialsCarousel'
import EditableTextArea from '../common/EditableTextArea'
import SkeletonLoader from '../app/SkeleonLoader'

const TestimonialsBlock: FC<{ textBlockMap: any; testimonials: any; isLoading: boolean }> = ({ textBlockMap, testimonials, isLoading }) => {
  const slider = useRef<Slider | null>(null)

  return (
    <section className="px-4 py-44 bg-skyAqua relative overflow-hidden">
      <span className="animate-translateYBackForth bg-clearBubbles bg-cover by-cover bg-no-repeat w-40 h-40 absolute top-20 left-20 z-0" />
      <span className="animate-translateYBackForth bg-clearBubbles bg-cover by-cover bg-no-repeat w-96 h-96 absolute top-0 left-1/2 z-0" />
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] w-full mx-auto grid grid-cols-12 gap-y-10 990:gap-x-20">
        <div className="col-span-12 990:col-span-5 relative z-10">
          <SectionHeader
            subtitle={textBlockMap?.testimonialsBlockSubtitle}
            subtitleName="testimonialsBlockSubtitle"
            title={textBlockMap?.testimonialsBlockTitle}
            titleName="testimonialsBlockTitle"
            type="TESTIMONIALS_BLOCK"
            subtitleStyles="text-white"
            titleStyles="text-white"
          />
          <EditableTextArea
            initialValue={textBlockMap?.testimonialsBlockDesc}
            tag="p"
            textBlockKey="testimonialsBlockDesc"
            type="TESTIMONIALS_BLOCK"
            className="text-white mb-7"
          />
          <div className="hidden 990:flex items-center gap-x-2.5">
            <div
              onClick={() => slider?.current?.slickPrev()}
              className="w-12 h-12 bg-sunny rounded-full flex items-center justify-center cursor-pointer"
            >
              <AwesomeIcon icon={arrowLeftIcon} className="w-4 h-4 text-skyAqua" />
            </div>
            <div
              onClick={() => slider?.current?.slickNext()}
              className="w-12 h-12 bg-sunny rounded-full flex items-center justify-center cursor-pointer"
            >
              <AwesomeIcon icon={arrowRightIcon} className="w-4 h-4 text-skyAqua" />
            </div>
          </div>
        </div>
        <div className="col-span-12 990:col-span-7">
          {isLoading ? (
            <SkeletonLoader className="w-full h-[450px]" />
          ) : (
            <TestimonialsCarousel slider={slider} testimonials={testimonials} />
          )}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsBlock
