'use client'

import React from 'react'
import Link from 'next/link'
import TestimonialsTable from '@/app/tables/TestimonialsTable'
import { useAppDispatch } from '@/app/redux/store'
import { resetTestimonial } from '@/app/redux/features/testimonialSlice'

const Testimonials = () => {
  const dispatch = useAppDispatch()
  return (
    <div className="p-6 shadow-neu bg-iconShadow">
      <div className="mb-5 w-full flex items-center flex-row justify-between">
        <h1 className="text-lg rubik-bold text-midnightPlum">Testimonials Table</h1>
        <Link
          onClick={() => dispatch(resetTestimonial())}
          href="/admin/testimonials/create"
          className="py-3 px-4 rounded-[4px] bg-neonSkyAqua text-white shadow-submit text-sm rubik-thin tracking-wide"
        >
          Create Testimonial
        </Link>
      </div>
      <TestimonialsTable />
    </div>
  )
}

export default Testimonials
