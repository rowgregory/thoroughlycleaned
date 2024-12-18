'use client'

import React, { FC, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useUploadImageMutation } from '@/app/redux/services/imgBBApi'
import { useFetchServiceQuery, useUpdateServiceMutation } from '@/app/redux/services/serviceApi'
import ServiceForm from '@/app/forms/ServiceForm'
import useForm from '@/app/hooks/useForm'
import { SERVICE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import Loading from '../loading'
import validateServiceForm from '@/app/validations/validateServiceForm'

interface UpdateServiceProps {
  id: string
}

const UpdateService: FC<UpdateServiceProps> = ({ id }) => {
  const { push } = useRouter()
  const { service } = useAppSelector((state: RootState) => state.service)
  const { inputs, handleInput, setInputs, setErrors, errors } = useForm(
    SERVICE_INITIAL_FIELDS,
    service
  )
  const { isLoading } = useFetchServiceQuery(id)
  const [uploadImageToImgbb] = useUploadImageMutation()
  const [updateService, { isLoading: loadingUpdate }] = useUpdateServiceMutation()

  const uploadImageIfNeeded = async () => {
    if (inputs.file && inputs.file instanceof File) {
      const uploadedImage: any = await uploadImageToImgbb(inputs.file)
      return uploadedImage.data.data.display_url
    }
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isValid = validateServiceForm(inputs, setErrors)
    if (isValid) {
      const imageUrl = await uploadImageIfNeeded()
      await updateService({
        ...inputs,
        image: imageUrl ?? inputs.image
      })
        .unwrap()
        .then(() => push('/admin/services'))
        .catch((err: any) => console.log(err))
    }
  }

  if (isLoading) return <Loading />

  return (
    <ServiceForm
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      inputs={inputs}
      setInputs={setInputs}
      errors={errors}
      loading={loadingUpdate}
    />
  )
}

export default UpdateService
