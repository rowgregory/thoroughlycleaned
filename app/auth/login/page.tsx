'use client'

import AwesomeIcon from '@/app/components/common/AwesomeIcon'
import useForm from '@/app/hooks/useForm'
import { lockIcon } from '@/app/icons'
import { useVerifyPasscodeMutation } from '@/app/redux/services/authApi'
import { useSendTwilioSMSMessageMutation } from '@/app/redux/services/twilioApi'
import React, { FormEvent, useState } from 'react'

const Login = () => {
  const { inputs, handleInput, setInputs } = useForm(['code', 'passcode'])
  const [verifyCode] = useSendTwilioSMSMessageMutation()
  const [verifyPasscode] = useVerifyPasscodeMutation()
  const [showPasscode, setShowPasscode] = useState(false)

  const submitCode = async (e: FormEvent) => {
    e.preventDefault()
    console.log('CODE SUBMITTED: ', inputs.code)

    await verifyCode(inputs.code)
      .unwrap()
      .then((data: any) => {
        console.log('data: ', data)
        setShowPasscode(true)
        setInputs({})
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  const submitPasscode = async (e: FormEvent) => {
    e.preventDefault()
    console.log('PASSCODE SUBMITTED: ', inputs.passcode)

    await verifyPasscode(inputs.passcode)
      .unwrap()
      .then((data: any) => {
        console.log('data: ', data)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  return (
    <div
      className="px-4 py-20 w-full bg-cover bg-center bg-no-repeat min-h-[calc(100vh-128px)]"
      style={{ backgroundImage: `url('/images/login-bg.png')` }}
    >
      <div className="relative max-w-sm w-full mx-auto">
        <div className="translate-element bg-sunny w-24 h-24 absolute z-0 -bottom-4 -left-8"></div>
        <div
          className={`h-[440px] overflow-hidden bg-skyAqua relative z-20 login-shape flex flex-col p-5`}
        >
          <span className="text-4xl text-skyAqua relative z-30 mb-32 poppins-bold">Login</span>
          <div
            className="translate-y-element z-10 bg-contain bg-center bg-no-repeat absolute w-full h-full -bottom-12 left-0 right-0"
            style={{ backgroundImage: `url('/images/clear-bubbles.png')` }}
          ></div>
          {showPasscode ? (
            <form
              onSubmit={submitPasscode}
              className="flex items-center gap-x-4 w-full relative z-40"
            >
              <input
                name="passcode"
                onChange={handleInput}
                value={(inputs.passcode as string) || ''}
                className="bg-white p-4 w-full border-[3px] border-sunny focus:border-sunny focus:outline-none"
                aria-label="Enter Passcode"
                placeholder="Enter Passcode"
              />
              <button className="p-4 border-[3px] border-sunny w-fit h-full">
                <AwesomeIcon icon={lockIcon} className="w-5 h-5 text-sunny" />
              </button>
            </form>
          ) : (
            <form onSubmit={submitCode} className="flex items-center gap-x-4 w-full relative z-40">
              <input
                name="code"
                onChange={handleInput}
                value={(inputs.code as string) || ''}
                className="bg-white p-4 w-full border-[3px] border-sunny focus:border-sunny focus:outline-none"
                aria-label="Enter Code"
                placeholder="Enter Code"
              />
              <button className="p-4 border-[3px] border-sunny w-fit h-full">
                <AwesomeIcon icon={lockIcon} className="w-5 h-5 text-sunny" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
