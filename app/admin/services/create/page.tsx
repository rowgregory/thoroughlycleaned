'use client'

import React from 'react'
import ServiceForm from '@/app/forms/ServiceForm'
import { useRouter } from 'next/navigation'
import { RootState, useAppSelector } from '@/app/redux/store'
import useForm from '@/app/hooks/useForm'
import { useCreateServiceMutation } from '@/app/redux/services/serviceApi'
import { useUploadImageMutation } from '@/app/redux/services/imgBBApi'

const CreateService = () => {
  const navigate = useRouter()
  const { service } = useAppSelector((state: RootState) => state.service)
  const { inputs, handleInput, setInputs } = useForm(
    ['id', 'image', 'name', 'description'],
    service
  )
  const [uploadImageToImgbb] = useUploadImageMutation()
  const [createService] = useCreateServiceMutation()

  const uploadImageIfNeeded = async () => {
    if (inputs.file && inputs.file instanceof File) {
      const uploadedImage: any = await uploadImageToImgbb(inputs.file)

      return uploadedImage.data.data.display_url
    }
    return null
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const imageUrl = await uploadImageIfNeeded()

    const response = await createService({
      ...inputs,
      image: imageUrl
    }).unwrap()

    if (response.success) navigate.push('/admin/services')
  }

  return (
    <section className="grid grid-cols-12 gap-x-7">
      <div className="col-span-12 shadow-neu bg-iconShadow p-6 rounded-lg">
        <h1 className="text-lg mb-9 rubik-bold text-midnightPlum">Create Service</h1>
        <ServiceForm
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          inputs={inputs}
          setInputs={setInputs}
          isCreate={true}
        />
      </div>
    </section>
  )
}

export default CreateService
