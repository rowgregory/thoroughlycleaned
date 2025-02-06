'use client'

import React, { FormEvent, useRef } from 'react'
import useForm from '../hooks/useForm'
import { useRegisterMutation } from '../redux/services/authApi'
import validateRegisterForm from '../validations/validateRegisterForm'
import { errorStyles } from '@/public/data/form.styles'
import { REGISTER_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import AppleLoader from '../components/common/AppleLoader'
import { Errors, Inputs } from '../types/common.types'
import { useRouter } from 'next/navigation'

const registerFields = (inputs: Inputs, errors: Errors) => {
  return [
    {
      name: 'firstName',
      label: 'Enter First Name',
      value: inputs.firstName,
      error: errors.firstName
    },
    {
      name: 'lastName',
      label: 'Enter Last Name',
      value: inputs.lastName,
      error: errors.lastName
    },
    {
      name: 'email',
      label: 'Enter Email',
      value: inputs.email,

      error: errors.email
    },
    {
      name: 'password',
      label: 'Enter Password',
      value: inputs.password,
      error: errors.password
    },
    {
      name: 'phoneNumber',
      label: 'Enter Phone Number',
      value: inputs.phoneNumber,
      error: errors.phoneNumber
    },
    {
      name: 'consentToSMS',
      value: inputs.consentToSMS,
      error: errors.consentToSMS,
      isCheckbox: true,
      title: 'SMS Service',
      details:
        'By checking this box, you agree to receive text messages from Thoroughly Cleaned. Reply STOP to opt out; Reply HELP for help. Message frequency varies. Message and data rates may apply.'
    }
  ]
}

const RegisterForm = () => {
  const { push } = useRouter()
  const checkBoxRef = useRef<HTMLInputElement>(null)
  const [register, { isLoading, isFetching, error }] = useRegisterMutation()
  const { inputs, handleInput, handleToggle, setErrors, errors, submitted, setSubmitted } = useForm(
    REGISTER_INITIAL_FIELDS,
    validateRegisterForm
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validateRegisterForm(inputs, setErrors)
    if (!isValid) return

    await register(inputs)
      .unwrap()
      .then((data: any) => push(`/auth/verify-register-code/${data.expiresAt}/${data.twoFactorAuthId}`))
      .catch(() => {})
  }

  return (
    <form className="flex flex-col w-full relative">
      {registerFields(inputs, errors).map((field, i) =>
        field.isCheckbox ? (
          <div key={i} className="grid grid-cols-8 gap-x-4 relative">
            <button
              onClick={(e) => {
                e.preventDefault()
                checkBoxRef?.current?.click()
              }}
              className={`col-span-1 w-full h-auto aspect-square shadow-adminServiceCard active:shadow-none flex items-center justify-center border-1 border-[#6e6e73] rounded-md`}
            >
              <div className={`${field.value ? 'bg-neonIce w-5 h-5 rounded-sm' : ''}`} />
            </button>
            <input
              ref={checkBoxRef}
              type="checkbox"
              name={field.name}
              onChange={handleToggle}
              checked={field.value || false}
              className="hidden"
            />
            <div className="col-span-7 flex flex-col gap-y-1">
              <h4 className="text-white">{field.title}</h4>
              <label htmlFor={field.name} className="mb-0 text-xs text-zinc-500 font-rubik">
                {field.details}
              </label>
            </div>
            {submitted && (field.error || error?.data?.message) && (
              <span className={`${errorStyles} -bottom-4 text-[11px]`}>{field.error || error.data.message}</span>
            )}
          </div>
        ) : (
          <div key={i} className="flex flex-col mb-7 w-full relative">
            <input
              name={field.name}
              onChange={handleInput}
              value={field.value || ''}
              className={`p-4 text-white rounded-xl bg-[#202020] border-1 border-[#6e6e73] dark-input focus:outline-none placeholder:text-[#6e6e70]`}
              aria-label={field.label}
              placeholder={field.label}
            />
            {submitted && field.error && <span className={`${errorStyles} -bottom-5 text-[11px]`}>{field.error}</span>}
          </div>
        )
      )}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        type="submit"
        className="mt-8 bg-neonIce hover:bg-[#008b9c] border-1 border-neonIce h-12 rounded-lg text-white disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading || isFetching ? <AppleLoader /> : 'Continue'}
      </button>
    </form>
  )
}

export default RegisterForm
