'use client'

import React from 'react'
import PageBanner from '../components/common/PageBanner'
import SectionHeader from '../components/common/SectionHeader'
import EditableTextArea from '../components/common/EditableTextArea'
import { navigationDrawerData } from '@/public/data/app.data'
import AwesomeIcon from '../components/common/AwesomeIcon'
import NahantMap from '../components/admin/NahantMap'
import { RootState, useAppSelector } from '../redux/store'

const Contact = () => {
  const { textBlockMap } = useAppSelector((state: RootState) => state.textBlock)

  return (
    <>
      <PageBanner
        type="CONTACT_PAGE"
        fileNameKey="contactPageBannerFile"
        titleNameKey="contactPageTitle"
        subtitleNameKey="contactPageSubtitle"
        textBlockMap={textBlockMap}
      />
      <section className="px-4 990:px-12 xl:px-4 bg-white">
        <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full py-32 grid grid-cols-12 gap-y-16 md:gap-x-8 items-center relative">
          <div className="col-span-12 990:col-span-6">
            <SectionHeader
              subtitle={textBlockMap?.CONTACT_PAGE?.contactPageSubtitle}
              subtitleName="contactPageSubtitle"
              title={textBlockMap?.CONTACT_PAGE?.contactPageTitle}
              titleName="contactPageTitle"
              type="CONTACT_PAGE"
            />
            <EditableTextArea
              tag="p"
              initialValue={textBlockMap?.CONTACT_PAGE?.contactPageParagraph}
              type="CONTACT_PAGE"
              textBlockKey="contactPageParagraph"
              className="text-espresso"
            />
            <div className="flex flex-col gap-y-10 mt-10">
              {navigationDrawerData(textBlockMap).map((item, i) => (
                <div key={i} className="grid grid-cols-12 group gap-x-3">
                  <div className="col-span-3 480:col-span-2 bg-neonIce rounded-full w-14 h-14 flex items-center justify-center">
                    <AwesomeIcon icon={item.icon} className="w-6 h-6 text-iceberg" />
                  </div>
                  <div className="col-span-9 480:col-span-10 flex flex-col">
                    <h1 className="font-bold text-gray-800 mb-1">{item.h1}</h1>
                    <EditableTextArea
                      tag="h2"
                      initialValue={item.h2}
                      type="HEADER"
                      textBlockKey={item.name}
                      className="text-gray-800 text-13 480:text-15"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 990:col-span-6 relative aspect-video 990:aspect-square h-full w-full">
            <NahantMap latitude={42.4266} longitude={-70.9223} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
