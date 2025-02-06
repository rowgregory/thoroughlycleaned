'use client'

import React, { FC, useRef } from 'react'
import Slider from 'react-slick'
import AwesomeIcon from '../common/AwesomeIcon'
import { arrowLeftIcon, arrowRightIcon } from '@/app/icons'
import SectionHeader from '../common/SectionHeader'
import TestimonialsCarousel from '../testimonials/TestimonialsCarousel'
import EditableTextArea from '../common/EditableTextArea'
import { RootState, useAppSelector } from '@/app/redux/store'
import AbstractCorner2 from '@/app/icons/AbstractCorner2'

const TestimonialsBlock: FC<{ textBlockMap: any }> = ({ textBlockMap }) => {
  const slider = useRef<Slider | null>(null)
  const { testimonials } = useAppSelector((state: RootState) => state.testimonial)

  return (
    <section className="px-4 py-44 bg-neonIce relative overflow-hidden">
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] w-full mx-auto grid grid-cols-12 gap-y-10 990:gap-x-20">
        <div className="col-span-12 990:col-span-5 relative z-10">
          <SectionHeader
            subtitle={textBlockMap?.testimonialsBlockSubtitle}
            subtitleName="testimonialsBlockSubtitle"
            title={textBlockMap?.testimonialsBlockTitle}
            titleName="testimonialsBlockTitle"
            type="TESTIMONIALS_BLOCK"
            subtitleStyles="text-white"
            titleStyles="text-white text-center 480:text-left"
            sectionStyles="flex flex-col justify-center items-center 1200:items-start"
          />
          <EditableTextArea
            initialValue={textBlockMap?.testimonialsBlockDesc}
            tag="p"
            textBlockKey="testimonialsBlockDesc"
            type="TESTIMONIALS_BLOCK"
            className="text-white font-medium mb-10 text-center 480:text-left"
          />
          <div className="hidden 990:flex items-center gap-x-2.5">
            <div
              onClick={() => slider?.current?.slickPrev()}
              className="w-12 h-12 bg-stealthGray rounded-full flex items-center justify-center cursor-pointer group overflow-hidden"
            >
              <AwesomeIcon
                icon={arrowLeftIcon}
                className="w-4 h-4 text-neonIce absolute translate-x-8 group-hover:-translate-x-0 duration-300 linear"
              />
              <AwesomeIcon
                icon={arrowLeftIcon}
                className="w-4 h-4 text-neonIce absolute translate-x-0 group-hover:-translate-x-8 duration-300 linear"
              />
            </div>
            <div
              onClick={() => slider?.current?.slickNext()}
              className="w-12 h-12 bg-stealthGray relative z-10 rounded-full flex items-center justify-center cursor-pointer group overflow-hidden"
            >
              <AwesomeIcon
                icon={arrowRightIcon}
                className="w-4 h-4 text-neonIce absolute -translate-x-8 group-hover:translate-x-0 duration-300 linear"
              />
              <AwesomeIcon
                icon={arrowRightIcon}
                className="w-4 h-4 text-neonIce absolute translate-x-0 group-hover:translate-x-8 duration-300 linear"
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 990:col-span-7 relative z-10">
          <TestimonialsCarousel slider={slider} testimonials={testimonials} />
        </div>
      </div>
      <div className="absolute top-0 right-0 z-0">
        <AbstractCorner2 />
      </div>
    </section>
  )
}

export default TestimonialsBlock
