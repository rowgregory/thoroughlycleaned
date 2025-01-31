import React from 'react'
import ClientLeadForm from '@/app/forms/ClientLeadForm'
import EditableTextArea from '../common/EditableTextArea'

const ConnectWithUsBlock = ({ textBlockMap }: any) => {
  return (
    <section className="bg-sunny px-4 990:px-12 xl:px-4 py-20">
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] w-full mx-auto">
        <EditableTextArea
          tag="h1"
          initialValue={textBlockMap?.HOME_PAGE_CLIENT_LEAD?.clientLeadFormTitle}
          type="HOME_PAGE_CLIENT_LEAD"
          textBlockKey="clientLeadFormTitle"
          className="text-[28px] sm:text-3xl font-bold text-jetBlack cursor-pointer"
        />
        <ClientLeadForm
          formStyles="grid grid-cols-12 gap-y-5 md:gap-x-8 mt-7"
          inputStyles="h-[56px] bg-white p-4 border-2 border-white focus:border-skyAqua focus:outline-none text-[#4a4a4a] placeholder:text-[#4a4a4a]"
          selectStyles="h-[56px] col-span-12 md:col-span-6 990:col-span-3 bg-white p-4 text-[#4a4a4a] border-2 border-white focus:border-skyAqua focus:outline-none"
          buttonStyles="h-[56px] col-span-12 md:col-span-6 990:col-span-3"
          errorStyles="text-red-500"
        />
      </div>
    </section>
  )
}

export default ConnectWithUsBlock
