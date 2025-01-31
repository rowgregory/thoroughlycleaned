'use client'

import React, { FormEvent } from 'react'
import useForm from '../hooks/useForm'
import { VERIFY_FORGOT_PASSWORD_CODE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import { useVerifyForgotPasswordCodeMutation } from '../redux/services/authApi'
import validateVerifyForgotPasswordCodeForm from '../validations/validateForgotPasswordCodeForm'
import PublicAuthInput from '../components/common/PublicAuthInput'
import { useRouter } from 'next/navigation'
import useSoundEffect from '../hooks/useSoundEffect'

const VerifyForgotPasswordCodeForm = () => {
  const { push } = useRouter()
  const { inputs, handleInput, setErrors, errors, submitted, setSubmitted } = useForm(
    VERIFY_FORGOT_PASSWORD_CODE_INITIAL_FIELDS,
    validateVerifyForgotPasswordCodeForm
  )
  const [verifyForgotPasswordCode, { isLoading, error }] = useVerifyForgotPasswordCodeMutation()
  const { play: playError } = useSoundEffect('/sound-effects/notification-3.mp3', true)
  const { play: playSuccess } = useSoundEffect('/sound-effects/notification-2.mp3', true)

  const submitVerifyForgotPasswordCode = async (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSubmitted(true)

    const isValid = validateVerifyForgotPasswordCodeForm(inputs, setErrors)
    if (!isValid) return

    await verifyForgotPasswordCode(inputs.code)
      .unwrap()
      .then(() => {
        playSuccess()
        push(`/auth/reset-password`)
      })
      .catch(() => playError())
  }

  return (
    <form className="flex flex-col w-full relative">
      <PublicAuthInput
        handleInput={handleInput}
        inputValue={inputs.code}
        loading={isLoading}
        onClick={submitVerifyForgotPasswordCode}
        submitted={submitted}
        error={errors?.code || error?.data?.message}
        name="code"
        label="code"
      />
    </form>
  )
}

export default VerifyForgotPasswordCodeForm
