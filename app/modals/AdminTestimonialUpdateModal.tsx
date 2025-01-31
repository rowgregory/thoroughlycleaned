import React from 'react'
import { useUpdateTestimonialMutation } from '../redux/services/testimonialApi'
import useForm from '../hooks/useForm'
import { TESTIMONIAL_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validateTestimonialForm from '../validations/validateTestimonialForm'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setCloseModalTestimonialUpdate } from '../redux/features/testimonialSlice'
import AdminITestimonialForm from '../forms/AdminTestimonialForm'
import AdminModal from '../components/common/AdminModal'
import AdminModalClostBtn from '../components/admin/AdminModalClostBtn'

const AdminTestimonialUpdateModal = () => {
  const dispatch = useAppDispatch()
  const [updateTestimonial, { isLoading, error }] = useUpdateTestimonialMutation()
  const { testimonial, openModalTestimonialUpdate } = useAppSelector((state: RootState) => state.testimonial)
  const { inputs, errors, handleInput, handleSelect, setInputs, setErrors, submitted, setSubmitted } = useForm(
    TESTIMONIAL_INITIAL_FIELDS,
    validateTestimonialForm,
    testimonial
  )

  const reset = () => {
    setInputs({})
    setErrors({})
    dispatch(setCloseModalTestimonialUpdate())
    setSubmitted(false)
  }

  const handleSubmitUpdateTestimonial = async (e: any) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validateTestimonialForm(inputs, setErrors)
    if (!isValid) return

    await updateTestimonial(inputs)
      .unwrap()
      .then(() => reset())
      .catch(() => {})
  }

  return (
    <AdminModal show={openModalTestimonialUpdate}>
      <AdminModalClostBtn reset={reset} />
      <AdminITestimonialForm
        handleSubmit={handleSubmitUpdateTestimonial}
        reset={reset}
        isUpdating={true}
        handleInput={handleInput}
        inputs={inputs}
        submitted={submitted}
        errors={errors}
        handleSelect={handleSelect}
        loading={isLoading}
        error={error?.data?.message}
      />
    </AdminModal>
  )
}

export default AdminTestimonialUpdateModal
