import React from 'react'
import Link from 'next/link'
import headerLinkData from '@/app/data/headerLinkData'
import { usePathname } from 'next/navigation'
import { FaSignInAlt } from 'react-icons/fa'

const BottomSection = () => {
  const pathname = usePathname()

  return (
    <div className="bg-white h-20 flex items-center sticky top-0 z-30 w-full">
      <div className="max-w-screen-xl mx-auto w-full flex items-center justify-end">
        <div className="flex items-center gap-12">
          {headerLinkData(pathname).map((obj: any, i: number) => (
            <Link
              key={i}
              href={obj.linkKey}
              className={`${obj.active ? 'text-royal' : 'text-zinc-800'} text-15 poppins-semibold`}
            >
              {obj.linkText}
            </Link>
          ))}
          <Link href="/auth/login">
            <FaSignInAlt className="h-5 w-5 text-zinc-800" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BottomSection
