import React, { FC, useState } from 'react'
import { useAppDispatch } from '@/app/redux/store'
import Picture from '../common/Picture'
import AdminDeleteButton from './AdminDeleteButton'
import AdminErrorText from './AdminErrorText'
import { setModalOpenTeamMemberUpdate } from '@/app/redux/features/teamMemberSlice'
import { useDeleteTeamMemberMutation } from '@/app/redux/services/teamMemberApi'

const AdminTeamMemberCard: FC<{ teamMember: any }> = ({ teamMember }) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [deleteTeamMember, { error }] = useDeleteTeamMemberMutation()

  const handleDelete = async (e: any, teamMember: any) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading((prev) => ({ ...prev, [teamMember?.id]: true }))

    await deleteTeamMember({ id: teamMember?.id, fileName: teamMember?.fileName, mimeType: 'image' })
      .unwrap()
      .catch(() => {})

    setLoading((prev) => ({ ...prev, [teamMember?.id]: false }))
  }

  const handleEdit = (e: any) => {
    e.preventDefault()
    dispatch(setModalOpenTeamMemberUpdate(teamMember))
  }

  return (
    <div
      onClick={handleEdit}
      className="shadow-adminServiceCard hover:shadow-adminServiceCardHover col-span-12 md:col-span-6 1160:col-span-4 1690:col-span-3 w-full rounded-2xl relative cursor-pointer"
    >
      <div className="flex flex-col items-center bg-[#323235] rounded-tl-2xl rounded-tr-2xl pt-5">
        <div className={`w-24 h-24 aspect-square rounded-full flex items-center justify-center  -mb-12`}>
          {teamMember?.url && (
            <Picture
              src={teamMember?.url}
              alt={teamMember?.id}
              className="w-full h-full rounded-full aspect-square object-cover"
              priority={false}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-16 mb-5 w-full">
        <h1 className="text-white text-xl w-full text-center font-medium mb-1">
          {teamMember?.firstName} {teamMember?.lastName}
        </h1>
        <h2 className="text-zinc-300 text-sm">Position: {teamMember?.position}</h2>
        <h3 className="text-zinc-300 text-sm">Years worked: {teamMember?.yearsWorked}</h3>
      </div>
      <div className="flex items-center justify-end gap-x-2 pr-3 pb-3">
        {error && <AdminErrorText error={error?.data?.message} />}
        <AdminDeleteButton handleDelete={handleDelete} item={teamMember} loading={loading[teamMember?.id]} />
      </div>
    </div>
  )
}
export default AdminTeamMemberCard
