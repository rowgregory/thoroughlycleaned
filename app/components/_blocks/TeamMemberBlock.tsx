import React from 'react'
import SectionHeader from '../common/SectionHeader'
import TeamMemberCarousel from '../team-member/TeamMemberCarousel'
import { RootState, useAppSelector } from '@/app/redux/store'

const TeamMemberBlock = ({ textBlockMap }: any) => {
  const { teamMembers } = useAppSelector((state: RootState) => state.teamMember)
  if (teamMembers?.length === 0) return

  return (
    <section
      className="bg-neonIce px-4 py-32 relative overflow-hidden bg-repeat bg-center"
      style={{ backgroundImage: `url('/images/pattern4.png')` }}
    >
      <div className="max-w-[520px] 760:max-w-[700px] 990:max-w-[960px] 1200:max-w-[1280px] mx-auto w-full grid grid-cols-12 gap-y-8 md:gap-x-12">
        <div className="col-span-12 w-full">
          <SectionHeader
            subtitle={textBlockMap?.teamMemberBlockSubtitle}
            subtitleName="teamMemberBlockSubtitle"
            title={textBlockMap?.teamMemberBlockTitle}
            titleName="teamMemberBlockTitle"
            type="TEAM_MEMBER_BLOCK"
            subtitleStyles="text-center text-white"
            titleStyles="text-center text-white"
            sectionStyles="flex flex-col justify-center items-center"
          />
          <TeamMemberCarousel teamMembers={teamMembers} />
        </div>
      </div>
    </section>
  )
}

export default TeamMemberBlock
