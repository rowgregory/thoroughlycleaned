'use client'

import React from 'react'
import Link from 'next/link'
import BubbleBtn from '../common/BubbleBtn'
import EditableTextArea from '../common/EditableTextArea'
import EditableVideo from '../common/EditableVideo'
import SectionHeaderIcon from '@/app/icons/SectionHeaderIcon'
import YellowBubbleCornerSVG from '@/app/icons/YellowBubbleCornerSVG'
import GridSmallYellowCircles from '@/app/icons/GridSmallYellowCircles'
import YellowDiagonalStripesSVG from '@/app/icons/YellowDiagonalStripesSVG'

const Banner = ({ textBlockMap, openModalEditableVideoPublic }: any) => {
  return (
    <section className="flex flex-col 990:flex-row bg-bannerMobile sm:bg-banner relative overflow-hidden px-4 lg:px-12 xl:px-4 py-12 990:py-0 h-auto 990:h-[800px]">
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full flex flex-col 990:flex-row items-center gap-y-10 990:gap-x-10">
        <div className="flex flex-1 flex-col justify-center relative z-10">
          <div className="flex items-center gap-x-3 mb-8 animate-slideDown">
            <SectionHeaderIcon />
            <EditableTextArea
              tag="h1"
              initialValue={textBlockMap?.HOME_PAGE_BANNER?.homePageBannerSubtitle}
              type="HOME_PAGE_BANNER"
              textBlockKey="homePageBannerSubtitle"
              className="home-page-banner-subtitle"
            />
          </div>
          <EditableTextArea
            tag="h2"
            initialValue={textBlockMap?.HOME_PAGE_BANNER?.homePageBannerTitle}
            type="HOME_PAGE_BANNER"
            textBlockKey="homePageBannerTitle"
            className="home-page-banner-title animate-scaleIn"
          />
          <Link href="/services" className="duration-200 hover:shadow-xl 480:w-[215px] animate-slideUp">
            <BubbleBtn bubbleColor="bg-sunny" text="View All Services" />
          </Link>
        </div>
        <div className="bg-sunny w-full h-auto relative aspect-square z-40 flex items-center justify-center max-h-[1059px] 990:max-h-[733px] max-w-[1059px] 990:max-w-[733px]">
          {textBlockMap?.HOME_PAGE_BANNER?.homePageBannerFile?.value && (
            <EditableVideo
              show={openModalEditableVideoPublic}
              src={textBlockMap?.HOME_PAGE_BANNER?.homePageBannerFile?.value}
              type="HOME_PAGE_BANNER"
              textBlockKey="homePageBannerFile"
            />
          )}
        </div>
        <div className="animate-translateXForthBack w-32 h-32 absolute z-0 top-1/2 990:top-20 right-0">
          <YellowDiagonalStripesSVG />
        </div>
        <div className="animate-translateXBackForth w-32 h-32 absolute z-0 top-2/3 990:bottom-0 left-0 990:left-[45%]">
          <GridSmallYellowCircles />
        </div>
      </div>
      <div className="hidden sm:block animate-translateYBackForth z-0 w-full h-[400px] object-cover absolute -bottom-6 990:bottom-0 left-0">
        <YellowBubbleCornerSVG />
      </div>
    </section>
  )
}

export default Banner
