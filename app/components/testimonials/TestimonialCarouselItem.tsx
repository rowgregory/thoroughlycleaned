import Quotes from '@/app/icons/Quotes'
import React, { FC } from 'react'
import Picture from '../common/Picture'

interface TestimonialCarouselItemProps {
  testimonial: { review: string; reviewTitle: string; name: string }
}

const TestimonialCarouselItem: FC<TestimonialCarouselItemProps> = ({ testimonial }) => {
  return (
    <div className="bg-white flex relative justify-center h-auto 990:min-h-[375px]">
      <div className="hidden 1200:flex 1200:flex-shrink-0">
        <Picture src="/images/testimonial-4.png" priority={false} className="h-full w-[250px] object-cover" />
      </div>
      <div className="px-8 py-10 w-full flex flex-col justify-between min-h-56 h-full">
        <h4 className="text-17 text-stealthGray font-medium leading-7 mb-3 min-h-36">&quot;{testimonial?.review}&quot;</h4>
        <h5 className="font-bold text-xl text-stealthGray">{testimonial?.name}</h5>
      </div>
      <div className="absolute bottom-10 right-10">
        <Quotes />
      </div>
    </div>
  )
}

export default TestimonialCarouselItem
