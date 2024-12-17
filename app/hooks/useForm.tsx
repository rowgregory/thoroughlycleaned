'use client'

import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Errors, Inputs, UseFormHook } from '../types/common.types'

const useForm = (
  fields: (string | Record<string, string | number | boolean | undefined>)[],
  data?: Inputs
): UseFormHook => {
  const createInitialInputs = useCallback(
    (data?: Inputs): Inputs => {
      return fields.reduce((acc: Record<string, string | number | boolean | undefined>, field) => {
        if (typeof field === 'string') {
          acc[field] = data?.[field] !== undefined ? data[field] : undefined
        } else if (typeof field === 'object') {
          const [key, value] = Object.entries(field)[0]
          acc[key] = data?.[key] !== undefined ? data[key] : value
        }
        return acc
      }, {})
    },
    [fields]
  )

  // Initialize isolated state
  const [inputs, setInputs] = useState<Inputs>(() => createInitialInputs(data))
  const [errors, setErrors] = useState<Errors>({})
  const [isInitilized, setIsInitialized] = useState(false)

  useEffect(() => {
    const updatedInputs = createInitialInputs(data)

    // Compare existing inputs to the new inputs
    const isEqual = Object.keys(updatedInputs).every((key) => updatedInputs[key] === inputs[key])

    if (!isEqual && !isInitilized) {
      setInputs(updatedInputs)
      setIsInitialized(true)
    }
  }, [createInitialInputs, data, fields, inputs, isInitilized])

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
