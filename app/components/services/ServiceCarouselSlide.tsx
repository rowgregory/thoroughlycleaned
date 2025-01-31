import Link from 'next/link'
import React, { FC } from 'react'
import Picture from '../common/Picture'
import AwesomeIcon from '../common/AwesomeIcon'
import { arrowRightIcon } from '@/app/icons'
import { truncateString } from '@/app/utils/string.functions'

interface ServiceCarouselSlideProps {
  currentSlide: number
  index: number
  item: { name: string; description: string; url: string }
}

const ServiceCarouselSlide: FC<ServiceCarouselSlideProps> = ({ currentSlide, index, item }) => {
  const getSlideClass = (index: number) => {
    return index === currentSlide ? 'bg-white 990:bg-skyAqua 990:text-white' : 'bg-white'
  }

  return (
    <Link
      href="/services"
      className={`${getSlideClass(
        index
      )} cursor-pointer flex flex-col items-center justify-between py-10 px-7 h-[475px] border-1 border-gray-200`}
    >
      <div className="flex flex-col justify-center items-center">
        <span
          className={`border-4 ${
            index === currentSlide ? 'border-sunny' : 'border-skyAqua'
          } p-1 h-44 w-44 rounded-full flex items-center justify-center mb-7`}
        >
          <Picture
            src={item.url}
            alt="Thoroughlycleanedma@gmail.com"
            className="object-cover rounded-full aspect-square w-40 h-40"
            priority={false}
          />
        </span>
        <span className="font-black text-2xl text-center duration-300 hover:text-sunny h-16 mb-1.5">{truncateString(item.name, 25)}</span>
        <p className="text-center mb-10">{truncateString(item.description, 75)}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <h5 className="font-medium">Read More</h5>
        <span className="w-7 h-7 rounded-full bg-sunny flex items-center justify-center">
          <AwesomeIcon icon={arrowRightIcon} className="text-skyAqua w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}

export default ServiceCarouselSlide
