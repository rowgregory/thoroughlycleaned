'use client'

import React, { useRef } from 'react'
import Slider from 'react-slick'
import AwesomeIcon from '../common/AwesomeIcon'
import { arrowLeftIcon, arrowRightIcon } from '@/app/icons'
import SectionHeader from '../common/SectionHeader'
import TestimonialsCarousel from '../testimonials/TestimonialsCarousel'

const Testimonials = () => {
  const slider = useRef<Slider | null>(null)

  return (
    <section className="px-4 py-28 bg-skyAqua relative overflow-hidden">
      <span className="animate-translateYBackForth bg-clearBubbles bg-cover by-cover bg-no-repeat w-40 h-40 absolute top-20 left-20 z-0" />
      <span className="animate-translateYBackForth bg-clearBubbles bg-cover by-cover bg-no-repeat w-96 h-96 absolute top-0 left-1/2 z-0" />
      <div className="max-w-2xl 990:max-w-screen-xl w-full mx-auto grid grid-cols-12 gap-y-10 990:gap-x-20">
        <div className="col-span-12 990:col-span-5">
          <SectionHeader
            icon="bg-brush"
            header="Testimonials"
            title="What Our Clients Say About Us"
            titleStyles="text-white"
            headerStyles="text-sunny"
          />
          <h3 data-aos="fade-up" className="poppins-regular text-white mb-10">
            Discover why our clients trust us for exceptional cleaning services every time.
          </h3>
          <div data-aos="fade-up" className="hidden 990:flex items-center gap-x-2.5">
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
        <div data-aos="fade-up" className="col-span-12 990:col-span-7">
          <TestimonialsCarousel slider={slider} />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
