'use client'

import React, { useEffect, useState } from 'react'
import VerifyRegisterCodeForm from '@/app/forms/VerifyRegisterCodeForm'
import useCountdown from '@/app/hooks/useCountdown'
import { useParams } from 'next/navigation'

const VerifyRegisterCode = () => {
  const params = useParams() as any
  const twoFactorAuthIdtDecoded = decodeURIComponent(params?.twoFactorAuthId)
  const expiresAtDecoded = decodeURIComponent(params?.expiresAt)
  const expiresAtDate = new Date(expiresAtDecoded)
  const { minutes, seconds, isActive } = useCountdown(expiresAtDate)
  const [showResetCode, setShowResendCode] = useState(false)

  useEffect(() => {
    if (minutes === 0 && seconds === 0 && !isActive) {
      setShowResendCode(true)
    }
  }, [minutes, seconds, isActive])

  const timer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <>
      <h1 className="font-rubik font-semibold text-3xl text-white mb-7 text-center">Verify Code</h1>
      {isActive && <div className="text-sm my-2 text-white font-rubik animate-fadeIn">{timer}</div>}
      <VerifyRegisterCodeForm showResetCode={showResetCode} twoFactorAuthIdtDecoded={twoFactorAuthIdtDecoded} />
    </>
  )
}

export default VerifyRegisterCode
