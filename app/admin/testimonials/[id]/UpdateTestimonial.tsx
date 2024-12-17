'use client'

import React, { FormEvent } from 'react'
import TestimonialsForm from '@/app/forms/TestimonialForm'
import useForm from '@/app/hooks/useForm'
import {
  useFetchTestimonialQuery,
  useUpdateTestimonialMutation
} from '@/app/redux/services/testimonialApi'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useRouter } from 'next/navigation'

const UpdateTestimonial = ({ id }: { id: string }) => {
  const navigate = useRouter()
  const [updateTestimonial] = useUpdateTestimonialMutation()
  const { testimonial } = useAppSelector((state: RootState) => state.testimonial)

  const { inputs, handleInput } = useForm(['id', 'name', 'review', 'reviewTitle'], testimonial)

  useFetchTestimonialQuery(id, { refetchOnMountOrArgChange: true })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const response = await updateTestimonial(inputs).unwrap()

    if (response.success) navigate.push('/admin/testimonials')
  }

  return <TestimonialsForm handleSubmit={handleSubmit} handleInput={handleInput} inputs={inputs} />
}

export default UpdateTestimonial
