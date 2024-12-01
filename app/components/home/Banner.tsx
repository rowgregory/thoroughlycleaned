'use client'

import React from 'react'
import Picture from '../common/Picture'
import useVideo from '@/app/hooks/useVideo'
import Video from '../common/Video'
import BubbleBtn from '../common/BubbleBtn'
import { useRouter } from 'next/navigation'

const Banner = () => {
  const { videoRef } = useVideo()
  const navigate = useRouter()
  return (
    <div className="bg-banner relative overflow-hidden">
      <div className="max-w-screen-sm lg:max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row lg:items-center gap-y-20 sm:gap-x-20 py-44">
        <div className="w-[40%]">
          <div className="">
            <div className="flex items-center gap-x-3 mb-8">
              <Picture
                src="/images/banner-brush.png"
                alt="Brush Icon"
                className="w-12 h-12"
                priority={false}
              />
              <h1 className="uppercase text-royal poppins-semibold">Thoroughly Cleaned Provides</h1>
            </div>
            <h2 className="translate-left-left-x poppins-bold text-7xl text-[#0B0B0B] mb-12">
              Qualified and Skilled Cleaning Professionals
            </h2>
            <button onClick={() => navigate.push('/services')} className="w-fit">
              <BubbleBtn bubbleColor="bg-sunny" text="View All Services" />
            </button>
          </div>
        </div>
        <div className="w-[60%]">
          <div className="max-w-[680px] w-full relative">
            <div className="translate-element bg-[url('/images/yellow-stripes.png')] bg-cover bg-no-repeat w-32 h-32 absolute z-0 bg-cenver -top-8 -right-8"></div>
            <Video
              videoRef={videoRef}
              src="/videos/banner-vid.mp4"
              className="flex w-full h-full max-h-[600px] object-cover aspect-[4/3] relative z-10"
            />
            <div className="scaling-element bg-[url('/images/yellow-circles.png')] bg-contain w-40 h-36 absolute z-0 -bottom-9 left-1/2 translate-x-1/2"></div>
          </div>
        </div>
      </div>
      <div className="translate-y-element bg-[url('/images/yellow-bubble-corner-3.png')] z-0 bg-contain bg-no-repeat w-full h-full max-h-[550px] absolute bottom-0 left-0"></div>
    </div>
  )
}

export default Banner
