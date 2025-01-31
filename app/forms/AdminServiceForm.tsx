import React, { FC } from 'react'
import Picture from '../components/common/Picture'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { uploadIcon } from '../icons'
import { adminModalInputStyles } from '@/public/data/form.styles'
import { SERVICE_TYPES } from '@/public/data/common.data'
import { AdminServiceFormProps } from '../types/form.types'
import AdminFormFooter from '../components/admin/AdminFormFooter'

const AdminServiceForm: FC<AdminServiceFormProps> = ({
  handleSubmit,
  isUpdating,
  handleDrop,
  inputRef,
  inputs,
  handleFileChange,
  errors,
  submitted,
  handleInput,
  handleSelect,
  reset,
  loading,
  error
}) => {
  const characterCount = (inputs.description || '').length
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full pb-20 1200:pb-0">
      <div className="py-20 max-w-md mx-auto flex flex-col h-full w-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="bg-createServiceIconAdmin bg-contain bg-center bg-no-repeat w-14 h-14" />
          <h1 className="rubik-regular text-white text-xl mt-5 mb-2">{isUpdating ? 'Update' : 'Create'} Service</h1>
          <p className="text-sm text-[#7e7e7e] text-center rubik-regular mb-8">
            {isUpdating
              ? 'When updating a service, you can upload a new photo, edit the name and title, and update the form. Please note: if a new image is uploaded, it will replace the existing one, and the old image will be deleted from Firebase storage automatically.'
              : 'Upload a photo, provide the name and title for your service, and submit the form.'}
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
              name="name"
              onChange={handleInput}
              className={`${adminModalInputStyles} dark-input`}
              placeholder="Name"
              aria-label="Name"
              value={inputs.name || ''}
            />
            {submitted && errors?.name && (
              <span className={`text-13 mt-0.5 rubik-regular text-red-500 whitespace-nowrap`}>{errors?.name}</span>
            )}
          </div>
          <div className="flex flex-col w-full mb-4">
            <textarea
              rows={3}
              name="description"
              onChange={handleInput}
              className={`${characterCount > 500 ? 'border-red-500 focus:shadow-red-500' : ''} dark-input ${adminModalInputStyles}`}
              placeholder="Description"
              aria-label="Description"
              value={inputs.description || ''}
            />
            <div className="flex items-center justify-between">
              {submitted && errors?.description && (
                <span className="text-13 mt-0.5 rubik-regular text-red-500 whitespace-nowrap">{errors?.description}</span>
              )}
              <div className="text-xs rubik-light text-[#6e6e70] mt-1 flex w-full justify-end self-end">
                {`${characterCount} / 500`} characters
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <select
              id="adminselect"
              name="serviceType"
              onChange={handleSelect}
              className={`${adminModalInputStyles} dark-input`}
              aria-label="Service Type"
              value={inputs.serviceType || ''}
            >
              {SERVICE_TYPES.map((service: string) => (
                <option key={service} value={service || 'Residential'}>
                  {service}
                </option>
              ))}
            </select>
            {submitted && errors?.serviceType && (
              <span className={`text-13 mt-0.5 rubik-regular text-red-500 whitespace-nowrap`}>{errors?.serviceType}</span>
            )}
          </div>
        </div>
      </div>
      {error && (
        <div className="flex w-full max-w-md justify-end mb-1">
          <div className="text-sm text-red-500 font-rubik">{error}</div>
        </div>
      )}
      <AdminFormFooter reset={reset} isUpdating={isUpdating} type="Service" loading={loading} />
    </form>
  )
}

export default AdminServiceForm
