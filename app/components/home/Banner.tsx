'use client'

import React from 'react'
import Video from '../common/Video'
import BubbleBtn from '../common/BubbleBtn'
import { RootState, useAppSelector } from '@/app/redux/store'
import Link from 'next/link'

const BannerText = () => {
  const { isVideoLoaded } = useAppSelector((state: RootState) => state.app)

  return (
    <div className="w-full 990:w-2/5 relative z-10">
      <div
        className={`${
          !isVideoLoaded ? 'animate-slideDown' : ''
        }  flex items-center gap-x-3 mb-8 opacity-0`}
      >
        <div className="bg-brush bg-contain bg-center bg-no-repeat w-12 h-12"></div>
        <h1 className="uppercase text-skyAqua poppins-semibold">Thoroughly Cleaned Provides</h1>
      </div>
      <h2
        className={`${
          !isVideoLoaded ? 'animate-scaleIn' : ''
        } poppins-bold text-5xl 990:text-[62px] xl:text-7xl text-[#0B0B0B] mb-12 opacity-0 leading-[55px] 990:leading-[70px] sm:leading-[77px]`}
      >
        Qualified Cleaning Experts
      </h2>
      <Link
        href="/services"
        className={`${
          !isVideoLoaded ? 'animate-slideUp' : ''
        } inline-block opacity-0 duration-200 hover:shadow-xl`}
      >
        <BubbleBtn bubbleColor="bg-sunny" text="View All Services" />
      </Link>
    </div>
  )
}

const BannerVideo = () => {
  const { isVideoLoaded } = useAppSelector((state: RootState) => state.app)
  return (
    <div className="w-full 990:w-3/5">
      <div className="w-full relative">
        <div className="animate-translateXBackForth bg-yellowStripes bg-cover bg-no-repeat w-32 h-32 absolute z-0 bg-cenver -top-8 -right-8"></div>
        <Video
          src="/videos/banner-vid.mp4"
          className={`flex w-full h-full object-cover relative z-10 ${
            !isVideoLoaded ? 'animate-slideUp' : ''
          }`}
        />
        <div className="animate-scaleBackForth bg-yellowDots bg-no-repeat bg-contain w-40 h-36 absolute z-0 990:-bottom-28 -left-10 990:left-1/2 990:translate-x-1/2"></div>
      </div>
    </div>
  )
}

const Banner = () => {
  return (
    <section className="bg-bannerMobile sm:bg-banner relative overflow-hidden px-4 lg:px-12 xl:px-4">
      <div className="max-w-2xl 990:max-w-screen-xl mx-auto w-full flex flex-col 990:flex-row lg:items-center gap-y-20 sm:gap-x-20 py-28 990:py-44">
        <BannerText />
        <BannerVideo />
      </div>
      <div className="hidden sm:block animate-translateYBackForth bg-yellowBubbleCorner z-0 bg-contain bg-no-repeat w-full h-full max-h-[550px] absolute -bottom-6 990:bottom-0 left-0"></div>
    </section>
  )
}

export default Banner
