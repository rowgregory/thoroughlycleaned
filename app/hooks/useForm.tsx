'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { Errors, Inputs, UseFormHook } from '../types/common-types'

const useForm = (
  fields: (string | Record<string, string | number | boolean | undefined>)[],
  data?: Inputs
): UseFormHook => {
  const initialInputs = fields.reduce(
    (acc: Record<string, string | number | boolean | undefined>, field) => {
      if (typeof field === 'string') {
        // Initialize with undefined if it’s a simple string field
        acc[field] = data?.[field] !== undefined ? data[field] : undefined
        if ((field.startsWith('is') || field.startsWith('has')) && data?.[field] === undefined) {
          acc[field] = undefined
        }
      } else if (typeof field === 'object') {
        // Initialize with the provided default if it’s an object
        const [key, value] = Object.entries(field)[0]
        acc[key] = data?.[key] !== undefined ? data[key] : value
      }
      return acc
    },
    {}
  )

  const [inputs, setInputs] = useState<Inputs>(initialInputs)
  const [errors, setErrors] = useState<Errors>({})
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (data && !initialized) {
      const mappedInputs = fields.reduce((acc: Inputs, field) => {
        if (typeof field === 'string') {
          acc[field] = data[field] !== undefined ? data[field] : ''
        } else if (typeof field === 'object') {
          const [key, defaultValue] = Object.entries(field)[0]
          acc[key] = data[key] !== undefined ? data[key] : defaultValue
        }
        return acc
      }, {})

      setInputs(mappedInputs)
      setInitialized(true)
    }
  }, [data, fields, initialized])

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInputs((prev: Inputs) => ({
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
    setInputs((prev: Inputs) => ({
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
