'use client'

import React, { FormEvent } from 'react'
import Logo from '../common/Logo'
import Link from 'next/link'
import { signOutAltIcon } from '@/app/icons'
import AwesomeIcon from '../common/AwesomeIcon'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { useLogoutMutation } from '@/app/redux/services/authApi'
import { dashboardNavigationLinkData } from '@/public/data/navigation-link.data'

const DashboardHeader = () => {
  const path = useCustomPathname()
  const [logout] = useLogoutMutation()

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault()
    const response = await logout().unwrap()
    if (response.success) {
      document.body.classList.add('animate-fadeOut')
      document.location.href = '/auth/login'
    }
  }

  return (
    <header className="px-3 w-full shadow-[0_-9px_61px_4px_#3da3bf] bg-lightGray">
      <div className="max-w-1140 w-full mx-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Logo className="w-24 h-16 bg-cover mr-8" src="bg-logoText" />
            <span className="text-sm rubik-bold text-midnightPlum">Hi, welcome back!</span>
          </div>
          <button
            className="text-sm rubik-medium text-midnightPlum shadow-neu bg-iconShadow px-2 py-2.5 rounded-sm flex items-center justify-center"
            onClick={handleLogout}
          >
            <AwesomeIcon icon={signOutAltIcon} className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex items-center justify-between gap-x-10 flex-wrap">
          {dashboardNavigationLinkData.map((link, i) => (
            <Link
              key={i}
              href={link.linkKey}
              className={`flex items-center gap-x-4 py-5 text-sm rubik-medium ${
                path === link.linkKey ? 'text-royal' : 'text-mediumGray'
              }`}
            >
              <AwesomeIcon
                icon={link.icon}
                className={`w-5 h-5 ${path === link.linkKey ? 'text-royal' : 'text-skyAqua'}`}
              />
              <span>{link.textKey}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default DashboardHeader
