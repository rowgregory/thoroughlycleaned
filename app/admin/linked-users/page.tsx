'use client'

import React, { useState } from 'react'
import AppleLoader from '@/app/components/common/AppleLoader'
import { useFetchUsersQuery, useUpdateUserMutation } from '@/app/redux/services/userApi'
import AdminErrorText from '@/app/components/admin/AdminErrorText'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'
import FullScreenAppleLoader from '@/app/components/common/FullScreenAppleLoader'
import { RootState, useAppSelector } from '@/app/redux/store'

const LinkedUsers = () => {
  const { isLoading, data, error: fetchError } = useFetchUsersQuery()
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [updateUser, { error: updateError }] = useUpdateUserMutation()
  const { profile } = useAppSelector((state: RootState) => state.profile)

  const handleUserUpdate = async (userId: any) => {
    setLoading((prev) => ({ ...prev, [userId]: true }))
    await updateUser({ id: userId })
      .unwrap()
      .catch(() => {})
    setLoading((prev) => ({ ...prev, [userId]: false }))
  }

  return (
    <>
      <AdminCommandArea type="LINKED_USERS" />
      {isLoading ? (
        <FullScreenAppleLoader />
      ) : fetchError ? (
        <AdminErrorText error={fetchError?.data?.message} />
      ) : (
        <div className="max-w-[690px] 1160:max-w-screen-990 w-full flex flex-col gap-y-12 760:gap-y-4 animate-fadeIn">
          {data?.users?.map((user: any) => (
            <div
              key={user.id}
              className="grid grid-cols-12 w-full gap-y-7 480:gap-x-4 items-center hover:bg-[#2C2C2E] px-2 py-1 -ml-2 rounded-md relative after:absolute after:content-[''] after:w-full after:z-10 after:h-[0.5px] after:bg-[#2c2c2e] after:-bottom-6 after:left-0 760:after:hidden"
            >
              <h1 className="col-span-6 480:col-span-3 rubik-light text-white text-17">{user?.firstName}</h1>
              <h1 className="col-span-6 480:col-span-3 rubik-light text-white text-17 flex justify-end 480:justify-normal">
                {user?.lastName}
              </h1>
              {updateError ? (
                <AdminErrorText error={updateError?.data?.message} />
              ) : (
                <h1 className="col-span-6 480:col-span-4 rubik-light text-white text-17">{user?.phoneNumber}</h1>
              )}
              <div className="col-span-6 480:col-span-2 flex justify-end">
                <div className="rounded-md w-8 h-8 flex items-center justify-center aspect-square cursor-pointer bg-zinc-700">
                  {loading[user.id] ? (
                    <AppleLoader />
                  ) : (
                    <div>
                      <button
                        onClick={() => handleUserUpdate(user.id)}
                        className={`w-full h-auto aspect-square flex items-center justify-center rounded-full border-2`}
                        style={{ borderColor: profile.colorCode }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full`}
                          style={{ backgroundColor: user?.isPrimaryContact ? profile.colorCode : '' }}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default LinkedUsers
