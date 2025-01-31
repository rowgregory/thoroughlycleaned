'use client'

import VerifyForgotPasswordCodeForm from '@/app/forms/VerifyForgotPasswordCodeForm'
import useCountdown from '@/app/hooks/useCountdown'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const VerifyForgotPasswordCode = () => {
  const { push } = useRouter()
  const params = useParams() as any
  const expiresAtDecoded = decodeURIComponent(params?.expiresAt)
  const expiresAtDate = new Date(expiresAtDecoded)
  const { minutes, seconds, isActive } = useCountdown(expiresAtDate)

  useEffect(() => {
    if (minutes === 0 && seconds === 0 && !isActive) {
      push('/auth/forgot-password')
    }
  }, [minutes, seconds, isActive, push])

  return (
    <>
      <h1 className="font-rubik font-semibold text-3xl text-white mb-7 text-center">Verify Code</h1>
      <div className="text-sm my-2 text-white font-rubik">{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</div>
      <VerifyForgotPasswordCodeForm />
    </>
  )
}

export default VerifyForgotPasswordCode
