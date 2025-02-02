import React, { FC } from 'react'
import Picture from '../components/common/Picture'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { uploadIcon } from '../icons'
import { adminModalInputStyles } from '@/public/data/form.styles'
import AdminFormFooter from '../components/admin/AdminFormFooter'

const AdminTeamMemberForm: FC<any> = ({
  handleSubmit,
  isUpdating,
  handleDrop,
  inputRef,
  inputs,
  handleFileChange,
  errors,
  submitted,
  handleInput,
  reset,
  loading,
  error
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full pb-20 1200:pb-0">
      <div className="py-20 max-w-md mx-auto flex flex-col h-full w-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="bg-createServiceIconAdmin bg-contain bg-center bg-no-repeat w-14 h-14" />
          <h1 className="rubik-regular text-white text-xl mt-5 mb-2">{isUpdating ? 'Update' : 'Create'} Team Member</h1>
          <p className="text-sm text-[#7e7e7e] text-center rubik-regular mb-8">
            {isUpdating
              ? 'When updating a team member, you can upload a new photo, edit the name, position, years worked, and update the form.'
              : 'Upload a photo, provide the name, position, years worked, and other details for the team member.'}
          </p>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef?.current?.click()}
            className="w-44 max-h-44 h-auto border-2 border-dotted border-[#7e7e7e] aspect-video rounded-md flex flex-col items-center justify-center p-4 cursor-pointer relative"
          >
            {inputs?.url ? (
              <Picture src={inputs?.url} alt="Uploaded" className="w-full h-full object-contain" priority={true} />
            ) : (
              <>
                <AwesomeIcon icon={uploadIcon} className="w-3.5 h-3.5 mb-1.5 text-[#6a696f]" />
                <p className="text-xs rubik-regular text-[#6a696f] text-center">Drag & Drop or Click</p>
              </>
            )}
          </div>
          <input ref={inputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          {submitted && errors?.image && (
            <span className={`text-13 mt-0.5 rubik-regular text-red-500 whitespace-nowrap`}>{errors?.image}</span>
          )}
          <div className="flex flex-col w-full my-7">
            <input
              name="firstName"
              onChange={handleInput}
              className={`${adminModalInputStyles} dark-input`}
              placeholder="First Name"
              aria-label="First Name"
              value={inputs.firstName || ''}
            />
            {submitted && errors?.firstName && (
              <span className={`text-13 mt-0.5 rubik-regular text-red-500 whitespace-nowrap`}>{errors?.firstName}</span>
            )}
          </div>
          <div className="flex flex-col w-full mb-7">
            <input
              name="lastName"
              onChange={handleInput}
              className={`${adminModalInputStyles} dark-input`}
              placeholder="Last Name"
              aria-label="Last Name"
              value={inputs.lastName || ''}
            />
            {submitted && errors?.lastName && (
              <span className={`text-13 mt-0.5 rubik-regular text-red-500 whitespace-nowrap`}>{errors?.lastName}</span>
            )}
          </div>
          <div className="flex flex-col w-full mb-7">
            <input
              name="position"
              onChange={handleInput}
              className={`${adminModalInputStyles} dark-input`}
              placeholder="Position"
              aria-label="Position"
              value={inputs.position || ''}
            />
            {submitted && errors?.position && (
              <span className={`text-13 mt-0.5 rubik-regular text-red-500 whitespace-nowrap`}>{errors?.position}</span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <input
              name="yearsWorked"
              onChange={handleInput}
              className={`${adminModalInputStyles} dark-input`}
              placeholder="Years Worked"
              aria-label="Years Worked"
              value={inputs.yearsWorked || ''}
            />
            {submitted && errors?.yearsWorked && (
              <span className={`text-13 mt-0.5 rubik-regular text-red-500 whitespace-nowrap`}>{errors?.yearsWorked}</span>
            )}
          </div>
        </div>
      </div>
      {error && (
        <div className="flex w-full max-w-md justify-end mb-1">
          <div className="text-sm text-red-500 font-rubik">{error}</div>
        </div>
      )}
      <AdminFormFooter reset={reset} isUpdating={isUpdating} type="Team Member" loading={loading} />
    </form>
  )
}

export default AdminTeamMemberForm
