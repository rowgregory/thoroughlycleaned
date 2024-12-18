'use client'

import React, { FC, FormEvent } from 'react'
import BubbleBtn from '../components/common/BubbleBtn'
import useForm from '../hooks/useForm'
import { PriceEstimateFormProps } from '../types/form.types'
import { useCreatePriceEstimateMutation } from '../redux/services/priceEstimateApi'
import { PRICE_ESTIMATE_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validatePriceEstimateForm from '../validations/validatePriceEstimateForm'
import { RootState, useAppSelector } from '../redux/store'
import Spinner from '../components/common/Spinner'

const PriceEstimateForm: FC<PriceEstimateFormProps> = ({
  formStyles,
  inputStyles,
  selectStyles,
  buttonStyles
}) => {
  const { inputs, handleInput, handleSelect, setErrors, errors } = useForm(
    PRICE_ESTIMATE_INITIAL_FIELDS
  )
  const [createPriceEstimate, { isLoading }] = useCreatePriceEstimateMutation()
  const priceEstimate = useAppSelector((state: RootState) => state.priceEstimate)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const isValid = validatePriceEstimateForm(inputs, setErrors)
    if (isValid) {
      await createPriceEstimate(inputs).unwrap()
    }
  }

  const responseMessage = `Thank you, ${inputs.name}! We’ve received your request for a ${inputs.serviceType} estimate. Our team will contact you shortly to provide the details.`

  return priceEstimate.success ? (
    <h1 className="text-jetBlack poppins-regular text-xl">{responseMessage}</h1>
  ) : (
    <form onSubmit={handleSubmit} className={formStyles}>
      <div className="col-span-12 md:col-span-6 990:col-span-3 flex flex-col">
        <input
          name="name"
          onChange={handleInput}
          className={inputStyles}
          aria-label="name"
          placeholder="Your Name"
          value={inputs.name || ''}
        />
        {errors.name && (
          <span className="text-13 mt-0.5 poppins-regular text-red-500">{errors.name}</span>
        )}
      </div>
      <div className="col-span-12 md:col-span-6 990:col-span-3 flex flex-col">
        <input
          name="phoneNumber"
          onChange={handleInput}
          className={inputStyles}
          aria-label="phoneNumber"
          placeholder="Your Phone Number"
          value={(inputs.phoneNumber as string) || ''}
        />
        {errors.phoneNumber && (
          <span className="text-13 mt-0.5 poppins-regular text-red-500">{errors.phoneNumber}</span>
        )}
      </div>
      <select
        name="serviceType"
        onChange={handleSelect}
        className={selectStyles}
        aria-label="Service"
        value={(inputs.serviceType as string) || ''}
      >
        {['Residential', 'Commercial', 'Biohazard'].map((service: string) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
      <button disabled={isLoading} type="submit" className={`${buttonStyles} bg-skyAqua`}>
        {isLoading ? (
          <Spinner wAndH="w-6 h-6" fill="fill-white" />
        ) : (
          <BubbleBtn bubbleColor="bg-white" text="Submit Now" />
        )}
      </button>
    </form>
  )
}

export default PriceEstimateForm
