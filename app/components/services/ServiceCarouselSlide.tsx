import React, { FC } from 'react'

interface ServiceCarouselSlideProps {
  currentSlide: number
  index: number
  item: { name: string; description: string }
}

const ServiceCarouselSlide: FC<ServiceCarouselSlideProps> = ({ currentSlide, index, item }) => {
  const getSlideClass = (index: number) => {
    return index === currentSlide ? 'bg-white 1200:bg-skyAqua' : 'bg-white'
  }

  return (
    <div
      className={`${getSlideClass(
        index
      )} flex flex-col items-center justify-center py-10 990:py-16 px-7 h-[475px] border-1 border-gray-200`}
    >
      <div className="bg-sunny rounded-full w-20 h-20 mb-8"></div>
      <span className="poppins-bold text-[21px] mb-5 text-center">{item.name}</span>
      <h4 className="poppins-light text-sm 990:text-base mb-10 text-center leading-7">
        {item.description}
      </h4>
      <h5 className="poppins-medium">Read More</h5>
    </div>
  )
}

export default ServiceCarouselSlide
