'use client'

import React, { FormEvent, useRef } from 'react'
import { useUpdateProfileMutation } from '../redux/services/profileApi'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import useForm from '../hooks/useForm'
import { ADMIN_PROFILE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validateAdminProfileForm from '../validations/validateAdminProfileForm'
import { Errors, Inputs } from '../types/common.types'
import { setCloseModalProfileUpdate } from '../redux/features/profileSlice'
import AdminProfileInput from '../components/admin/AdminProfileInput'
import { userIcon } from '../icons'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { neonColors } from '@/public/data/admin.data'
import AdminFormFooter from '../components/admin/AdminFormFooter'

const adminProfileFormData = (inputs: Inputs, errors: Errors) => [
  {
    containerStyles: 'col-span-12 flex flex-col',
    name: 'firstName',
    label: 'First Name',
    value: inputs.firstName,
    error: errors.firstName
  },
  {
    containerStyles: 'col-span-12 flex flex-col',
    name: 'lastName',
    label: 'Last Name',
    value: inputs.lastName,
    error: errors.lastName
  },
  {
    containerStyles: 'col-span-12 flex flex-col',
    name: 'email',
    label: 'Email',
    value: inputs.email,
    error: errors.email
  },
  {
    containerStyles: 'col-span-12 flex flex-col',
    name: 'phoneNumber',
    label: 'Phone Number',
    value: inputs.phoneNumber,
    error: errors.phoneNumber
  }
]

const AdminProfileForm = () => {
  const checkBoxRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const { profile } = useAppSelector((state: RootState) => state.profile)
  const { inputs, errors, handleInput, handleToggle, setInputs, submitted, setSubmitted, setErrors } = useForm(
    ADMIN_PROFILE_INITIAL_FIELDS,
    validateAdminProfileForm,
    profile
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validateAdminProfileForm(inputs, setErrors)
    if (!isValid) return

    await updateProfile(inputs)
      .unwrap()
      .then(() => reset())
      .catch(() => {})
  }

  const reset = () => {
    setInputs({})
    setErrors({})
    dispatch(setCloseModalProfileUpdate())
    setSubmitted(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full pb-20 990:pb-0">
      <div className="py-20 max-w-md mx-auto flex flex-col h-full w-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <AwesomeIcon icon={userIcon} className={`w-10 h-10 mb-2`} style={{ color: profile.colorCode || '#008b9c' }} />
          <h1 className="font-rubik font-medium text-2xl text-white mb-2 text-center">Update profile</h1>
          <p className="text-sm text-[#7e7e7e] text-center rubik-regular mb-8">
            Keep your profile up-to-date with accurate and complete information.
          </p>
          <div className="flex flex-col gap-y-7 w-full">
            {adminProfileFormData(inputs, errors).map((formData, i) => (
              <AdminProfileInput key={i} {...formData} handleInput={handleInput} submitted={submitted} />
            ))}
            <p className="text-13 text-[#7e7e7e] pt-6 border-t-[0.5px] border-t-[#323232]">
              Pick a color to personalize your profile! It&apos;s just for you to see and adds a unique touch to your backend experience.
            </p>
            <div className="flex flex-col mb-7">
              <div className="flex flex-wrap gap-4 w-full">
                {neonColors.map((bgColor, i) => (
                  <div
                    onClick={() => setInputs((prev: any) => ({ ...prev, colorCode: bgColor }))}
                    key={i}
                    className={`flex cursor-pointer border-2  rounded-full items-center justify-center ${
                      bgColor === inputs.colorCode ? 'border-white' : 'border-transparent'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full m-0.5" style={{ backgroundColor: bgColor }} />
                  </div>
                ))}
              </div>
              {submitted && errors?.colorCode && <span className="text-13 mt-0.5 rubik-regular text-red-500">{errors?.colorCode}</span>}
            </div>
          </div>
          <div className="grid grid-cols-12 relative w-full">
            <button
              onClick={(e) => {
                e.preventDefault()
                checkBoxRef?.current?.click()
              }}
              className={`col-span-2 w-8 h-8 shadow-adminServiceCard flex items-center justify-center border-1 border-[#6e6e73] rounded-md`}
            >
              <div
                style={{ background: profile.colorCode || 'bg-skyAqua' }}
                className={`${inputs.isSoundEffectsOn ? 'w-5 h-5 rounded-sm' : ''}`}
              />
            </button>
            <input
              ref={checkBoxRef}
              type="checkbox"
              name="isSoundEffectsOn"
              onChange={handleToggle}
              checked={(inputs.isSoundEffectsOn as boolean) || false}
              className="hidden mt-1"
            />
            <div className="col-span-10 flex flex-col gap-y-1">
              <h4 className="text-white">Sound Effects</h4>
              <label htmlFor="isSoundEffectsOn" className={`mb-0 text-xs text-zinc-500`}>
                By checking this box, you turn off all sound effects.
              </label>
            </div>
          </div>
        </div>
      </div>
      <AdminFormFooter reset={reset} isUpdating={true} type="Profile" loading={isLoading} />
    </form>
  )
}

export default AdminProfileForm
