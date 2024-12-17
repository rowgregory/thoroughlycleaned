'use client'

import React, { FC, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useUploadImageMutation } from '@/app/redux/services/imgBBApi'
import { useFetchServiceQuery, useUpdateServiceMutation } from '@/app/redux/services/serviceApi'
import ServiceForm from '@/app/forms/ServiceForm'
import useForm from '@/app/hooks/useForm'

interface UpdateServiceProps {
  id: string
}

const UpdateService: FC<UpdateServiceProps> = ({ id }) => {
  const navigate = useRouter()
  const { service } = useAppSelector((state: RootState) => state.service)
  const { inputs, handleInput, setInputs } = useForm(
    ['id', 'image', 'name', 'description'],
    service
  )

  useFetchServiceQuery(id)
  const [uploadImageToImgbb] = useUploadImageMutation()
  const [updateService] = useUpdateServiceMutation()

  const uploadImageIfNeeded = async () => {
    if (inputs.file && inputs.file instanceof File) {
      const uploadedImage: any = await uploadImageToImgbb(inputs.file)

      return uploadedImage.data.data.display_url
    }
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const imageUrl = await uploadImageIfNeeded()

    const response = await updateService({
      ...inputs,
      image: imageUrl ?? inputs.image
    }).unwrap()

    if (response.success) navigate.push('/admin/services')
  }

  return (
    <ServiceForm
      handleSubmit={handleSubmit}
      handleInput={handleInput}
      inputs={inputs}
      setInputs={setInputs}
    />
  )
}

export default UpdateService
