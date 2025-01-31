'use client'

import React, { FC, FormEvent, useState } from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { linkIcon, syncIcon, unlinkIcon } from '@/app/icons'
import { formatPhoneNumber } from '@/app/utils/string.functions'
import { formatDate } from '@/app/utils/date.functions'
import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import { openUpdateApprovedUserModal } from '@/app/redux/features/approvedUserSlice'
import { useDeleteApprovedUserMutation } from '@/app/redux/services/approvedUserApi'
import { ApprovedUserCardProps } from '@/app/types/admin.types'
import AdminDeleteButton from './AdminDeleteButton'
import useSoundEffect from '@/app/hooks/useSoundEffect'

const ApprovedUserCard: FC<ApprovedUserCardProps> = ({ id, name, phoneNumber, createdAt, updatedAt, userId }) => {
  const dispatch = useAppDispatch()
  const firstNameInitial = name?.charAt(0)
  const last4Digits = phoneNumber?.substring(6, 10)
  const [showNumber, setShowNumber] = useState(false)
  const [deleteApprovedUser, { isLoading, error: errorDelete }] = useDeleteApprovedUserMutation()
  const auth = useAppSelector((state: RootState) => state.auth)
  const { profile } = useAppSelector((state: RootState) => state.profile)
  const { play: playError } = useSoundEffect('/sound-effects/cartoon-jump.mp3', profile.isSoundEffectsOn)

  const handleOpenUpdateApprovedUserModal = (e: FormEvent, user: any) => {
    e.preventDefault()

    if (auth.role === 'super-user' || (auth.role === 'admin' && phoneNumber !== process.env.NEXT_PUBLIC_SUPER_USER_PHONE_NUMBER))
      dispatch(openUpdateApprovedUserModal(user))
  }

  const handleDelete = async (e: FormEvent, approvedUserId: string) => {
    e.preventDefault()
    e.stopPropagation()

    await deleteApprovedUser({ id: approvedUserId })
      .unwrap()
      .catch(() => playError())
  }

  const handleTogglePhoneNumber = (e: FormEvent) => {
    e.stopPropagation()
    setShowNumber(!showNumber)
  }

  return (
    <div
      onClick={(e: FormEvent) => handleOpenUpdateApprovedUserModal(e, { id, name, phoneNumber, createdAt, updatedAt })}
      className={`col-span-12 1160:col-span-6 1690:col-span-4 w-full shadow-adminServiceCard p-5 rounded-xl flex flex-col justify-between cursor-pointer border-l-3 ${
        userId ? 'border-green-500' : 'border-zinc-500'
      }`}
    >
      <div className="flex flex-col 480:flex-row 480:justify-between">
        <div className="flex items-center gap-x-4 w-full">
          <div className="rounded-lg w-full h-full aspect-square max-w-14 flex items-center justify-center bg-zinc-800">
            <h1 className="uppercase text-[32px] rubik-bold text-gray-200">{firstNameInitial}</h1>
          </div>
          <div className="w-full">
            <h1 className="text-2xl text-zinc-300 font-rubik font-medium">{name}</h1>
            <h2 onClick={handleTogglePhoneNumber} className="w-fit text-zinc-500 rubik-regular">
              {showNumber ? formatPhoneNumber(phoneNumber) : `*** *** ${last4Digits}`}
            </h2>
          </div>
        </div>
        <span className="flex gap-x-3 mt-4 480:mt-0">
          <h3 className={`text-xs ${userId ? 'text-green-500' : 'text-zinc-500'} whitespace-nowrap`}>
            User is {userId ? 'linked' : 'not linked'}
          </h3>
          <AwesomeIcon icon={userId ? linkIcon : unlinkIcon} className={`${userId ? 'text-green-500' : 'text-zinc-500'}`} />
        </span>
      </div>
      <div className="flex items-center justify-between mt-16">
        <div className="text-zinc-600 text-xs italic flex items-center gap-x-2">
          <AwesomeIcon icon={syncIcon} className="text-xs text-zinc-600" /> {formatDate(updatedAt)}
        </div>
        <div className="flex items-center gap-x-2">
          {errorDelete && <div className="text-sm text-red-500 font-rubik">{errorDelete?.data?.message}</div>}
          {auth.userId !== userId && phoneNumber !== process.env.NEXT_PUBLIC_SUPER_USER_PHONE_NUMBER && (
            <AdminDeleteButton handleDelete={handleDelete} item={id} loading={isLoading} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ApprovedUserCard
