import React from 'react'
import SectionHeader from '../common/SectionHeader'
import TeamMemberCarousel from '../team-member/TeamMemberCarousel'
import Bubble1 from '@/app/icons/Bubble1'
import Bubble2 from '@/app/icons/Bubble2'
import Bubble3 from '@/app/icons/Bubble3'

const TeamMemberBlock = ({ textBlockMap }: any) => {
  return (
    <section className="bg-skyAqua px-4 py-32 group relative overflow-hidden">
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full grid grid-cols-12 gap-y-8 md:gap-x-12">
        <div className="col-span-12 w-full">
          <SectionHeader
            subtitle={textBlockMap?.teamMemberBlockSubtitle || 'Team Members'}
            subtitleName="teamMemberBlockSubtitle"
            title={textBlockMap?.teamMemberBlockTitle || 'Meet Our Experts'}
            titleName="teamMemberBlockTitle"
            type="TEAM_MEMBER_BLOCK"
            subtitleStyles="text-center text-white"
            titleStyles="text-center text-white"
            sectionStyles="flex flex-col justify-center items-center"
          />
          <TeamMemberCarousel />
        </div>
      </div>
      <Bubble1 className="animate-bubble-float-1 absolute w-36 top-20 left-20 z-10" />
      <Bubble2 className="animate-bubble-float-2 absolute w-44 top-10 right-20 z-10" />
      <Bubble3 className="animate-bubble-float-3 absolute w-28 bottom-10 right-60 z-10" />
      <Bubble3 className="animate-translateXBackForth absolute w-16 bottom-10 left-10 z-10" />
    </section>
  )
}

export default TeamMemberBlock
