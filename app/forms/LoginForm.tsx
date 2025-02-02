'use client'

import React, { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import useForm from '../hooks/useForm'
import { LOGIN_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import { useLoginMutation } from '../redux/services/authApi'
import { adminModalInputStyles } from '@/public/data/form.styles'
import validateLoginForm from '../validations/validateLoginForm'
import { setAuthState } from '../redux/features/authSlice'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setServices } from '../redux/features/serviceSlice'
import PublicAuthInput from '../components/common/PublicAuthInput'
import useSoundEffect from '../hooks/useSoundEffect'

const LoginForm = () => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const { inputs, handleInput, setErrors, errors, submitted, setSubmitted } = useForm(LOGIN_INITIAL_FIELDS, validateLoginForm)
  const [login, { isLoading, error }] = useLoginMutation()
  const { profile } = useAppSelector((state: RootState) => state.profile)
  const { play: playSuccess } = useSoundEffect('/sound-effects/notification-sound.mp3', profile.isSoundEffectsOn)
  const { play: playError } = useSoundEffect('/sound-effects/notification-3.mp3', profile.isSoundEffectsOn)

  const submitLoginCredentials = async (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSubmitted(true)

    const isValid = validateLoginForm(inputs, setErrors)
    if (!isValid) return

    await login({ email: inputs.email, password: inputs.password })
      .unwrap()
      .then((data: any) => {
        playSuccess()
        dispatch(setAuthState(data.auth))
        dispatch(setServices(data.services))
        push('/admin/services')
      })
      .catch(() => playError())
  }

  return (
    <form className="flex flex-col w-full relative">
      <div className="flex flex-col mb-7 w-full relative">
        <input
          name="email"
          type="email"
          onChange={handleInput}
          value={(inputs.email as string) || ''}
          className={`${adminModalInputStyles} dark-input bg-[#202020] border-1 border-[#424245]`}
          aria-label="Enter Email"
          placeholder="Email"
        />
        {submitted && errors.email && (
          <span className="text-red-500 flex self-end mt-1 text-11 absolute -bottom-5 animate-fadeIn">{errors.email}</span>
        )}
      </div>
      <PublicAuthInput
        handleInput={handleInput}
        inputValue={inputs.password}
        loading={isLoading}
        onClick={submitLoginCredentials}
        submitted={submitted}
        error={errors?.password || error?.data?.message}
        name="password"
        label="password"
      />
    </form>
  )
}

export default LoginForm
