import React from 'react'
import SectionHeader from '../common/SectionHeader'
import { whyChooseUs } from '@/public/data/home.data'
import EditableTextArea from '../common/EditableTextArea'
import EditableImage from '../common/EditableImage'

const WhyChooseUsBlock = ({ textBlockMap }: any) => {
  return (
    <section className="relative bg-white">
      <div className="w-full 1200:w-1/2 px-4 990:px-4 1200:pr-20 1200:min-h-[870px] flex justify-center flex-col py-44 1200:py-0">
        <div className="1200:max-w-screen-md w-full ml-auto flex flex-col relative z-10">
          <SectionHeader
            subtitle={textBlockMap?.WHY_CHOOSE_US_BLOCK?.whyChooseUsBlockSubtitle}
            subtitleName="whyChooseUsBlockSubtitle"
            title={textBlockMap?.WHY_CHOOSE_US_BLOCK?.whyChooseUsBlockTitle}
            titleName="whyChooseUsBlockTitle"
            type="WHY_CHOOSE_US_BLOCK"
            rows={1}
          />
          <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
            {whyChooseUs(textBlockMap).map((why, i) => (
              <div
                data-aos="fade-up"
                data-aos-delay={i * 100}
                key={i}
                className="col-span-12 md:col-span-6 px-5 py-10 border-1 border-gray-200 min-w-60"
              >
                <div className="flex items-center justify-between mb-8">
                  {why.icon}
                  <span className="text-skyAqua font-rubik text-5xl">{why.num}</span>
                </div>
                <EditableTextArea
                  tag="span"
                  initialValue={why.text}
                  type="WHY_CHOOSE_US_BLOCK"
                  textBlockKey={why.name}
                  className="text-[17px] font-semibold text-espresso"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative 1200:absolute z-20 top-0 right-0 h-full w-full 1200:w-1/2 1200:min-h-[870px] bg-white">
        <EditableImage
          src={textBlockMap?.WHY_CHOOSE_US_BLOCK?.whyChooseUsBlockFile?.value}
          type="WHY_CHOOSE_US_BLOCK"
          textBlockKey="whyChooseUsBlockFile"
          className="object-cover w-full h-[500px] 1200:h-full"
          priority={false}
        />
      </div>
    </section>
  )
}

export default WhyChooseUsBlock
