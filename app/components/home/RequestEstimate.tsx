'use client'

import useForm from '@/app/hooks/useForm'
import React, { FormEvent } from 'react'
import BubbleBtn from '../common/BubbleBtn'

const RequestEstimage = () => {
  const { inputs, handleInput, handleSelect } = useForm([
    'name',
    'number',
    { service: 'Residential' }
  ])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (
      Object.keys(inputs).length > 0 &&
      Object.values(inputs).every((value) => value !== undefined)
    ) {
      console.log('Submitting...', inputs)
    }
  }

  return (
    <div className="bg-sunny px-4 lg:px-12 xl:px-4 py-20">
      <div className="max-w-screen-sm lg:max-w-screen-xl w-full mx-auto">
        <h3 className="text-[28px] sm:text-3xl poppins-bold mb-7">Get a Price Estimate</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-y-5 md:gap-x-8">
          <input
            name="name"
            onChange={handleInput}
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-white p-4 border-2 border-white focus:border-skyAqua focus:outline-none "
            aria-label="name"
            placeholder="Your Name"
          />
          <input
            name="number"
            onChange={handleInput}
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-white p-4 border-2 border-white focus:border-skyAqua focus:outline-none "
            aria-label="number"
            placeholder="Your Number"
          />
          <select
            name="service"
            onChange={handleSelect}
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-white p-4 text-[#adadb7] border-2 border-white focus:border-skyAqua focus:outline-none "
            aria-label="Service"
            value={(inputs.service as string) || ''}
          >
            {['Residential', 'Commercial', 'Biohazard'].map((service: string) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <button type="submit" className="col-span-12 md:col-span-6 lg:col-span-3">
            <BubbleBtn bubbleColor="bg-white" text="Submit Now" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default RequestEstimage
