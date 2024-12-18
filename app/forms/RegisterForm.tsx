'use client'

import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import useForm from '../hooks/useForm'
import { useRegisterMutation } from '../redux/services/authApi'
import validateRegisterForm from '../validations/validateRegisterForm'
import { inputStyles, labelStyles } from '@/public/data/form.styles'
import { REGISTER_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'

const RegisterForm = () => {
  const { push } = useRouter()
  const { inputs, handleInput, handleToggle, setErrors, errors } = useForm(REGISTER_INITIAL_FIELDS)
  const [register] = useRegisterMutation()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isValid = validateRegisterForm(inputs, setErrors)
    if (isValid) {
      await register(inputs)
        .then(() => push('/admin/dashboard'))
        .catch((err: any) => console.log(err))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="flex flex-col mb-7">
        <label htmlFor="code" className={labelStyles}>
          First Name
        </label>
        <input
          name="firstName"
          onChange={handleInput}
          value={(inputs.firstName as string) || ''}
          className={`${inputStyles}  text-inputText`}
          aria-label="Enter First Name"
          placeholder="Enter First Name"
        />
        {errors.firstName && (
          <span className="text-13 mt-0.5 poppins-regular text-red-500">{errors.firstName}</span>
        )}
      </div>
      <div className="flex flex-col mb-7">
        <label htmlFor="code" className={labelStyles}>
          Last Name
        </label>
        <input
          name="lastName"
          onChange={handleInput}
          value={(inputs.lastName as string) || ''}
          className={`${inputStyles}  text-inputText`}
          aria-label="Enter Last Name"
          placeholder="Enter Last Name"
        />
        {errors.lastName && (
          <span className="text-13 mt-0.5 poppins-regular text-red-500">{errors.lastName}</span>
        )}
      </div>
      <div className="flex flex-col mb-7">
        <label htmlFor="code" className={labelStyles}>
          Phone Number
        </label>
        <input
          name="phoneNumber"
          onChange={handleInput}
          value={(inputs.phoneNumber as string) || ''}
          className={`${inputStyles} text-inputText`}
          aria-label="Enter Phone Number"
          placeholder="Enter Phone Number"
        />
        {errors.phoneNumber && (
          <span className="text-13 mt-0.5 poppins-regular text-red-500">{errors.phoneNumber}</span>
        )}
      </div>
      <div className="flex flex-col my-6">
        <div className="flex gap-x-6 items-start justify-start">
          <input
            type="checkbox"
            name="consentToSMS"
            onChange={handleToggle}
            checked={(inputs.consentToSMS as boolean) || false}
            className="mt-1"
          />
          <label htmlFor="consentToSMS" className={`${labelStyles} mb-0`}>
            By checking this box, you agree to receive text messages from Thoroughly Cleaned. Reply
            STOP to opt out; Reply HELP for help. Message frequency varies. Message and data rates
            may apply.
          </label>
        </div>
        {errors.consentToSMS && (
          <span className="text-13 mt-0.5 poppins-regular text-red-500">{errors.consentToSMS}</span>
        )}
      </div>
      <button
        type="submit"
        className="rounded-sm shadow-submit h-[50px] w-full content-center uppercase bg-neonSkyAqua text-white text-sm rubik poppins-regular"
      >
        Register
      </button>
    </form>
  )
}

export default RegisterForm
