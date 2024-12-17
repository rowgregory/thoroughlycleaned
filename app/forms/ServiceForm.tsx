import React, { FC } from 'react'
import Link from 'next/link'
import { inputStyles } from '@/public/data/form.styles'
import DragAndDropUploader from '../components/common/DragAndDropUploader'
import { ServiceFormProps } from '../types/form.types'

const ServiceForm: FC<ServiceFormProps> = ({
  handleSubmit,
  handleInput,
  inputs,
  setInputs,
  isCreate
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <DragAndDropUploader inputs={inputs} setInputs={setInputs} />
      <div className="flex flex-col mb-6">
        <label htmlFor="name" className="text-sm rubik-regular text-midnightPlum mb-2">
          Name
        </label>
        <input
          name="name"
          onChange={handleInput}
          className={inputStyles}
          placeholder="Name"
          aria-label="Name"
          value={(inputs.name as string) || ''}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="description" className="text-sm rubik-regular text-midnightPlum mb-2">
          Description
        </label>
        <input
          name="description"
          onChange={handleInput}
          className={inputStyles}
          placeholder="Description"
          aria-label="Description"
          value={(inputs.description as string) || ''}
        />
      </div>
      <div className="flex items-center gap-x-5">
        <button
          type="submit"
          className="py-3 px-4 rounded-[4px] bg-neonSkyAqua text-white shadow-submit text-sm rubik-thin tracking-wide"
        >
          {isCreate ? 'Create' : 'Update'}
        </button>
        <Link href="/admin/services" className="text-sm rubik-thin tracking-wide">
          Cancel
        </Link>
      </div>
    </form>
  )
}

export default ServiceForm
