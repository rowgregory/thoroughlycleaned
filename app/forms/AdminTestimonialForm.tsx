import React, { FC } from 'react'
import { adminModalInputStyles } from '@/public/data/form.styles'
import { SERVICE_TYPES } from '@/public/data/common.data'
import { AdminTestimonialFormProps } from '../types/admin.types'
import AdminFormFooter from '../components/admin/AdminFormFooter'
import AdminErrorText from '../components/admin/AdminErrorText'

const AdminTestimonialForm: FC<AdminTestimonialFormProps> = ({
  handleSubmit,
  reset,
  isUpdating,
  handleInput,
  inputs,
  submitted,
  errors,
  handleSelect,
  loading,
  error
}) => {
  const characterCount = (inputs.review || '')?.length

  const inputFields = [
    {
      name: 'reviewTitle',
      placeholder: 'Review Title',
      value: inputs.reviewTitle || '',
      error: errors?.reviewTitle
    },
    {
      name: 'review',
      placeholder: 'Review',
      value: inputs.review || '',
      error: errors?.review,
      isTextArea: true
    },
    {
      name: 'name',
      placeholder: 'Client Name',
      value: inputs.name || '',
      error: errors?.name
    },
    {
      name: 'serviceType',
      placeholder: 'Service Type',
      value: inputs.serviceType || '',
      error: errors?.serviceType,
      isSelect: true,
      options: SERVICE_TYPES
    }
  ]

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full pb-20 1200:pb-0">
      <div className="py-20 max-w-md mx-auto flex flex-col h-full w-full">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="bg-createTestimonialIconAdmin bg-contain bg-center bg-no-repeat w-14 h-14" />
          <h1 className="font-rubik text-white text-xl mt-5 mb-2">{isUpdating ? 'Update' : 'Create'} Testimonial</h1>
          <p className="text-sm text-[#7e7e7e] text-center font-rubik mb-8">
            Enter the client&apos;s name, title, and review, then submit the form to save the testimonial.
          </p>
          <div className="flex flex-col gap-y-7 w-full">
            {inputFields.map(({ name, placeholder, value, error, isTextArea, isSelect, options }) => (
              <div key={name} className="flex flex-col w-full relative">
                {isTextArea ? (
                  <textarea
                    name={name}
                    onChange={handleInput}
                    className={`${adminModalInputStyles} ${characterCount > 500 ? 'border-red-500 focus:shadow-red-500' : ''}`}
                    placeholder={placeholder}
                    aria-label={placeholder}
                    value={value}
                    rows={3}
                  />
                ) : isSelect ? (
                  <select name={name} onChange={handleSelect} className={adminModalInputStyles} aria-label={placeholder} value={value}>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={name}
                    onChange={handleInput}
                    className={adminModalInputStyles}
                    placeholder={placeholder}
                    aria-label={placeholder}
                    value={value}
                  />
                )}
                {submitted && error && <AdminErrorText error={error} />}
              </div>
            ))}
          </div>
        </div>
      </div>
      {error && (
        <div className="flex w-full max-w-md justify-end mb-1">
          <div className="text-sm text-red-500 font-rubik">{error}</div>
        </div>
      )}
      <AdminFormFooter reset={reset} isUpdating={isUpdating} type="Testimonial" loading={loading} />
    </form>
  )
}

export default AdminTestimonialForm
