'use client'

import React from 'react'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'
import AdminErrorText from '@/app/components/admin/AdminErrorText'
import AdminTeamMemberCard from '@/app/components/admin/AdminTeamMemberCard'
import FullScreenAppleLoader from '@/app/components/common/FullScreenAppleLoader'
import AdminTeamMemberCreateModal from '@/app/modals/AdminTeamMemberCreateModal'
import AdminTeamMemberUpdateModal from '@/app/modals/AdminTeamMemberUpdateModal'
import { useFetchTeamMembersQuery } from '@/app/redux/services/teamMemberApi'
import { RootState, useAppSelector } from '@/app/redux/store'

const TeamMembers = () => {
  const { isLoading, data, error } = useFetchTeamMembersQuery()
  const { modalOpenTeamMemberCreate, modalOpenTeamMemberUpdate } = useAppSelector((state: RootState) => state.teamMember)

  return (
    <>
      {modalOpenTeamMemberUpdate && <AdminTeamMemberUpdateModal />}
      {modalOpenTeamMemberCreate && <AdminTeamMemberCreateModal />}
      <AdminCommandArea type="TEAM_MEMBERS" btnText="Create Team Member" />
      {isLoading ? (
        <FullScreenAppleLoader />
      ) : error ? (
        <AdminErrorText error={error?.data?.message} />
      ) : (
        <div className="grid grid-cols-12 gap-y-8 480:gap-8 animate-fadeIn">
          {data?.teamMembers?.map((teamMember: any) => (
            <AdminTeamMemberCard key={teamMember.id} teamMember={teamMember} />
          ))}
        </div>
      )}
    </>
  )
}

export default TeamMembers
