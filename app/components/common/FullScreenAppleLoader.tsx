'use client'

import React from 'react'
import AppleLoader from './AppleLoader'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { publicUrls } from '@/public/data/paths'

const FullScreenAppleLoader = () => {
  const pathname = useCustomPathname()
  const isPublicUrl = publicUrls.some((path: string) => path === pathname)

  if (isPublicUrl) return

  return (
    <div className="overflow-hidden">
      <div className={`bg-transparent fixed w-full inset-0 flex items-center justify-center z-[70]`}>
        <AppleLoader width="w-10" />
      </div>
    </div>
  )
}

export default FullScreenAppleLoader
