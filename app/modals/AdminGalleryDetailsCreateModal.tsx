import React, { FormEvent } from 'react'
import AdminModal from '../components/common/AdminModal'
import { useCreatePhotoGalleryProjectMutation } from '../redux/services/photoGalleryImageApi'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import AdminGalleryDetailsForm from '../forms/AdminGalleryDetailsForm'
import useForm from '../hooks/useForm'
import { ADMIN_PHOTOS_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validatePhotoGalleryProjectForm from '../validations/validatePhotoGalleryProjectForm'
import { closeGalleryDetailsCreateModal, openGalleryPhotosModal, resetGallery } from '../redux/features/photoGallerySlice'
import AdminModalClostBtn from '../components/admin/AdminModalClostBtn'

const AdminGalleryDetailsCreateModal = () => {
  const dispatch = useAppDispatch()
  const { openModalGalleryCreateDetails } = useAppSelector((state: RootState) => state.photoGallery)
  const [createPhotoGalleryProject, { isLoading, error }] = useCreatePhotoGalleryProjectMutation()
  const { inputs, errors, handleInput, handleSelect, setInputs, setErrors, submitted, setSubmitted } = useForm(
    ADMIN_PHOTOS_INITIAL_FIELDS,
    validatePhotoGalleryProjectForm
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validatePhotoGalleryProjectForm(inputs, setErrors)
    if (!isValid) return

    await createPhotoGalleryProject({ name: inputs.name, serviceType: inputs.serviceType })
      .unwrap()
      .then((data: any) => {
        dispatch(closeGalleryDetailsCreateModal())
        dispatch(openGalleryPhotosModal(data.project))
        setSubmitted(false)
      })
      .catch(() => setSubmitted(false))
  }

  const reset = (e: FormEvent) => {
    e.preventDefault()
    dispatch(resetGallery())
    setInputs({ serviceType: 'Residential' })
  }

  return (
    <AdminModal show={openModalGalleryCreateDetails}>
      <AdminModalClostBtn reset={reset} />
      <AdminGalleryDetailsForm
        handleSubmit={handleSubmit}
        isUpdating={false}
        handleInput={handleInput}
        inputs={inputs}
        submitted={submitted}
        handleSelect={handleSelect}
        errors={errors}
        reset={reset}
        loading={isLoading}
        error={error?.data?.message}
      />
    </AdminModal>
  )
}

export default AdminGalleryDetailsCreateModal
