import React, { FC, RefObject } from 'react'
import Slider from 'react-slick'
import { testimonials } from '@/public/data/home.data'
import TestimonialCarouselItem from './TestimonialCarouselItem'

interface TestimonialsCarouselProps {
  slider: RefObject<Slider>
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: false,
  autoplay: true,
  autoplaySpeed: 5000
}

const TestimonialsCarousel: FC<TestimonialsCarouselProps> = ({ slider }) => {
  return (
    <Slider ref={slider} {...settings}>
      {testimonials.map((testimonial, i) => (
        <TestimonialCarouselItem key={i} testimonial={testimonial} />
      ))}
    </Slider>
  )
}

export default TestimonialsCarousel
