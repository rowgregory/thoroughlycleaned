'use client'

import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import AwesomeIcon from '../common/AwesomeIcon'
import { arrowLeftIcon, arrowRightIcon } from '../../icons'
import ServiceCarouselSlide from './ServiceCarouselSlide'
import { services } from '@/public/data/home.data'

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="hidden 2xl:flex items-center justify-center absolute z-10 left-[-80px] top-1/2 bg-sunny rounded-full w-12 h-12
    transform -translate-y-1/2  opacity-0 translate-x-20 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
  >
    <AwesomeIcon icon={arrowLeftIcon} className="text-skyAqua w-4 h-4" />
  </button>
)

const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="hidden 2xl:flex items-center justify-center absolute z-10 right-[-80px] top-1/2 bg-sunny rounded-full w-12 h-12
    transform -translate-y-1/2  opacity-0 -translate-x-20 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
  >
    <AwesomeIcon icon={arrowRightIcon} className="text-skyAqua w-4 h-4" />
  </button>
)

const ServiceCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1)
  const slider = useRef<Slider | null>(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: false,
    beforeChange: (oldIndex: number, newIndex: number) => {
      // Calculate the middle slide for the new index
      // Calculate the index of the middle slide
      const middleIndex = Math.floor(3 / 2)
      let newMiddleIndex = newIndex + middleIndex

      // Adjust the new middle index to stay within valid bounds
      if (newMiddleIndex >= services.length) {
        newMiddleIndex = newMiddleIndex - services.length
      }

      setCurrentSlide(newMiddleIndex)
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 684,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  }

  return (
    <div className="w-full relative">
      <PrevArrow onClick={() => slider?.current?.slickPrev()} />
      <div data-aos="fade-up">
        <Slider ref={slider} {...settings}>
          {services.map((item, i) => (
            <ServiceCarouselSlide key={i} currentSlide={currentSlide} index={i} item={item} />
          ))}
        </Slider>
      </div>
      <NextArrow onClick={() => slider?.current?.slickNext()} />
    </div>
  )
}

export default ServiceCarousel
