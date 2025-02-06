'use client'

import React, { useRef } from 'react'
import Slider from 'react-slick'
import Picture from '../common/Picture'
import { teamMemberCarouselSettings } from '@/public/data/slider.settings'

const TeamMemberCarousel = ({ teamMembers }: any) => {
  const slider = useRef<Slider | null>(null)

  return (
    <div className="w-full h-auto relative">
      <Slider ref={slider} {...teamMemberCarouselSettings(teamMembers?.length)}>
        {teamMembers?.map((item: any, i: number) => (
          <div key={i} className="flex flex-col items-center justify-between p-12 bg-[#fbfbfb] font-poppins w-full h-auto aspect-square">
            <span className="border-[6px] border-white p-1 w-full max-w-[350px] h-auto rounded-full flex items-center justify-center mb-7 overflow-hidden group">
              <Picture
                src={item.url}
                alt="Thoroughly Cleaned Team Member"
                className="object-cover rounded-full aspect-square w-full h-full group-hover:scale-125 duration-500 ease-out"
                priority={false}
              />
            </span>
            <h1 className="font-bold text-2xl text-center text-iceberg">{item.firstName}</h1>
            <h2 className="text-center">Years employed: {item.yearsWorked}</h2>
            <h3 className="text-center text-sm font-medium">{item.position}</h3>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default TeamMemberCarousel
