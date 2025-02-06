'use client'

import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import ServiceCarouselSlide from './ServiceCarouselSlide'
import { ServiceNextArrow, ServicePrevArrow } from './CarouselButtons'
import { serviceCarouselSettings } from '@/public/data/slider.settings'

const ServiceCarousel = ({ services }: any) => {
  const [currentSlide, setCurrentSlide] = useState(1)
  const slider = useRef<Slider | null>(null)

  return (
    <div className="w-full relative">
      {services?.length > 1 && <ServicePrevArrow onClick={() => slider?.current?.slickPrev()} />}
      <Slider ref={slider} {...serviceCarouselSettings(services, setCurrentSlide)}>
        {services?.map((item: any, i: number) => (
          <ServiceCarouselSlide key={i} currentSlide={currentSlide} index={i} item={item} />
        ))}
      </Slider>
      {services?.length > 1 && <ServiceNextArrow onClick={() => slider?.current?.slickNext()} />}
    </div>
  )
}

export default ServiceCarousel
