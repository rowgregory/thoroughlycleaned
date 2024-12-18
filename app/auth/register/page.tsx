import React from 'react'
import RegisterForm from '@/app/forms/RegisterForm'
import Logo from '@/app/components/common/Logo'
import Link from 'next/link'

const Register = () => {
  return (
    <div className="grid grid-cols-12 min-h-screen w-full bg-[#f3f4f7]">
      <div className="col-span-12 md:col-span-6 h-full flex items-center justify-center">
        <div className="max-w-80 w-full">
          <Logo className="w-40 h-28 bg-contain bg-[#5bcae4]" src="bg-logoText" />
          <h1 className="rubik-bold text-xl text-midnightPlum mt-6 mb-5">Welcome!</h1>
          <div className="flex flex-col">
            <RegisterForm />
            <Link href="/auth/login" className="text-sm rubik-regular text-midnightPlum mt-8">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
