'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { Errors, Inputs, UseFormHook } from '../types/common.types'

const useForm = (
  fields: Record<string, string | number | boolean | undefined>,
  data?: Inputs
): UseFormHook => {
  const [inputs, setInputs] = useState<Inputs>(fields)
  const [errors, setErrors] = useState<Errors>({})

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
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: checked
    }))
  }

  return {
    inputs,
    errors,
    handleInput,
    handleSelect,
    handleToggle,
    setInputs,
    setErrors
  }
}

export default useForm
