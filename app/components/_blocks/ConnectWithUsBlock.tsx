import React from 'react'
import ClientLeadForm from '@/app/forms/ClientLeadForm'
import EditableTextArea from '../common/EditableTextArea'

const ConnectWithUsBlock = ({ textBlockMap }: any) => {
  return (
    <section className="bg-silver px-4 990:px-12 xl:px-4 py-20 relative z-10">
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] w-full mx-auto">
        <EditableTextArea
          tag="h1"
          initialValue={textBlockMap?.HOME_PAGE_CLIENT_LEAD?.clientLeadFormTitle}
          type="HOME_PAGE_CLIENT_LEAD"
          textBlockKey="clientLeadFormTitle"
          className="text-[28px] sm:text-3xl font-bold text-stealthGray"
        />
        <ClientLeadForm
          formStyles="grid grid-cols-12 gap-y-5 md:gap-x-8 mt-7"
          inputStyles="connect-with-us-input h-[56px] bg-neonIce p-4 font-medium focus:border-iceberg focus:outline-none text-white placeholder:text-white disabled:bg-iceberg disabled:border-iceberg shadow-publicInput"
          selectStyles="connect-with-us-input h-[56px] col-span-12 md:col-span-6 990:col-span-3 font-medium bg-neonIce p-4 text-white border-2 border-neonIce focus:border-iceberg focus:outline-none disabled:bg-iceberg disabled:border-iceberg disabled:opacity-100 shadow-publicInput hover:border-iceberg"
          buttonStyles="h-[56px] col-span-12 md:col-span-6 990:col-span-3 bg-neonIce disabled:bg-iceberg disabled:border-iceberg shadow-publicInput"
          errorStyles="text-frostbite font-medium"
          bubbleColor="bg-iceberg"
        />
      </div>
    </section>
  )
}

export default ConnectWithUsBlock
