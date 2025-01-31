'use client'

import React, { FormEvent } from 'react'
import { useForgotPasswordMutation } from '../redux/services/authApi'
import useForm from '../hooks/useForm'
import validateForgotPasswordForm from '../validations/validateForgotPasswordForm'
import { FORGOT_PASSWORD_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import { useRouter } from 'next/navigation'
import PublicAuthInput from '../components/common/PublicAuthInput'
import useSoundEffect from '../hooks/useSoundEffect'

const ForgotPasswordForm = () => {
  const { push } = useRouter()
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation()
  const { inputs, handleInput, setErrors, errors, submitted, setSubmitted } = useForm(
    FORGOT_PASSWORD_INITIAL_FIELDS,
    validateForgotPasswordForm
  )

  const { play: playError } = useSoundEffect('/sound-effects/notification-3.mp3', true)
  const { play: playSuccess } = useSoundEffect('/sound-effects/notification-2.mp3', true)

  const submitForgotPassword = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const isValid = validateForgotPasswordForm(inputs, setErrors)
    if (!isValid) return

    await forgotPassword(inputs.phoneNumber)
      .unwrap()
      .then((data: any) => {
        playSuccess()
        push(`/auth/verify-forgot-password-code/${data.expiresAt}`)
      })
      .catch(() => playError())
  }

  return (
    <form className="flex flex-col w-full relative">
      <PublicAuthInput
        handleInput={handleInput}
        inputValue={inputs.phoneNumber}
        loading={isLoading}
        onClick={submitForgotPassword}
        submitted={submitted}
        error={errors?.phoneNumber || error?.data?.message}
        name="phoneNumber"
        label="phone number"
      />
    </form>
  )
}

export default ForgotPasswordForm
