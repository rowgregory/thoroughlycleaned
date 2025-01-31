'use client'

import React from 'react'
import PageBanner from '../components/common/PageBanner'
import TestimonialsBlock from '../components/_blocks/TestimonialsBlock'
import { useFetchTestimonialsQuery } from '../redux/services/testimonialApi'
import { useFetchPageSpecificTextBlocksQuery } from '../redux/services/textBlockApi'

const Testimonials = () => {
  const { isLoading: loadingTestimonials, data: testimonial } = useFetchTestimonialsQuery()
  const { isLoading: loadingTextBlocks, data: textBlock } = useFetchPageSpecificTextBlocksQuery(['TESTIMONIALS_PAGE', 'TESTIMONIALS_BLOCK'])

  return (
    <>
      <PageBanner
        type="TESTIMONIALS_PAGE"
        fileNameKey="testimonialsBannerFile"
        titleNameKey="testimonialsBannerTitle"
        subtitleNameKey="testimonialsBannerSubtitle"
        textBlockMap={textBlock?.transformedTextBlocks}
        isLoading={loadingTextBlocks}
      />
      <TestimonialsBlock
        textBlockMap={textBlock?.transformedTextBlocks?.TESTIMONIALS_BLOCK}
        testimonials={testimonial?.testimonials}
        isLoading={loadingTestimonials}
      />
    </>
  )
}

export default Testimonials
