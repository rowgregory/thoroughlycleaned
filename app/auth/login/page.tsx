'use client'

import React from 'react'
import Link from 'next/link'
import { RootState, useAppSelector } from '@/app/redux/store'
import Logo from '@/app/components/common/Logo'
import LoginCodeForm from '@/app/forms/LoginCodeForm'
import LoginPhoneNumberForm from '@/app/forms/LoginPhoneNumberForm'

const Login = () => {
  const { phoneNumberVerified } = useAppSelector((state: RootState) => state.auth)

  return (
    <div className="grid grid-cols-12 min-h-screen w-full bg-[#f3f4f7]">
      <div className="col-span-12 md:col-span-6 h-full flex items-center justify-center">
        <div className="max-w-80 w-full">
          <Logo className="w-40 h-28 bg-contain bg-[#5bcae4]" src="bg-logoText" />
          <h1 className="rubik-bold text-xl text-midnightPlum mt-6 mb-5">Welcome Back!</h1>
          <div className="flex flex-col">
            {phoneNumberVerified ? (
              <LoginCodeForm phoneNumberVerified={phoneNumberVerified} />
            ) : (
              <LoginPhoneNumberForm />
            )}
            <Link href="/auth/register" className="text-sm rubik-regular text-midnightPlum mt-8">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
