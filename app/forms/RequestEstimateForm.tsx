'use client'

import React, { FC, FormEvent } from 'react'
import BubbleBtn from '../components/common/BubbleBtn'
import useForm from '../hooks/useForm'

interface RequestEstimateFormProps {
  formStyles: string
  inputStyles: string
  selectStyles: string
  buttonStyles?: string
}

const RequestEstimateForm: FC<RequestEstimateFormProps> = ({
  formStyles,
  inputStyles,
  selectStyles,
  buttonStyles
}) => {
  const { inputs, handleInput, handleSelect } = useForm([
    'name',
    'number',
    { service: 'Residential' }
  ])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const inputsAreValid =
      Object.keys(inputs).length > 0 && Object.values(inputs).every((value) => value !== undefined)

    if (!inputsAreValid) {
      // ToDo
      // show message or modal to user
      return
    }

    // Todo
    // Send text to admin

    console.log('Submitting...', inputs)
  }

  return (
    <form onSubmit={handleSubmit} className={formStyles}>
      <input
        name="name"
        onChange={handleInput}
        className={inputStyles}
        aria-label="name"
        placeholder="Your Name"
      />
      <input
        name="number"
        onChange={handleInput}
        className={inputStyles}
        aria-label="number"
        placeholder="Your Number"
      />
      <select
        name="service"
        onChange={handleSelect}
        className={selectStyles}
        aria-label="Service"
        value={(inputs.service as string) || ''}
      >
        {['Residential', 'Commercial', 'Biohazard'].map((service: string) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
      <button type="submit" className={buttonStyles}>
        <BubbleBtn bubbleColor="bg-white" text="Submit Now" />
      </button>
    </form>
  )
}

export default RequestEstimateForm
