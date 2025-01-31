'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import BubbleBtn from '../common/BubbleBtn'
import EditableTextArea from '../common/EditableTextArea'
import EditableVideo from '../common/EditableVideo'
import SectionHeaderIcon from '@/app/icons/SectionHeaderIcon'
import YellowBubbleCornerSVG from '@/app/icons/YellowBubbleCornerSVG'
import GridSmallYellowCircles from '@/app/icons/GridSmallYellowCircles'
import YellowDiagonalStripesSVG from '@/app/icons/YellowDiagonalStripesSVG'
import PlayButtonSVG from '@/app/icons/PlayButtonSVG'

const Banner = ({ textBlockMap, openModalEditableVideoPublic }: any) => {
  const [playVideo, setPlayVideo] = useState(false)

  return (
    <section className="flex flex-col 990:flex-row bg-bannerMobile sm:bg-banner relative overflow-hidden px-4 lg:px-12 xl:px-4 h-auto 990:h-[800px]">
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full grid grid-cols-12 gap-y-20 990:gap-x-6 py-28 990:py-20">
        <div className="col-span-12 990:col-span-6 flex flex-col justify-center">
          <div className="flex items-center gap-x-3 mb-8">
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
            className="home-page-banner-title"
          />
          <Link href="/services" className="duration-200 hover:shadow-xl w-[215px]">
            <BubbleBtn bubbleColor="bg-sunny" text="View All Services" />
          </Link>
        </div>
        <div className="col-span-12 990:col-span-6 flex justify-center relative">
          <div className="w-full flex items-center justify-center h-auto">
            {!playVideo && (
              <div className="w-full h-auto aspect-square bg-sunny bg-opacity-50 990:absolute z-30 flex items-center justify-center">
                <PlayButtonSVG onClick={() => setPlayVideo(true)} />
              </div>
            )}
            {textBlockMap?.HOME_PAGE_BANNER?.homePageBannerFile?.value && (
              <EditableVideo
                show={openModalEditableVideoPublic}
                src={textBlockMap?.HOME_PAGE_BANNER?.homePageBannerFile?.value}
                type="HOME_PAGE_BANNER"
                textBlockKey="homePageBannerFile"
                play={playVideo}
              />
            )}
          </div>
          <div className="animate-translateXBackForth w-32 h-32 absolute z-0 -top-8 -right-8">
            <YellowDiagonalStripesSVG />
          </div>
          <div className="animate-translateYBackForth w-32 h-32 absolute z-0 -bottom-4 -left-4">
            <GridSmallYellowCircles />
          </div>
        </div>
      </div>
      <div className="hidden sm:block animate-translateYBackForth z-0 w-full h-[400px] object-cover absolute -bottom-6 990:bottom-0 left-0">
        <YellowBubbleCornerSVG />
      </div>
    </section>
  )
}

export default Banner
