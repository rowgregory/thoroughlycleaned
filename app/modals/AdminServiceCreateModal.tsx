import React, { useRef, useState } from 'react'
import AdminModal from '../components/common/AdminModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { timesIcon } from '../icons'
import AdminServiceForm from '../forms/AdminServiceForm'
import useForm from '../hooks/useForm'
import { SERVICE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validateServiceForm from '../validations/validateServiceForm'
import { useCreateServiceMutation } from '../redux/services/serviceApi'
import { setActiveService, setModalCloseServiceCreate } from '../redux/features/serviceSlice'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'

const AdminServiceCreateModal = () => {
  const dispatch = useAppDispatch()
  const [createService, { error }] = useCreateServiceMutation()
  const { modalOpenServiceCreate } = useAppSelector((state: RootState) => state.service)
  const {
    inputs,
    errors,
    handleInput,
    handleSelect,
    setInputs,
    setErrors,
    handleUploadProgress,
    handleDrop,
    handleFileChange,
    submitted,
    setSubmitted
  } = useForm(SERVICE_INITIAL_FIELDS, validateServiceForm)
  const pictureRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const reset = () => {
    setInputs({})
    setErrors({})
    dispatch(setModalCloseServiceCreate())
    setSubmitted(false)
    dispatch(setActiveService({}))
  }

  const handleSubmitCreateService = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setSubmitted(true)
    const isValid = validateServiceForm(inputs, setErrors)
    if (!isValid) return setLoading(false)

    const url = await uploadFileToFirebase(inputs.file, handleUploadProgress, 'image')

    await createService({ ...inputs, url, fileName: inputs.file.name })
      .unwrap()
      .then(() => reset())
      .catch(() => {})

    setLoading(false)
  }

  return (
    <AdminModal show={modalOpenServiceCreate}>
      <AwesomeIcon icon={timesIcon} onClick={() => reset()} className="w-5 h-5 text-white absolute top-5 left-5 z-10 cursor-pointer" />
      <AdminServiceForm
        handleSubmit={handleSubmitCreateService}
        isUpdating={false}
        handleDrop={handleDrop}
        inputRef={pictureRef}
        inputs={inputs}
        handleFileChange={handleFileChange}
        errors={errors}
        submitted={submitted}
        handleInput={handleInput}
        handleSelect={handleSelect}
        reset={reset}
        loading={loading}
        error={error?.data?.message}
      />
    </AdminModal>
  )
}

export default AdminServiceCreateModal
