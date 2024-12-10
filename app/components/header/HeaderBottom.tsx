'use client'

import React from 'react'
import Link from 'next/link'
import navigationLinkData from '@/public/data/navigation-link.data'
import { usePathname } from 'next/navigation'
import { RootState, useAppSelector } from '@/app/redux/store'

const HeaderBottom = () => {
  const pathname = usePathname()
  const { isVideoLoaded } = useAppSelector((state: RootState) => state.app)

  return (
    <div className="bg-white h-20 hidden 990:flex items-center w-full px-4 lg:px-12 xl:px-4">
      <div className="max-w-screen-xl mx-auto w-full flex items-center justify-end">
        <nav className="flex items-center gap-12">
          {navigationLinkData(pathname).map((obj: any, i: number) => (
            <Link
              data-aos={isVideoLoaded ? 'fade-left' : ''}
              data-aos-delay={i * 100}
              key={i}
              href={obj.linkKey}
              className={`${
                obj.active ? 'text-skyAqua' : 'text-zinc-800'
              } text-15 poppins-semibold`}
            >
              {obj.linkText}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default HeaderBottom
