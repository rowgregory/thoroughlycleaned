'use client'

import React from 'react'
import Link from 'next/link'
import { RootState, useAppSelector } from '@/app/redux/store'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { headerNavigationLinkData } from '@/public/data/navigation-link.data'

const HeaderBottom = () => {
  const pathname = useCustomPathname()
  const { isVideoLoaded } = useAppSelector((state: RootState) => state.app)
  const { isLoggedIn } = useAppSelector((state: RootState) => state.auth)

  return (
    <div className="bg-white h-20 hidden 990:flex items-center w-full px-4 lg:px-12 xl:px-4">
      <div className="max-w-screen-xl mx-auto w-full flex items-center justify-end">
        <nav className="flex items-center gap-12">
          {headerNavigationLinkData(pathname, isLoggedIn).map((link, i) => (
            <Link
              data-aos={isVideoLoaded ? 'fade-left' : ''}
              data-aos-delay={i * 100}
              key={i}
              href={link.linkKey}
              className={`${
                link.active ? 'text-skyAqua' : 'text-zinc-800'
              } text-15 poppins-semibold`}
            >
              {link.linkText}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default HeaderBottom
