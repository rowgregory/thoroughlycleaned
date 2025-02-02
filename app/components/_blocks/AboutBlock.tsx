import React from 'react'
import SectionHeader from '../common/SectionHeader'
import { about } from '@/public/data/home.data'
import EditableImage from '../common/EditableImage'
import EditableTextArea from '../common/EditableTextArea'
import GridSmallYellowCircles from '@/app/icons/GridSmallYellowCircles'
import SkeletonLoader from '../app/SkeleonLoader'
import Leaf from '../common/Leaf'

const AboutBlock = ({ textBlockMap, isLoading }: any) => {
  return (
    <section className="px-4 990:px-12 xl:px-4 bg-white">
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full py-32 grid grid-cols-12 gap-y-8 md:gap-x-16 items-center relative">
        <div
          className={`order-2 990:order-1 flex items-center h-fit col-span-12 990:col-span-6 relative before:absolute before:content-[''] before:bg-sunny before:w-40 before:h-40 before:-bottom-5 before:-left-5 before:z-0`}
        >
          <div className="animate-translateYBackForth absolute -top-8 -right-2">
            <GridSmallYellowCircles />
          </div>
          <Leaf textBlockMap={textBlockMap} />
          {isLoading ? (
            <SkeletonLoader className="w-full h-full relative aspect-square" />
          ) : (
            <EditableImage
              src={textBlockMap?.aboutBlockFile?.value}
              type="ABOUT_BLOCK"
              textBlockKey="aboutBlockFile"
              className="h-full w-full relative"
              priority={true}
            />
          )}
        </div>
        <div className="order-1 990:order-2 col-span-12 990:col-span-6">
          <SectionHeader
            subtitle={textBlockMap?.aboutBlockSubtitle}
            subtitleName="aboutBlockSubtitle"
            title={textBlockMap?.aboutBlockTitle}
            titleName="aboutBlockTitle"
            type="ABOUT_BLOCK"
          />
          <EditableTextArea
            tag="p"
            initialValue={textBlockMap?.aboutBlockParagraph}
            type="ABOUT_BLOCK"
            textBlockKey="aboutBlockParagraph"
            className="text-espresso"
          />
          <div className="mt-14">
            {about(textBlockMap).map((about, i) => (
              <div key={i} className="grid grid-cols-12 mb-12">
                <div className="col-span-12 480:col-span-3">
                  <div className="w-full h-auto">{about.icon}</div>
                </div>
                <div className="col-span-12 480:col-span-9 flex flex-col gap-y-1">
                  <EditableTextArea
                    tag="h3"
                    initialValue={about.titleKey}
                    type="ABOUT_BLOCK"
                    textBlockKey={about.serviceCategoryName}
                    className="font-bold text-xl text-charcoalBlack"
                  />
                  <EditableTextArea
                    tag="h4"
                    initialValue={about.textKey}
                    type="ABOUT_BLOCK"
                    textBlockKey={about.serviceCategoryDescName}
                    className="text-espresso text-15"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutBlock
