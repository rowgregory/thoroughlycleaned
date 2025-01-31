import React, { FC, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import useForm from '../hooks/useForm'
import { useResendCodeMutation, useVerifyCodeMutation } from '../redux/services/authApi'
import validateVerifyCodeForm from '../validations/validateVerifyCodeForm'
import AppleLoader from '../components/common/AppleLoader'
import { VERIFY_CODE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import PublicAuthInput from '../components/common/PublicAuthInput'
import useSoundEffect from '../hooks/useSoundEffect'

const VerifyRegisterCodeForm: FC<{ showResetCode: boolean; twoFactorAuthIdtDecoded: string }> = ({
  showResetCode,
  twoFactorAuthIdtDecoded
}) => {
  const { push } = useRouter()
  const { inputs, handleInput, setInputs, setErrors, errors, submitted, setSubmitted } = useForm(
    VERIFY_CODE_INITIAL_FIELDS,
    validateVerifyCodeForm
  )
  const [verifyCode, { isLoading, error }] = useVerifyCodeMutation()
  const [resendCode, { isLoading: loadingResend }] = useResendCodeMutation()
  const { play: playError } = useSoundEffect('/sound-effects/notification-3.mp3', true)
  const { play: playSuccess } = useSoundEffect('/sound-effects/notification-2.mp3', true)

  const submitVerifyRegisterCode = async (e: FormEvent) => {
    e.preventDefault()

    if (showResetCode) return

    setSubmitted(true)

    const isValid = validateVerifyCodeForm(inputs, setErrors)
    if (!isValid) return

    await verifyCode(inputs.code)
      .unwrap()
      .then(() => {
        playSuccess()
        push('/admin/services')
      })
      .catch(() => playError())
  }

  const handleResendCode = async (e: any) => {
    e.preventDefault()
    await resendCode({ id: twoFactorAuthIdtDecoded })
      .unwrap()
      .then((data: any) => {
        push(`/auth/verify-register-code/${data.expiresAt}/${data.twoFactorAuthId}`)
        setInputs({})
        setErrors({})
      })
      .catch(() => {})
  }

  return (
    <form className="flex flex-col w-full relative">
      {showResetCode ? (
        <div className="text-zinc-100 text-sm text-center mb-4 animate-fadeIn">Click 'Resend Code' to receive a new code</div>
      ) : (
        <p className="text-zinc-100 text-sm text-center mb-4 animate-fadeIn">
          To proceed, please check your phone and enter the code that was sent to you via text. Do not go back until this step is completed.
        </p>
      )}
      <PublicAuthInput
        handleInput={handleInput}
        inputValue={inputs.code}
        loading={isLoading}
        onClick={submitVerifyRegisterCode}
        submitted={submitted}
        error={errors?.code || error?.data?.message}
        name="code"
        label="code"
      />
      {showResetCode && (
        <button
          className="text-sm text-neonSkyAqua text-center flex items-center justify-center duration-200 hover:text-[#45cbda] mt-8"
          onClick={handleResendCode}
        >
          {loadingResend ? <AppleLoader /> : 'Resend Code'}
        </button>
      )}
    </form>
  )
}

export default VerifyRegisterCodeForm
