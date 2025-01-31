'use client'

import React, { FC } from 'react'
import { ChildrenProps } from '../types/common.types'
import AdminHeader from '../components/admin/AdminHeader'
import NavigationLayout from './navigation-layout'
import { RootState, useAppSelector } from '../redux/store'
import { useFetchProfileFromIdQuery } from '../redux/services/profileApi'

const AdminLayout: FC<ChildrenProps> = ({ children }) => {
  const auth = useAppSelector((state: RootState) => state.auth)
  useFetchProfileFromIdQuery(auth.userId, { skip: !auth.userId })
  return (
    <>
      <AdminHeader />
      <main className="px-3 py-8 bg-[#1c1c1e] min-h-[calc(100vh-48px)]">
        <div className="max-w-96 760:max-w-[690px] 1160:max-w-[1035px] 1690:max-w-[1380px] mx-auto w-full">
          <NavigationLayout>{children}</NavigationLayout>
        </div>
      </main>
    </>
  )
}

export default AdminLayout
