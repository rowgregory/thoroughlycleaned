import React, { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import useCustomPathname from '../../hooks/useCustomPathname'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import useOutsideDetect from '../../hooks/useOutsideDetect'
import { setCloseNavigationDrawer } from '../../redux/features/appSlice'
import AwesomeIcon from '../common/AwesomeIcon'
import { plusIcon, timesIcon } from '../../icons'
import { headerNavigationLinkData } from '@/public/data/navigation-link.data'
import useRemoveScroll from '../../hooks/useRemoveScroll'
import EditableTextArea from '../common/EditableTextArea'
import { navigationDrawerData } from '@/public/data/app.data'

const WhitePageOverlay = ({ open }: { open: boolean }) => {
  return (
    <div
      className={`${
        open ? 'translate-x-0 duration-1000' : 'translate-x-full'
      } fixed top-0 left-0 h-screen w-screen bg-white/80 z-50 will-change-transform`}
    ></div>
  )
}

const NavigationDrawer = ({ textBlockMap }: any) => {
  const path = useCustomPathname()
  const dispatch = useAppDispatch()
  const overlayRef = useRef(null)
  const { openNavigationDrawer } = useAppSelector((state: RootState) => state.app)
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const handleClose = useCallback(() => dispatch(setCloseNavigationDrawer()), [dispatch])
  const [toggleSublinks, setToggleSublinks] = useState(false)
  useOutsideDetect(overlayRef, handleClose)
  useRemoveScroll(openNavigationDrawer)

  return (
    <>
      <WhitePageOverlay open={openNavigationDrawer} />
      <div
        ref={overlayRef}
        className={`${
          openNavigationDrawer ? 'translate-x-0 ' : 'translate-x-full 480:translate-x-[480px]'
        } duration-700 no-scrollbar overflow-hidden w-full 480:w-[480px] h-full fixed top-0 bottom-0 right-0 z-[80] transition-all bg-navigationDrawer pt-10 pb-16 px-4 480:pl-12 480:pr-14 overflow-y-auto`}
      >
        <div className="flex items-center relative justify-end">
          <AwesomeIcon
            onClick={() => dispatch(setCloseNavigationDrawer())}
            icon={timesIcon}
            className="w-6 h-6 text-neonIce cursor-pointer hover:rotate-90 duration-300 mb-5"
          />
        </div>
        <div className="flex flex-col mb-10">
          {headerNavigationLinkData(path, isAuthenticated).map((link, i) => (
            <div key={i}>
              <Link
                href={link.linkText !== 'Services' ? link.linkKey : '#'}
                onClick={() => (link.subLinks ? setToggleSublinks(!toggleSublinks) : dispatch(setCloseNavigationDrawer()))}
                className={`flex items-center py-2.5 justify-between group border-b-1 border-b-black border-opacity-10 text-lg group hover:text-neonIce ${
                  link.active ? 'text-neonIce font-bold' : 'text-gray-800 font-medium'
                }`}
              >
                {link.linkText}
                {link.subLinks && <AwesomeIcon icon={plusIcon} className="w-4 h-4 duration-500 text-slate-800 group-hover:rotate-90" />}
              </Link>
              {toggleSublinks &&
                link.subLinks?.map((sublink, j) => (
                  <Link
                    key={j}
                    href={sublink.linkKey}
                    onClick={() => dispatch(setCloseNavigationDrawer())}
                    className={`flex items-center pl-8 py-2.5 justify-between group border-b-1 border-b-black border-opacity-10 text-lg group hover:text-neonIce ${
                      sublink.active ? 'text-neonIce font-bold' : 'text-gray-800 font-medium'
                    }`}
                  >
                    {sublink.linkText}
                  </Link>
                ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-y-5">
          {navigationDrawerData(textBlockMap).map((item, i) => (
            <div key={i} className="grid grid-cols-12 group gap-x-3">
              <AwesomeIcon
                icon={item.icon}
                className="col-span-1 480:col-span-2 w-4 h-4 480:w-6 480:h-6 text-neonIce group-hover:rotate-[360deg] duration-1000"
              />
              <div className="col-span-11 480:col-span-10 flex flex-col justify-between">
                <h1 className="font-bold mb-1.5 text-gray-800">{item.h1}</h1>
                <EditableTextArea
                  tag="h2"
                  initialValue={item.h2}
                  type="HEADER"
                  textBlockKey={item.name}
                  className="text-gray-800 text-13 480:text-15"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default NavigationDrawer
