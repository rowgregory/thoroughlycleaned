import React, { FC, RefObject } from 'react'
import Slider from 'react-slick'
import TestimonialCarouselItem from './TestimonialCarouselItem'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface TestimonialsCarouselProps {
  slider: RefObject<Slider>
  testimonials: any
}

const settings = () => ({
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: false,
  autoplay: true,
  autoplaySpeed: 5000
})

const TestimonialsCarousel: FC<TestimonialsCarouselProps> = ({ slider, testimonials }) => {
  return (
    <Slider ref={slider} {...settings()}>
      {testimonials?.map((testimonial: any, i: number) => (
        <TestimonialCarouselItem key={i} testimonial={testimonial} />
      ))}
    </Slider>
  )
}

export default TestimonialsCarousel
