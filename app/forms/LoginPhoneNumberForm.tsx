'use client'

import React, { FormEvent } from 'react'
import { useVerifyPhoneNumberMutation } from '../redux/services/authApi'
import { inputStyles } from '@/public/data/form.styles'
import useForm from '../hooks/useForm'
import { LOGIN_PHONE_NUMBER_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import Spinner from '../components/common/Spinner'
import validateLoginPhoneNumberForm from '../validations/validateLoginPhoneNumberForm'

const LoginPhoneNumberForm = () => {
  const { inputs, handleInput, setErrors, errors } = useForm(LOGIN_PHONE_NUMBER_INITIAL_FIELDS)
  const [verifyPhoneNumber, { isLoading, error }] = useVerifyPhoneNumberMutation()

  const submitPhoneNumber = async (e: FormEvent) => {
    e.preventDefault()
    const isValid = validateLoginPhoneNumberForm(inputs, setErrors)
    if (isValid) {
      await verifyPhoneNumber(inputs.phoneNumber)
        .unwrap()
        .catch((err: any) => console.log(err))
    }
  }

  return (
    <form onSubmit={submitPhoneNumber} className="flex flex-col w-full">
      <div className="flex flex-col mb-7">
        <label htmlFor="code" className="text-13 rubik-regular text-midnightPlum mb-2">
          Phone Number
        </label>
        <input
          name="phoneNumber"
          onChange={handleInput}
          value={(inputs.phoneNumber as string) || ''}
          className={`${inputStyles}`}
          aria-label="Enter Phone Number"
          placeholder="Phone Number"
        />
        {(errors.phoneNumber || error) && (
          <span className="text-13 mt-0.5 rubik-regular text-red-500">
            {errors.phoneNumber || error.data.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="rounded-sm shadow-submit h-[50px] w-full content-center uppercase bg-neonSkyAqua text-white text-sm rubik poppins-regular"
      >
        {isLoading ? <Spinner wAndH="w-6 h-6" /> : 'Submit'}
      </button>
    </form>
  )
}

export default LoginPhoneNumberForm
