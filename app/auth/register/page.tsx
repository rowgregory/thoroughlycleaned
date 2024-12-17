'use client'

import React, { FormEvent } from 'react'
import useForm from '@/app/hooks/useForm'
import RegisterForm from '@/app/forms/RegisterForm'
import { useRegisterMutation } from '@/app/redux/services/authApi'

const Register = () => {
  const { inputs, handleInput, handleToggle } = useForm([
    'firstName',
    'lastName',
    'phoneNumber',
    'consentToSMS'
  ])
  const [register] = useRegisterMutation()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await register(inputs)
      .unwrap()
      .then(() => console.log('REGISTER COMPLETE'))
      .catch((err: any) => console.warn(err))
  }

  return (
    <div
      className="px-4 py-20 w-full bg-cover bg-center bg-no-repeat min-h-[calc(100vh-128px)]"
      style={{ backgroundImage: `url('/images/login-bg.png')` }}
    >
      <div className="relative max-w-sm w-full mx-auto">
        <div className="animate-translateXBackForth bg-sunny w-24 h-24 absolute z-0 -bottom-4 -left-8"></div>
        <div className={`overflow-hidden bg-skyAqua relative z-20 login-shape flex flex-col p-5`}>
          <span className="text-4xl text-skyAqua relative z-30 mb-32 poppins-bold">Register</span>
          <div className="animate-translateYBackForth bg-clearBubbles z-10 bg-contain bg-center bg-no-repeat absolute w-full h-full -bottom-12 left-0 right-0"></div>
          <RegisterForm
            handleSubmit={handleSubmit}
            handleInput={handleInput}
            handleToggle={handleToggle}
            inputs={inputs}
          />
        </div>
      </div>
    </div>
  )
}

export default Register
