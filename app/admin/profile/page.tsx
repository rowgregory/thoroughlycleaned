'use client'

import React from 'react'
import { RootState, useAppSelector } from '@/app/redux/store'
import AdminProfileUpdateModal from '@/app/modals/AdminProfileUpdateModal'
import AppleLoader from '@/app/components/common/AppleLoader'
import AdminCommandArea from '@/app/components/admin/AdminCommandArea'

const profileData = (profile: any) => [
  {
    textKey: 'First Name',
    value: profile?.firstName
  },
  {
    textKey: 'Last Name',
    value: profile?.lastName
  },
  {
    textKey: 'Email',
    value: profile?.email
  },
  {
    textKey: 'Phone Number',
    value: profile?.phoneNumber
  },
  {
    textKey: 'Sound Effects',
    value: profile?.isSoundEffectsOn ? 'On' : 'Off'
  }
]

const Profile = () => {
  const { openModalProfileUpdate, profile, loading } = useAppSelector((state: RootState) => state.profile)

  return (
    <>
      {openModalProfileUpdate && <AdminProfileUpdateModal />}
      <AdminCommandArea type="PROFILE" btnText="Update Profile" />
      <div className="flex flex-col gap-y-7 animate-fadeIn">
        {profileData(profile).map((obj, i) => (
          <div key={i} className="grid grid-cols-12 gap-x-4 text-[#7e7e7e]">
            <div className="col-span-4 font-rubik text-17 whitespace-nowrap truncate">{obj.textKey}</div>
            <div className="col-span-8 font-rubik font-medium text-17 truncate">{loading ? <AppleLoader /> : obj.value}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Profile
