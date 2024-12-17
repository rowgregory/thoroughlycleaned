'use client'

import React, { FC } from 'react'
import { ChildrenProps } from '../types/common.types'
import DashboardHeader from '../components/admin/DashboardHeader'

const AdminLayout: FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-lightGray">
      <DashboardHeader />
      <main className="px-3 py-8">
        <div className="max-w-1140 mx-auto w-full">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout
