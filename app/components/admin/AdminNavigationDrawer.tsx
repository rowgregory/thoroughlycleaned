import { RootState, useAppDispatch, useAppSelector } from '@/app/redux/store'
import React from 'react'
import AwesomeIcon from '../common/AwesomeIcon'
import { timesIcon } from '@/app/icons'
import { setCloseDrawerAdminNav } from '@/app/redux/features/appSlice'
import { adminNavigationLinkData } from '@/public/data/navigation-link.data'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import Link from 'next/link'

const AdminNavigationDrawer = () => {
  const dispatch = useAppDispatch()
  const { openDrawerAdminNav } = useAppSelector((state: RootState) => state.app)
  const auth = useAppSelector((state: RootState) => state.auth)
  const path = useCustomPathname()

  return (
    <div
      className={`${
        openDrawerAdminNav ? 'h-[calc(100vh-48px)] translate-y-0' : 'h-0 min-h-0 -translate-y-full'
      } fixed w-full top-12 left-0 right-0 bg-[#1c1c1e] text-white shadow-lg z-30 duration-500 h-fit ease-in-out`}
    >
      <div className="pt-4 pl-4 mb-12">
        <AwesomeIcon
          onClick={() => dispatch(setCloseDrawerAdminNav())}
          icon={timesIcon}
          className="w-4 h-4 text-white cursor-pointer hover:rotate-90 duration-500"
        />
      </div>
      <div className="flex flex-col gap-y-5 px-16">
        {adminNavigationLinkData?.(path, auth?.role)?.map((link, i, arr) => (
          <Link
            key={i}
            onClick={() => dispatch(setCloseDrawerAdminNav())}
            href={link.linkKey}
            className={`${link.active ? 'text-neonSkyAqua' : 'text-white'} ${
              i !== arr.length - 1 ? 'border-b-1 border-b-[#323235]' : ''
            } pb-2`}
          >
            {link.textKey}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminNavigationDrawer
