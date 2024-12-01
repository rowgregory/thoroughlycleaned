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
    <div className="bg-sunny py-20">
      <div className="max-w-screen-sm lg:max-w-screen-xl w-full mx-auto">
        <h3 className="text-3xl poppins-bold mb-7">Get a Price Estimate</h3>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-y-5 md:gap-x-8">
          <input
            name="name"
            onChange={handleInput}
            className="bg-white p-4 flex-1 border-2 border-white focus:border-royal focus:outline-none "
            aria-label="name"
            placeholder="Your Name"
          />
          <input
            name="number"
            onChange={handleInput}
            className="bg-white p-4 flex-1 border-2 border-white focus:border-royal focus:outline-none "
            aria-label="number"
            placeholder="Your Number"
          />
          <select
            name="service"
            onChange={handleSelect}
            className="bg-white p-4 flex-1 text-[#adadb7] border-2 border-white focus:border-royal focus:outline-none "
            aria-label="Service"
            value={(inputs.service as string) || ''}
          >
            {['Residential', 'Commercial', 'Biohazard'].map((service: string) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <button type="submit" className="flex-1">
            <BubbleBtn bubbleColor="bg-white" text="Submit Now" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default RequestEstimage
