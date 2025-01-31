'use client'

import React from 'react'
import AppleLoader from './AppleLoader'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { publicUrls } from '@/public/data/paths'

const FullScreenAppleLoader = () => {
  const pathname = useCustomPathname()
  const isLight = publicUrls.some((path: string) => path === pathname)

  return (
    <div className="overflow-hidden">
      <div
        className={`${
          isLight ? 'bg-white' : pathname === '/auth/login' ? 'bg-[#1c1c1e]' : ''
        } fixed w-full inset-0 flex items-center justify-center z-[70]`}
      >
        {isLight ? <div className="the-shape" /> : <AppleLoader width="w-10" />}
      </div>
    </div>
  )
}

export default FullScreenAppleLoader
