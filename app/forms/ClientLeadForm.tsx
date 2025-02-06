'use client'

import React, { FC, FormEvent } from 'react'
import BubbleBtn from '../components/common/BubbleBtn'
import useForm from '../hooks/useForm'
import { ClientLeadFormProps } from '../types/form.types'
import { useCreateClientLeadMutation } from '../redux/services/clientLeadApi'
import { CLIENT_LEAD_INITIAL_FIELDS } from '@/public/data/initial-form-inputs.data'
import validateClientLeadForm from '../validations/validateClientLeadForm'
import Spinner from '../components/common/Spinner'
import CreateClientLeadModal from '../modals/CreateClientLeadModal'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import { setCloseModalClientLeadCreated, setCloseModalClientLeadPublic, setOpenModalClientLeadCreated } from '../redux/features/appSlice'

const ClientLeadForm: FC<ClientLeadFormProps> = ({ formStyles, inputStyles, selectStyles, buttonStyles, errorStyles, bubbleColor }) => {
  const dispatch = useAppDispatch()
  const { inputs, handleInput, handleSelect, setInputs, setErrors, errors, submitted, setSubmitted } = useForm(
    CLIENT_LEAD_INITIAL_FIELDS,
    validateClientLeadForm
  )
  const [createClientLead, { isLoading }] = useCreateClientLeadMutation()
  const { openModalClientLeadCreated } = useAppSelector((state: RootState) => state.app)
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  const reset = () => {
    dispatch(setCloseModalClientLeadCreated())
    dispatch(setCloseModalClientLeadPublic())
    setErrors({})
    setInputs({})
    setSubmitted(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const isValid = validateClientLeadForm(inputs, setErrors)
    if (!isValid) return

    await createClientLead(inputs)
      .unwrap()
      .then(() => {
        dispatch(setOpenModalClientLeadCreated())
      })
      .catch(() => {})
  }

  return (
    <>
      {openModalClientLeadCreated && (
        <CreateClientLeadModal
          show={openModalClientLeadCreated}
          inputs={inputs}
          reset={reset}
          logoValue={textBlockMap?.HEADER?.headerLogoFile?.value}
        />
      )}
      <form onSubmit={handleSubmit} className={formStyles}>
        <div className="col-span-12 md:col-span-6 990:col-span-3 flex flex-col">
          <input
            disabled={isLoading}
            autoComplete="on"
            name="name"
            onChange={handleInput}
            className={`${inputStyles} border-2 ${
              submitted && errors.name ? 'border-frostbite hover:border-frostbite' : 'border-neonIce hover:border-iceberg'
            }`}
            aria-label="name"
            placeholder="Name"
            value={inputs.name || ''}
          />
          {submitted && errors.name && <span className={`${errorStyles} text-13 mt-0.5`}>{errors.name}</span>}
        </div>
        <div className="col-span-12 md:col-span-6 990:col-span-3 flex flex-col">
          <input
            disabled={isLoading}
            autoComplete="on"
            type="tel"
            name="phoneNumber"
            onChange={(e) => {
              const input = e.target as HTMLInputElement
              setInputs((prev) => ({ ...prev, phoneNumber: input.value.replace(/[^0-9()+-\s]/g, '') }))
            }}
            className={`${inputStyles} border-2 ${
              submitted && errors.phoneNumber ? 'border-frostbite hover:border-frostbite' : 'border-neonIce hover:border-iceberg'
            }`}
            aria-label="phoneNumber"
            placeholder="Phone Number"
            value={(inputs.phoneNumber as string) || ''}
          />
          {submitted && errors.phoneNumber && <span className={`${errorStyles} text-13 mt-0.5`}>{errors.phoneNumber}</span>}
        </div>
        <select
          disabled={isLoading}
          autoComplete="on"
          name="serviceType"
          onChange={handleSelect}
          className={`${selectStyles}`}
          aria-label="Service"
          value={(inputs.serviceType as string) || ''}
        >
          {['Residential', 'Commercial', 'Biohazard'].map((service: string) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        <button disabled={isLoading} type="submit" className={`${buttonStyles}`}>
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spinner fill="fill-neonIce" wAndH="w-7 h-7" />
            </div>
          ) : (
            <BubbleBtn bubbleColor={`${bubbleColor || 'bg-white'}`} text="Submit Now" />
          )}
        </button>
      </form>
    </>
  )
}

export default ClientLeadForm
