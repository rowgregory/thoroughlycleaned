'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { Errors, Inputs, UseFormHook } from '../types/common.types'
import uploadFileToFirebase from '../utils/uploadFileToFirebase'

const useForm = (
  fields: Record<string, string | number | boolean | [] | {} | undefined | null>,
  validateForm?: (inputs: Inputs, setErrors: (errors: Errors) => void, name?: string) => any,
  data?: Inputs
): UseFormHook => {
  const [inputs, setInputs] = useState<Inputs>(fields)
  const [errors, setErrors] = useState<Errors>({})
  const [uploadProgress, setUploadProgress] = useState(-1)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (data) {
      setInputs((prev) => ({
        ...prev,
        ...data
      }))
    }
  }, [data])

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }))

    validateForm && validateForm({ ...inputs, [name]: value }, setErrors, name)
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }))

    validateForm && validateForm({ ...inputs, [name]: value }, setErrors, name)
  }

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    setInputs((prev) => ({
      ...prev,
      [name]: checked
    }))

    validateForm && validateForm({ ...inputs, [name]: checked }, setErrors, name)
  }

  const uploadFileHandler = async (
    file: File,
    setUploadProgress: (progress: number) => void,
    updateText: any,
    type: string,
    textBlockKey: string,
    setInputs: (inputs: Inputs) => void
  ) => {
    let url: string
    let mimeType: string
    let fileName: string

    setInputs({})

    if (file.type.startsWith('image')) {
      url = await uploadFileToFirebase(file, setUploadProgress, 'image')
      mimeType = 'image'
      fileName = file.name
    } else if (file.type.startsWith('video')) {
      url = await uploadFileToFirebase(file, setUploadProgress, 'video')
      mimeType = 'video'
      fileName = file.name
    } else {
      return
    }

    await updateText({
      [textBlockKey]: url,
      type,
      mimeType,
      fileName
    })
      .unwrap()
      .then(() => setInputs({ src: url, mimeType }))
  }

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress)
    if (progress === 100) {
      setUploadProgress(-1)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files

    if (files && files[0] && files[0].type.startsWith('image/') && !files[0].type.startsWith('image/heic')) {
      const reader = new FileReader()
      reader.onload = () => {
        setInputs((prev: any) => ({ ...prev, url: reader.result, file: files[0] }))
        validateForm && validateForm({ ...inputs, url: reader.result }, setErrors, 'image')
      }
      reader.readAsDataURL(files[0])
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files[0] && files[0].type.startsWith('image/') && !files[0].type.startsWith('image/heic')) {
      const reader = new FileReader()
      reader.onload = () => {
        setInputs((prev: any) => ({ ...prev, url: reader.result, file: files[0] }))
        validateForm && validateForm({ ...inputs, url: reader.result }, setErrors, 'image')
      }
      reader.readAsDataURL(files[0])
    }
  }

  return {
    inputs,
    errors,
    handleInput,
    handleSelect,
    handleToggle,
    setInputs,
    setErrors,
    uploadFileHandler,
    handleUploadProgress,
    uploadProgress,
    handleDrop,
    handleFileChange,
    submitted,
    setSubmitted
  }
}

export default useForm
