'use client'

import TestimonialsForm from '@/app/forms/TestimonialForm'
import useForm from '@/app/hooks/useForm'
import { useCreateTestimonialMutation } from '@/app/redux/services/testimonialApi'
import validateTestimonialForm from '@/app/validations/validateTestimonialForm'
import { TESTIMONIAL_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import { useRouter } from 'next/navigation'
import React from 'react'

const CreateTestimonial = () => {
  const { push } = useRouter()
  const { inputs, handleInput, setErrors, errors } = useForm(TESTIMONIAL_INITIAL_FIELDS)
  const [createTestimonial, { isLoading: loadingCreate }] = useCreateTestimonialMutation()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const isValid = validateTestimonialForm(inputs, setErrors)
    if (isValid) {
      await createTestimonial(inputs)
        .unwrap()
        .then(() => push('/admin/testimonials'))
        .catch((err: any) => console.log(err))
    }
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
          errors={errors}
          loading={loadingCreate}
        />
      </div>
    </section>
  )
}

export default CreateTestimonial
