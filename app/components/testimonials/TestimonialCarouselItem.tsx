import React, { FC } from 'react'

interface TestimonialCarouselItemProps {
  testimonial: { review: string; reviewTitle: string; name: string }
}

const TestimonialCarouselItem: FC<TestimonialCarouselItemProps> = ({ testimonial }) => {
  return (
    <div className="bg-white px-5 990:px-10 py-8 sm:py-16 flex flex-col relative justify-between">
      <div>
        <h3 className="font-bold text-2xl text-jetBlack mb-3 tracking-wider">{testimonial?.reviewTitle}</h3>
        <h4 className="text-17 text-gray-700 leading-7 mb-6 min-h-44">&quot;{testimonial?.review}&quot;</h4>
      </div>
      <h5 className="font-bold text-jetBlack mb-4">{testimonial?.name}</h5>
      <div className="bg-quotations bg-cover bg-center bg-no-repeat w-16 h-16 flex self-end" />
    </div>
  )
}

export default TestimonialCarouselItem
