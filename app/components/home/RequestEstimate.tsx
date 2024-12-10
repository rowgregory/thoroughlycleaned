import React from 'react'
import RequestEstimateForm from '@/app/forms/RequestEstimateForm'

const RequestEstimate = () => {
  return (
    <section className="bg-sunny px-4 990:px-12 xl:px-4 py-20">
      <div className="max-w-2xl 990:max-w-screen-xl w-full mx-auto">
        <h1 className="text-[28px] sm:text-3xl poppins-bold mb-7 text-jetBlack">
          Get a Price Estimate
        </h1>
        <RequestEstimateForm
          formStyles="grid grid-cols-12 gap-y-5 md:gap-x-8"
          inputStyles="col-span-12 md:col-span-6 990:col-span-3 bg-white p-4 border-2 border-white focus:border-skyAqua focus:outline-none"
          selectStyles="col-span-12 md:col-span-6 990:col-span-3 bg-white p-4 text-[#adadb7] border-2 border-white focus:border-skyAqua focus:outline-none"
          buttonStyles="col-span-12 md:col-span-6 990:col-span-3"
        />
      </div>
    </section>
  )
}

export default RequestEstimate
