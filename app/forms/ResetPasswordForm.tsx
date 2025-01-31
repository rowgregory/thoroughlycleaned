'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useForm from '../hooks/useForm'
import { RESET_PASSWORD_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validateResetPasswordForm from '../validations/validateResetPasswordForm'
import { useResetPasswordMutation } from '../redux/services/authApi'
import { RootState, useAppSelector } from '../redux/store'
import PublicAuthInput from '../components/common/PublicAuthInput'
import useSoundEffect from '../hooks/useSoundEffect'

const ResetPasswordForm = () => {
  const { push } = useRouter()
  const { inputs, handleInput, setErrors, errors } = useForm(RESET_PASSWORD_INITIAL_FIELDS, validateResetPasswordForm)
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation()
  const [submitted, setSubmitted] = useState(false)
  const { phoneNumber } = useAppSelector((state: RootState) => state.auth)
  const { play: playError } = useSoundEffect('/sound-effects/notification-3.mp3', true)
  const { play: playSuccess } = useSoundEffect('/sound-effects/notification-1.mp3', true)

  useEffect(() => {
    if (!phoneNumber) {
      push('/auth/forgot-password')
    }
  }, [phoneNumber])

  const submitResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const isValid = validateResetPasswordForm(inputs, setErrors)
    if (!isValid) return

    await resetPassword({ password: inputs.password, phoneNumber })
      .unwrap()
      .then(() => {
        playSuccess()
        push('/auth/login')
      })
      .catch(() => playError())
  }

  return (
    <form className="flex flex-col w-full relative">
      <PublicAuthInput
        handleInput={handleInput}
        inputValue={inputs.password}
        loading={isLoading}
        onClick={submitResetPassword}
        submitted={submitted}
        error={errors?.password || error?.data?.message}
        name="password"
        label="password"
      />
    </form>
  )
}

export default ResetPasswordForm
