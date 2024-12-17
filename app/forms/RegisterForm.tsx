import React, { FC } from 'react'
import { RegisterFormProps } from '../types/form.types'

const RegisterForm: FC<RegisterFormProps> = ({
  handleSubmit,
  handleInput,
  handleToggle,
  inputs
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 w-full relative z-40"
    >
      <input
        name="firstName"
        onChange={handleInput}
        value={(inputs.firstName as string) || ''}
        className="bg-white p-4 w-full border-[3px] border-sunny focus:border-sunny focus:outline-none"
        aria-label="Enter First Name"
        placeholder="Enter First Name"
      />
      <input
        name="lastName"
        onChange={handleInput}
        value={(inputs.lastName as string) || ''}
        className="bg-white p-4 w-full border-[3px] border-sunny focus:border-sunny focus:outline-none"
        aria-label="Enter Last Name"
        placeholder="Enter Last Name"
      />
      <input
        name="phoneNumber"
        onChange={handleInput}
        value={(inputs.phoneNumber as string) || ''}
        className="bg-white p-4 w-full border-[3px] border-sunny focus:border-sunny focus:outline-none"
        aria-label="Enter Phone Number"
        placeholder="Enter Phone Number"
      />
      <div className="flex justify-start items-center my-6 gap-x-3">
        <input type="checkbox" name="consentToSMS" onChange={handleToggle} className="" />
        <label htmlFor="consentToSMS" className="text-white text-sm">
          By registering, you agree to receive text messages from potential clients.
        </label>
      </div>
      <button type="submit" className="p-4 border-[3px] border-sunny w-full h-full text-white">
        Register
      </button>
    </form>
  )
}

export default RegisterForm
