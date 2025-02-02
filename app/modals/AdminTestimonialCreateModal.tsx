import React from 'react'
import { useCreateTestimonialMutation } from '../redux/services/testimonialApi'
import useForm from '../hooks/useForm'
import { TESTIMONIAL_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validateTestimonialForm from '../validations/validateTestimonialForm'
import AdminModal from '../components/common/AdminModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setCloseModalTestimonialCreate } from '../redux/features/testimonialSlice'
import AdminITestimonialForm from '../forms/AdminTestimonialForm'
import AdminModalClostBtn from '../components/admin/AdminModalClostBtn'

const AdminTestimonialCreateModal = () => {
  const dispatch = useAppDispatch()
  const [createTestimonial, { isLoading, error }] = useCreateTestimonialMutation()
  const { openModalTestimonialCreate } = useAppSelector((state: RootState) => state.testimonial)
  const { inputs, errors, handleInput, handleSelect, setInputs, setErrors, submitted, setSubmitted } = useForm(
    TESTIMONIAL_INITIAL_FIELDS,
    validateTestimonialForm
  )

  const reset = () => {
    setInputs({})
    setErrors({})
    dispatch(setCloseModalTestimonialCreate())
    setSubmitted(false)
  }

  const handleSubmitCreateTestimonial = async (e: any) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validateTestimonialForm(inputs, setErrors)
    if (!isValid) return

    await createTestimonial(inputs)
      .unwrap()
      .then(() => reset())
      .catch(() => {})
  }

  return (
    <AdminModal show={openModalTestimonialCreate}>
      <AdminModalClostBtn reset={reset} />
      <AdminITestimonialForm
        handleSubmit={handleSubmitCreateTestimonial}
        reset={reset}
        isUpdating={false}
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

export default AdminTestimonialCreateModal
