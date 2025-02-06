'use client'

import React from 'react'
import PageBanner from '../components/common/PageBanner'
import TestimonialsBlock from '../components/_blocks/TestimonialsBlock'
import { RootState, useAppSelector } from '../redux/store'

const Testimonials = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <>
      <PageBanner
        type="TESTIMONIALS_PAGE"
        fileNameKey="testimonialsBannerFile"
        titleNameKey="testimonialsBannerTitle"
        subtitleNameKey="testimonialsBannerSubtitle"
        textBlockMap={textBlockMap}
      />
      <TestimonialsBlock textBlockMap={textBlockMap?.TESTIMONIALS_BLOCK} />
    </>
  )
}

export default Testimonials
