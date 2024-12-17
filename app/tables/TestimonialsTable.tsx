'use client'

import React, { MouseEvent } from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import {
  useDeleteTestimonialMutation,
  useFetchTestimonialsQuery
} from '../redux/services/testimonialApi'
import TestimonialRow from './rows/TestimonialRow'
import TestimonialHead from './heads/TestimonialHead'
import Loading from '../admin/loading'

const TestimonialsTable = () => {
  const { filteredArray } = useAppSelector((state: RootState) => state.dashboard)
  const { isLoading } = useFetchTestimonialsQuery({ refetchOnMountOrArgChange: true })
  const [deleteTestimonial] = useDeleteTestimonialMutation()

  const handleDelete = async (e: MouseEvent<HTMLSpanElement>, id: number) => {
    e.preventDefault()
    await deleteTestimonial(id).unwrap()
  }

  if (isLoading) return <Loading />

  return (
    <table className="w-full">
      <TestimonialHead />
      <tbody>
        {filteredArray?.map((testimonial: any, i) => (
          <TestimonialRow
            key={i}
            data={testimonial}
            onDelete={handleDelete}
            filteredArray={filteredArray}
            i={i}
          />
        ))}
      </tbody>
    </table>
  )
}

export default TestimonialsTable
