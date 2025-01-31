import React, { FormEvent } from 'react'
import AdminModal from '../components/common/AdminModal'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { timesIcon } from '../icons'
import { useUpdatePhotoGalleryProjectMutation } from '../redux/services/photoGalleryImageApi'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import AdminGalleryDetailsForm from '../forms/AdminGalleryDetailsForm'
import useForm from '../hooks/useForm'
import { ADMIN_PHOTOS_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validatePhotoGalleryProjectForm from '../validations/validatePhotoGalleryProjectForm'
import { closeGalleryDetailsUpdateModal, openGalleryPhotosModal, resetGallery } from '../redux/features/photoGallerySlice'

const AdminGalleryDetailsUpdateModal = () => {
  const dispatch = useAppDispatch()
  const { openModalGalleryUpdateDetails, project } = useAppSelector((state: RootState) => state.photoGallery)
  const [updatePhotoGalleryProject, { isLoading, error }] = useUpdatePhotoGalleryProjectMutation()
  const { inputs, errors, handleInput, handleSelect, setInputs, setErrors, submitted, setSubmitted } = useForm(
    ADMIN_PHOTOS_INITIAL_FIELDS,
    validatePhotoGalleryProjectForm,
    project
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validatePhotoGalleryProjectForm(inputs, setErrors)
    if (!isValid) return

    await updatePhotoGalleryProject({
      id: project.id,
      name: inputs.name,
      serviceType: inputs.serviceType
    })
      .unwrap()
      .then(() => setSubmitted(false))
      .catch(() => {})
  }

  const reset = (e: FormEvent) => {
    e.preventDefault()
    dispatch(resetGallery())
    setInputs({ serviceType: 'Residential' })
  }

  const handleOpenGalleryPhotosModal = () => {
    dispatch(closeGalleryDetailsUpdateModal())
    dispatch(openGalleryPhotosModal(project))
  }

  return (
    <AdminModal show={openModalGalleryUpdateDetails}>
      <AwesomeIcon icon={timesIcon} onClick={reset} className="w-5 h-5 text-white absolute top-5 left-5 z-10 cursor-pointer" />
      <AdminGalleryDetailsForm
        handleSubmit={handleSubmit}
        isUpdating={true}
        handleInput={handleInput}
        inputs={inputs}
        submitted={submitted}
        handleSelect={handleSelect}
        errors={errors}
        reset={reset}
        loading={isLoading}
        handleOpenGalleryPhotosModal={handleOpenGalleryPhotosModal}
        error={error?.data?.message}
      />
    </AdminModal>
  )
}

export default AdminGalleryDetailsUpdateModal
