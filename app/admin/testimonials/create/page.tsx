'use client'

import TestimonialsForm from '@/app/forms/TestimonialForm'
import useForm from '@/app/hooks/useForm'
import { useCreateTestimonialMutation } from '@/app/redux/services/testimonialApi'
import { useRouter } from 'next/navigation'
import React from 'react'

const CreateTestimonial = () => {
  const navigate = useRouter()
  const { inputs, handleInput } = useForm(['name', 'review', 'reviewTitle'])
  const [createTestimonial] = useCreateTestimonialMutation()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const response = await createTestimonial(inputs).unwrap()

    if (response.success) navigate.push('/admin/testimonials')
  }

  return (
    <section className="grid grid-cols-12 gap-x-7">
      <div className="col-span-12 shadow-neu bg-iconShadow p-6 rounded-lg">
        <h1 className="text-lg mb-9 rubik-bold text-midnightPlum">Create Testimonial</h1>
        <TestimonialsForm
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          inputs={inputs}
          isCreate={true}
        />
      </div>
    </section>
  )
}

export default CreateTestimonial
