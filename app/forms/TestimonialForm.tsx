import React, { FC } from 'react'
import Link from 'next/link'
import { inputStyles } from '@/public/data/form.styles'
import { TestimonialFormProps } from '../types/form.types'

const TestimonialForm: FC<TestimonialFormProps> = ({
  handleSubmit,
  handleInput,
  inputs,
  isCreate
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-6">
        <label htmlFor="name" className="text-sm rubik-regular text-midnightPlum mb-2">
          Name
        </label>
        <input
          name="name"
          onChange={handleInput}
          className={`shadow-input ${inputStyles}`}
          placeholder="Name"
          aria-label="Name"
          value={(inputs.name as string) || ''}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="review" className="text-sm rubik-regular text-midnightPlum mb-2">
          Review
        </label>
        <input
          name="review"
          onChange={handleInput}
          className={inputStyles}
          placeholder="Review"
          aria-label="Review"
          value={(inputs.review as string) || ''}
        />
      </div>
      <div className="flex flex-col mb-6">
        <label htmlFor="reviewTitle" className="text-sm rubik-regular text-midnightPlum mb-2">
          Review Title
        </label>
        <input
          name="reviewTitle"
          onChange={handleInput}
          className={inputStyles}
          placeholder="Review Title"
          aria-label="Review Title"
          value={(inputs.reviewTitle as string) || ''}
        />
      </div>
      <div className="flex items-center gap-x-5">
        <button
          type="submit"
          className="py-3 px-4 rounded-[4px] bg-neonSkyAqua text-white shadow-submit text-sm rubik-thin tracking-wide"
        >
          {isCreate ? 'Create' : 'Update'}
        </button>
        <Link href="/admin/testimonials" className="text-sm rubik-thin tracking-wide">
          Cancel
        </Link>
      </div>
    </form>
  )
}

export default TestimonialForm
