'use client'

import React, { FC, useRef, useState } from 'react'
import Slider from 'react-slick'
import AwesomeIcon from './common/AwesomeIcon'
import { arrowLeftIcon, arrowRightIcon } from '../icons'

interface ServiceCarouselProps {
  items: any[]
}

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

const ServiceCarousel: FC<ServiceCarouselProps> = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(1)
  const slider = useRef<Slider | null>(null)

  const getSlideClass = (index: number) => {
    return index === currentSlide ? 'bg-white 1200:bg-skyAqua' : 'bg-white'
  }

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
      if (newMiddleIndex >= items.length) {
        newMiddleIndex = newMiddleIndex - items.length
      }

      setCurrentSlide(newMiddleIndex)
    },
    responsive: [
      {
        breakpoint: 1200, // Less than 1200px
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
    <div className="slider-container w-full relative">
      <PrevArrow onClick={() => slider?.current?.slickPrev()} />
      <Slider ref={slider} {...settings}>
        {items.map((item: any, index: number) => (
          <div
            key={index}
            className={`${getSlideClass(
              index
            )} flex flex-col items-center py-16 px-7 h-[475px] border-1 border-gray-200`}
          >
            <div className="bg-sunny rounded-full w-20 h-20 mb-8"></div>
            <h3 className="poppins-bold text-[21px] mb-5">{item.name}</h3>
            <h4 className="poppins-light text-sm 990:text-base mb-10 text-center leading-7">
              {item.description}
            </h4>
            <h5 className="poppins-medium">Read More</h5>
          </div>
        ))}
      </Slider>
      <NextArrow onClick={() => slider?.current?.slickNext()} />
    </div>
  )
}

export default ServiceCarousel
