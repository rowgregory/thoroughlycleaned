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
import { TESTIMONIAL_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import Loading from '../loading'
import validateTestimonialForm from '@/app/validations/validateTestimonialForm'

const UpdateTestimonial = ({ id }: { id: string }) => {
  const { push } = useRouter()
  const [updateTestimonial, { isLoading: loadingUpdate }] = useUpdateTestimonialMutation()
  const { testimonial } = useAppSelector((state: RootState) => state.testimonial)

  const { inputs, handleInput, setErrors, errors } = useForm(
    TESTIMONIAL_INITIAL_FIELDS,
    testimonial
  )

  const { isLoading } = useFetchTestimonialQuery(id)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isValid = validateTestimonialForm(inputs, setErrors)
    if (isValid) {
      await updateTestimonial(inputs)
        .unwrap()
        .then(() => push('/admin/testimonials'))
        .catch((err: any) => console.log(err))
    }
  }

  if (isLoading) return <Loading />

  return (
    <TestimonialsForm
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      inputs={inputs}
      errors={errors}
      loading={loadingUpdate}
    />
  )
}

export default UpdateTestimonial
