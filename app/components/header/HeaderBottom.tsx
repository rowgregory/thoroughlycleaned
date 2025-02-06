import React from 'react'
import Link from 'next/link'
import { headerNavigationLinkData } from '@/public/data/navigation-link.data'
import AwesomeIcon from '../common/AwesomeIcon'
import { plusIcon } from '@/app/icons'
import { RootState, useAppSelector } from '@/app/redux/store'
import useCustomPathname from '@/app/hooks/useCustomPathname'

const HeaderNavLink = ({ link }: any) => (
  <div className="relative group h-full flex items-center justify-end">
    <Link
      href={link.linkKey}
      className={`${link.active ? 'text-neonIce' : 'text-stealthGray'} text-15 font-semibold flex items-center hover:text-neonIce`}
    >
      {link.linkText}
      {link.showIcon && <AwesomeIcon icon={plusIcon} className="ml-1 w-3 h-3" />}
    </Link>
    {link.linkText === 'Services' && (
      <div className="absolute left-0 top-[100%] w-40 bg-white p-7 transition-all duration-300 ease-in-out z-[60] max-h-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:max-h-[calc(100vh-5rem)] shadow-[0_0_20px_rgba(0,0,0,.15)]">
        <div className="flex flex-col space-y-5">
          {link?.subLinks?.map((subLink: any, k: number) => (
            <Link
              href={subLink.linkKey}
              key={k}
              className={`${subLink.active ? 'text-neonIce' : 'text-stealthGray'} font-semibold text-15 hover:text-neonIce`}
            >
              {subLink.linkText}
            </Link>
          ))}
        </div>
      </div>
    )}
  </div>
)

const HeaderBottom = () => {
  const path = useCustomPathname()
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)

  return (
    <div className="bg-stalthGray h-20 hidden 990:flex items-center w-full">
      <nav className="max-w-screen-xl mx-auto w-full flex items-center justify-end h-full gap-x-12">
        {headerNavigationLinkData(path, isAuthenticated).map((link, i) => (
          <HeaderNavLink key={i} link={link} />
        ))}
      </nav>
    </div>
  )
}

export default HeaderBottom
