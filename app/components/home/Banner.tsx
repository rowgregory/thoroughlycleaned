'use client'

import React from 'react'
import EditableTextArea from '../common/EditableTextArea'
import EditableVideo from '../common/EditableVideo'
import BubbleLogoSVG from '@/app/icons/BubbleLogoSVG'
import { RootState, useAppSelector } from '@/app/redux/store'
import SilverBubbleCornerSVG from '@/app/icons/SilverBubbleCornerSVG'
import SpiralSVG from '@/app/icons/SpiralSVG'
import CircleCorner from '@/app/icons/CircleCorner'
import LogoSVG from '@/app/icons/LogoSVG'

const Banner = ({ textBlockMap, openModalEditableVideoPublic }: any) => {
  const { isMediaReady } = useAppSelector((state: RootState) => state.app)

  return (
    <section className="flex flex-col 990:flex-row bg-iceMist xs:bg-bannerMobile sm:bg-banner relative overflow-hidden px-4 lg:px-12 xl:px-4 py-12 990:py-0 h-auto 990:h-[800px]">
      <div className="relative max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full flex flex-col 990:flex-row items-center gap-y-10 990:gap-x-10">
        <div className="flex flex-1 flex-col items-center justify-center">
          {/* <EditableImage
            src={textBlockMap?.HOME_PAGE_BANNER?.homePageBannerImageFile?.value}
            type="HOME_PAGE_BANNER"
            textBlockKey="homePageBannerImageFile"
            className="cursor-pointer w-full h-full min-w-96 max-h-[480px] aspect-square object-contain animate-scaleIn"
            priority={true}
          /> */}
          <div className="w-full h-full min-w-80 max-w-[450px] aspect-square">
            <LogoSVG />
          </div>
          <div className="items-center mx-auto justify-center gap-x-3 mb-8 animate-slideUp hidden 990:flex relative z-10">
            <EditableTextArea
              tag="h1"
              initialValue={textBlockMap?.HOME_PAGE_BANNER?.homePageBannerSubtitle}
              type="HOME_PAGE_BANNER"
              textBlockKey="homePageBannerSubtitle"
              className="home-page-banner-subtitle text-center"
            />
          </div>
          {/* <EditableTextArea
            tag="h2"
            initialValue={textBlockMap?.HOME_PAGE_BANNER?.homePageBannerTitle}
            type="HOME_PAGE_BANNER"
            textBlockKey="homePageBannerTitle"
            className="home-page-banner-title animate-scaleIn min-h-[225px]"
          />
          <Link href="/services" className="mt-10 duration-200 hover:shadow-xl 480:w-[215px] animate-slideUp whitespace-nowrap">
            <BubbleBtn bubbleColor="bg-[#00B8D9]" text="View All Services" />
          </Link> */}
        </div>
        <div className="relative w-full h-auto max-h-[1059px] 990:max-h-[733px] max-w-[1059px] 990:max-w-[733px]">
          <div className="bg-coolGray aspect-square relative z-40 flex items-center justify-center">
            {!isMediaReady && (
              <BubbleLogoSVG className="animate-scaleBackForth max-w-96 absolute transform -translate-x-1/2 -translate-y-1/2" />
            )}
            {textBlockMap?.HOME_PAGE_BANNER?.homePageBannerFile?.value && (
              <EditableVideo
                show={openModalEditableVideoPublic}
                src={textBlockMap?.HOME_PAGE_BANNER?.homePageBannerFile?.value}
                type="HOME_PAGE_BANNER"
                textBlockKey="homePageBannerFile"
              />
            )}
          </div>
          <div className="absolute z-50 bottom-2 right-2 w-40 400:w-80 h-2 bg-neonIce"></div>
          <div className="absolute z-50 bottom-2 right-2 w-2 h-40 400:h-80 bg-neonIce"></div>
          <div className="absolute z-50 top-2 left-2 w-2 h-40 400:h-80 bg-neonIce"></div>
          <div className="absolute z-50 top-2 left-2 w-40 400:w-80 h-2 bg-neonIce"></div>
          <div className="absolute z-0 top-[-138px] left-[-138px] animate-rotate360">
            <SpiralSVG />
          </div>
        </div>
      </div>
      <div className="hidden sm:block animate-translateYBackForth z-0 w-full h-[400px] object-cover absolute -bottom-6 990:bottom-0 left-0">
        <SilverBubbleCornerSVG />
      </div>
      <div className="hidden sm:block z-10 absolute bottom-0 right-0">
        <CircleCorner />
      </div>
    </section>
  )
}

export default Banner
