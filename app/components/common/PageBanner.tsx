import React, { FC } from 'react'
import { TextBlockMap } from '@/app/redux/features/textBlockSlice'
import EditableImage from './EditableImage'
import EditableTextArea from './EditableTextArea'
import Picture from './Picture'

interface PageBannerProps {
  type: keyof TextBlockMap
  fileNameKey: string
  titleNameKey: string
  subtitleNameKey: string
  textBlockMap?: any
  isLoading: boolean
}

const PageBanner: FC<PageBannerProps> = ({ type, fileNameKey, titleNameKey, subtitleNameKey, textBlockMap, isLoading }) => {
  const blockData: any = textBlockMap?.[type]

  return isLoading ? (
    <div className="w-full h-[425px] 990:h-[530px] flex items-center justify-center bg-skyAqua overflow-hidden">
      <Picture src="/images/logo-bubble-transparent.png" className="w-40 h-40 990:w-80 990:h-80 object-contain" priority={true} />
    </div>
  ) : (
    <div className="relative h-[425px] 990:h-[530px] w-full">
      <EditableImage
        src={blockData?.[fileNameKey]?.value}
        type={type}
        textBlockKey={fileNameKey}
        className="absolute inset-0 h-full w-full object-cover z-[1]"
        priority={true}
      />
      <div className="absolute z-10 inset-0 flex items-center px-4 lg:px-12 xl:px-4" style={{ pointerEvents: 'none' }}>
        <div className="flex flex-col items-start relative max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full">
          <span className={`after:absolute after:content-[''] after:bg-sunny after:-top-8 after:left-0 after:w-16 after:h-1.5`} />
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
        </div>
      </div>
    </div>
  )
}

export default PageBanner
