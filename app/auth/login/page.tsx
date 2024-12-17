'use client'

import React, { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RootState, useAppSelector } from '@/app/redux/store'
import { useVerifyCodeMutation, useVerifyPhoneNumberMutation } from '@/app/redux/services/authApi'
import useForm from '@/app/hooks/useForm'
import useCountdown from '@/app/hooks/useCountdown'
import Logo from '@/app/components/common/Logo'
import { inputStyles } from '@/public/data/form.styles'

const Login = () => {
  const navigate = useRouter()
  const { inputs, handleInput } = useForm(['phoneNumber', 'code'])
  const [verifyPhoneNumber] = useVerifyPhoneNumberMutation()
  const [verifyCode] = useVerifyCodeMutation()
  const auth = useAppSelector((state: RootState) => state.auth)
  const [error, setError] = useState('')
  const { formattedTime, isActive } = useCountdown(5 * 60, auth.phoneNumberVerified)

  const submitPhoneNumber = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await verifyPhoneNumber(inputs.phoneNumber).unwrap()
      setError('')
    } catch (err: any) {
      setError(err.data.message)
    }
  }

  const submitCode = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await verifyCode(inputs.code).unwrap()
      navigate.push('/admin/dashboard')
      setError('')
    } catch (err: any) {
      setError(err.data.message)
    }
  }

  return (
    <div className="grid grid-cols-12 min-h-screen w-full bg-[#f3f4f7]">
      <div className="col-span-12 md:col-span-6 h-full flex items-center justify-center">
        <div className="max-w-80 w-full">
          <Logo className="w-40 h-28 bg-contain bg-[#5bcae4]" src="bg-logoText" />
          <h1 className="rubik-bold text-xl text-midnightPlum mt-6 mb-5">Welcome Back!</h1>
          <div className="flex flex-col">
            {auth.phoneNumberVerified ? (
              <form onSubmit={submitCode} className="flex flex-col w-full">
                <div className="flex flex-col">
                  <label htmlFor="code" className="text-13 rubik-regular text-midnightPlum mb-2 ">
                    Code
                  </label>
                  <input
                    name="code"
                    onChange={handleInput}
                    value={(inputs.code as string) || ''}
                    className={`${inputStyles} mb-7 bg-transparent placeholder:text-[#cccdd1]`}
                    aria-label="Enter Code"
                    placeholder="Code"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-sm shadow-submit h-[50px] w-full content-center uppercase bg-neonSkyAqua text-white text-sm rubik poppins-regular"
                >
                  Enter Code
                </button>
                {isActive && (
                  <div className="text-sm poppins-regular text-white my-2">{formattedTime}</div>
                )}
                {error && <span className="text-sm poppins-regular text-white">{error}</span>}
              </form>
            ) : (
              <form onSubmit={submitPhoneNumber} className="flex flex-col w-full">
                <div className="flex flex-col">
                  <label htmlFor="code" className="text-13 rubik-regular text-midnightPlum mb-2">
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    onChange={handleInput}
                    value={(inputs.phoneNumber as string) || ''}
                    className={`${inputStyles} mb-7 bg-transparent placeholder:text-[#cccdd1]`}
                    aria-label="Enter Phone Number"
                    placeholder="Phone Number"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-sm shadow-submit h-[50px] w-full content-center uppercase bg-neonSkyAqua text-white text-sm rubik poppins-regular"
                >
                  Enter Phone Number
                </button>
                {error && <span className="text-sm poppins-regular text-white">{error}</span>}
              </form>
            )}
            <Link
              href="/auth/register"
              className="text-sm text-white poppins-regular relative z-10"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
