'use client'

import React, { FC } from 'react'
import { TextBlockMap } from '@/app/redux/features/textBlockSlice'
import EditableImage from './EditableImage'
import EditableTextArea from './EditableTextArea'
import useCustomPathname from '@/app/hooks/useCustomPathname'

interface PageBannerProps {
  type: keyof TextBlockMap
  fileNameKey: string
  titleNameKey: string
  subtitleNameKey: string
  textBlockMap?: any
}

const PageBanner: FC<PageBannerProps> = ({ type, fileNameKey, titleNameKey, subtitleNameKey, textBlockMap }) => {
  const blockData: any = textBlockMap?.[type]
  const path = useCustomPathname()
  const isCommercial = path === '/services/commercial'

  return (
    <div className="relative mt-[-425px] h-[425px] w-ful bg-gradient-to-br from-silver to-coolGray">
      <EditableImage
        src={blockData?.[fileNameKey]?.value}
        type={type}
        textBlockKey={fileNameKey}
        className="absolute inset-0 h-full w-full object-cover z-[1]"
        priority={true}
      />
      <div
        className="absolute z-10 inset-0 flex items-center px-4 lg:px-12 xl:px-4"
        style={{ pointerEvents: isCommercial ? 'auto' : 'none' }}
      >
        <div className="flex flex-col items-start relative max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full">
          {isCommercial ? (
            <div className="max-h-[260px] w-full h-full aspect-video">
              <EditableImage
                src={textBlockMap?.SERVICE_COMMERCIAL_PAGE?.serviceCommercialBannerLogoFile?.value}
                type={type}
                textBlockKey="serviceCommercialBannerLogoFile"
                className="cursor-pointer w-full h-full object-contain animate-fadeIn"
                priority={true}
              />
            </div>
          ) : (
            <>
              <span className="after:absolute after:content-[''] after:bg-neonIce after:-top-8 after:left-0 after:w-16 after:h-1.5" />
              <EditableTextArea
                tag="h1"
                initialValue={blockData?.[titleNameKey]}
                type={type}
                textBlockKey={titleNameKey}
                className="font-bold text-5xl text-white animate-slideRight"
              />
              <div className="w-full">
                <EditableTextArea
                  tag="h2"
                  initialValue={blockData?.[subtitleNameKey]}
                  type={type}
                  textBlockKey={subtitleNameKey}
                  className="text-white font-semibold mt-6 max-w-xl animate-slideLeft"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageBanner
