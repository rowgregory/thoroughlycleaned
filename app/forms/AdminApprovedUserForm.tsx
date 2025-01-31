import { adminModalInputStyles } from '@/public/data/form.styles'
import React, { FC } from 'react'
import AdminFormFooter from '../components/admin/AdminFormFooter'
import { Errors, Inputs } from '../types/common.types'

interface AdminApprovedUserFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputs: Inputs
  submitted: boolean
  errors: Errors
  reset: () => void
  isLoading: boolean
  isUpdating: boolean
  error: string
}

const AdminApprovedUserForm: FC<AdminApprovedUserFormProps> = ({
  handleSubmit,
  handleInput,
  inputs,
  submitted,
  errors,
  reset,
  isLoading,
  isUpdating,
  error
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full pb-20 990:pb-0">
      <div className="py-20 max-w-md mx-auto flex flex-col h-full w-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="bg-manageApprovedUsersIconAdmin bg-contain bg-center bg-no-repeat w-14 h-14" />
          <h1 className="font-rubik text-white text-xl mt-5 mb-2">{isUpdating ? 'Update' : 'Create'} Approved User</h1>
          <p className="text-sm text-[#7e7e7e] text-center font-rubik">
            {isUpdating
              ? 'Update approved users who can access the backend by modifying their name, phone number, or selected color from the dots. Once updated, the changes will reflect immediately, and the user will retain access to the backend. You can also remove users if needed.'
              : "Add approved users who can access the backend by entering their name, phone number, and selecting a color from the dots. Then, click 'Add User' to create a new approved user. Once added, the user can create an account, log in, and access the backend. You can also edit or remove existing users as needed."}
          </p>
          <div className="flex flex-col w-full my-7">
            <input
              name="name"
              onChange={handleInput}
              className={`${adminModalInputStyles} dark-input h-[55px]`}
              placeholder="Name"
              aria-label="Name"
              value={(inputs.name as string) || ''}
            />
            {submitted && errors?.name && <span className="text-13 mt-0.5 font-rubik text-red-500">{errors?.name}</span>}
          </div>
          <div className="flex flex-col w-full mb-7">
            <input
              name="phoneNumber"
              onChange={handleInput}
              className={`${adminModalInputStyles} dark-input h-[55px]`}
              placeholder="Phone Number"
              aria-label="Phone Number"
              value={(inputs.phoneNumber as string) || ''}
            />
            {submitted && errors?.phoneNumber && <span className="text-13 mt-0.5 font-rubik text-red-500">{errors?.phoneNumber}</span>}
          </div>
          {errors?.invalidNumber && (
            <span className="text-13 mt-0.5 font-rubik text-red-500 absolute bottom-3 right-3">{errors?.invalidNumber}</span>
          )}
        </div>
      </div>
      {error && (
        <div className="flex w-full max-w-md justify-end mb-1">
          <div className="text-sm text-red-500 font-rubik">{error}</div>
        </div>
      )}
      <AdminFormFooter reset={reset} isUpdating={isUpdating} type="Approved User" loading={isLoading} />
    </form>
  )
}

export default AdminApprovedUserForm
