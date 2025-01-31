'use client'

import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import ServiceCarouselSlide from './ServiceCarouselSlide'
import { serviceCarouselSettings } from '@/public/data/carousel.data'
import { ServiceNextArrow, ServicePrevArrow } from './CarouselButtons'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ServiceCarousel = ({ services }: any) => {
  const [currentSlide, setCurrentSlide] = useState(1)
  const slider = useRef<Slider | null>(null)

  return (
    <div className="w-full relative">
      {services?.length > 1 && <ServicePrevArrow onClick={() => slider?.current?.slickPrev()} />}
      <div data-aos="fade-up">
        <Slider ref={slider} {...serviceCarouselSettings(services, setCurrentSlide)}>
          {services?.map((item: any, i: number) => (
            <ServiceCarouselSlide key={i} currentSlide={currentSlide} index={i} item={item} />
          ))}
        </Slider>
      </div>
      {services?.length > 1 && <ServiceNextArrow onClick={() => slider?.current?.slickNext()} />}
    </div>
  )
}

export default ServiceCarousel
