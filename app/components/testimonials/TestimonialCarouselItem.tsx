import React, { FC } from 'react'

interface TestimonialCarouselItemProps {
  testimonial: { text: string; name: string }
}

const TestimonialCarouselItem: FC<TestimonialCarouselItemProps> = ({ testimonial }) => {
  return (
    <div className="bg-white px-5 990:px-10 py-8 sm:py-16 flex flex-col gap-y-6 relative">
      <h4 className="poppins-regular text-17 text-gray-700 leading-7">
        &quot;{testimonial.text}&quot;
      </h4>
      <h5 className="poppins-bold text-xl text-jetBlack">{testimonial.name}</h5>
      <div className="bg-quotations bg-cover bg-center bg-no-repeat w-16 h-16 absolute bottom-2 right-3" />
    </div>
  )
}

export default TestimonialCarouselItem
