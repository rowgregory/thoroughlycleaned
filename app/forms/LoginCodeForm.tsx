'use client'

import React, { FC, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useForm from '../hooks/useForm'
import { LOGIN_CODE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import useCountdown from '../hooks/useCountdown'
import { useVerifyCodeMutation } from '../redux/services/authApi'
import { inputStyles } from '@/public/data/form.styles'
import validateLoginCodeForm from '../validations/validateLoginCodeForm'
import Spinner from '../components/common/Spinner'
import { useAppDispatch } from '../redux/store'
import { setPhoneNumberNotVerified } from '../redux/features/authSlice'

const LoginCodeForm: FC<{ phoneNumberVerified: boolean }> = ({ phoneNumberVerified }) => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const { inputs, handleInput, setErrors, errors } = useForm(LOGIN_CODE_INITIAL_FIELDS)
  const { formattedTime, isActive, timeRemaining } = useCountdown(5 * 60, phoneNumberVerified)
  const [verifyCode, { isLoading, error }] = useVerifyCodeMutation()

  const submitCode = async (e: FormEvent) => {
    e.preventDefault()
    const isValid = validateLoginCodeForm(inputs, setErrors)
    if (isValid) {
      await verifyCode(inputs.code)
        .unwrap()
        .then(() => push('/admin/dashboard'))
        .catch((err: any) => console.log(err))
    }
  }

  useEffect(() => {
    if (timeRemaining <= 0) {
      dispatch(setPhoneNumberNotVerified())
    }
  }, [dispatch, timeRemaining])

  return (
    <form onSubmit={submitCode} className="flex flex-col w-full">
      <div className="flex flex-col mb-7">
        <label htmlFor="code" className="text-13 rubik-regular text-midnightPlum mb-2 ">
          Code
        </label>
        <input
          name="code"
          onChange={handleInput}
          value={(inputs.code as string) || ''}
          className={`${inputStyles}`}
          aria-label="Enter Code"
          placeholder="Code"
        />
        {(errors.code || error) && (
          <span className="text-13 mt-0.5 rubik-regular text-red-500">
            {errors.code || error.data.message}
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
      {isActive && <div className="text-sm poppins-regular my-2">{formattedTime}</div>}
    </form>
  )
}

export default LoginCodeForm
