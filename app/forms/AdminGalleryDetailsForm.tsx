import React, { FC } from 'react'
import AwesomeIcon from '../components/common/AwesomeIcon'
import { arrowRightIcon } from '../icons'
import { adminModalInputStyles } from '@/public/data/form.styles'
import { SERVICE_TYPES } from '@/public/data/common.data'
import { AdminGalleryDetailsFormProps } from '../types/photo-gallery.types'
import AdminFormFooter from '../components/admin/AdminFormFooter'

const AdminGalleryDetailsForm: FC<AdminGalleryDetailsFormProps> = ({
  handleSubmit,
  isUpdating,
  handleInput,
  inputs,
  submitted,
  handleSelect,
  errors,
  reset,
  loading,
  handleOpenGalleryPhotosModal,
  error
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full pb-20 1200:pb-0">
      <div className="py-20 max-w-md mx-auto flex flex-col h-full w-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="bg-photoGallerylIconAdmin bg-contain bg-center bg-no-repeat w-14 h-14" />
          <h1 className="rubik-regular text-white text-xl mt-5 mb-2">{isUpdating ? 'Update' : 'Create'} album</h1>
          <p className="text-sm text-[#7e7e7e] text-center rubik-regular">
            Update the album details by modifying the album name or selecting a new service type. After submitting your changes, you can
            manage the before and after images in the album to reflect the transformations of your cleaning projects.
          </p>
          {isUpdating && (
            <div className="flex items-center gap-x-2 mb-10 mt-1.5">
              <button type="button" onClick={handleOpenGalleryPhotosModal} className="text-neonSkyAqua font-rubik text-left w-fit">
                Edit photo pairs
              </button>
              <AwesomeIcon icon={arrowRightIcon} className="w-4 h-4 text-neonSkyAqua -rotate-45" />
            </div>
          )}
          <div className="flex flex-col w-full my-7">
            <input
              name="name"
              onChange={handleInput}
              className={`${adminModalInputStyles} h-[55px]`}
              placeholder="Project Name"
              aria-label="Project Name"
              value={inputs.name || ''}
            />
            {submitted && errors?.name && <span className="text-13 mt-0.5 font-rubik text-red-500">{errors?.name}</span>}
          </div>
          <div className="flex flex-col w-full">
            <select
              name="serviceType"
              onChange={handleSelect}
              className={adminModalInputStyles}
              aria-label="Service"
              value={inputs.serviceType || ''}
            >
              {SERVICE_TYPES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {submitted && errors?.serviceType && <span className="text-13 mt-0.5 font-rubik text-red-500">{errors?.serviceType}</span>}
          </div>
        </div>
      </div>
      <AdminFormFooter reset={reset} isUpdating={isUpdating} type="Album" loading={loading} error={error} />
    </form>
  )
}

export default AdminGalleryDetailsForm
