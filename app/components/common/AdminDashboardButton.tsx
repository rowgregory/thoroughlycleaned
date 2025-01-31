import React from 'react'
import AwesomeIcon from './AwesomeIcon'
import { dashboardIcon } from '@/app/icons'
import Link from 'next/link'
import { RootState, useAppSelector } from '@/app/redux/store'

const AdminDashboardButton = ({ url }: { url: string }) => {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

  return (
    <Link
      href={url}
      className={`${
        isAuthenticated ? 'fixed' : 'hidden'
      } z-50 bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center bg-[#1c1c1e]`}
    >
      <AwesomeIcon icon={dashboardIcon} className="text-white w-6 h-6" />
    </Link>
  )
}

export default AdminDashboardButton
