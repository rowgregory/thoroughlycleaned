'use client'

import React from 'react'
import ServiceForm from '@/app/forms/ServiceForm'
import { useRouter } from 'next/navigation'
import { RootState, useAppSelector } from '@/app/redux/store'
import useForm from '@/app/hooks/useForm'
import { useCreateServiceMutation } from '@/app/redux/services/serviceApi'
import { useUploadImageMutation } from '@/app/redux/services/imgBBApi'
import { SERVICE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validateServiceForm from '@/app/validations/validateServiceForm'

const CreateService = () => {
  const { push } = useRouter()
  const { service } = useAppSelector((state: RootState) => state.service)
  const { inputs, handleInput, setInputs, setErrors, errors } = useForm(
    SERVICE_INITIAL_FIELDS,
    service
  )
  const [uploadImageToImgbb] = useUploadImageMutation()
  const [createService, { isLoading: loadingCreate }] = useCreateServiceMutation()

  const uploadImageIfNeeded = async () => {
    if (inputs.file && inputs.file instanceof File) {
      const uploadedImage: any = await uploadImageToImgbb(inputs.file)
      return uploadedImage.data.data.display_url
    }
    return null
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const isValid = validateServiceForm(inputs, setErrors)
    if (isValid) {
      const imageUrl = await uploadImageIfNeeded()
      await createService({
        ...inputs,
        image: imageUrl
      })
        .unwrap()
        .then(() => push('/admin/services'))
        .catch((err: any) => console.log(err))
    }
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
          errors={errors}
          loading={loadingCreate}
        />
      </div>
    </section>
  )
}

export default CreateService
