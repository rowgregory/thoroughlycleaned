'use client'

import { useEffect, useState } from 'react'
import { RootState, useAppSelector } from '../../redux/store'
import useRemoveScroll from '../../hooks/useRemoveScroll'
import PageBannerLoaderSVG from '@/app/icons/PageBannerLoaderSVG'

const LoadingScreen = () => {
  const { isMediaReady } = useAppSelector((state: RootState) => state.app)

  useRemoveScroll(isMediaReady)

  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    if (!isMediaReady) {
      const timeout = setTimeout(() => setIsHidden(true), 500)
      return () => clearTimeout(timeout)
    }
  }, [isMediaReady])

  return (
    <div className="overflow-hidden">
      <div
        className={`fixed bg-white min-h-screen w-full top-0 left-0 flex items-center justify-center z-[70] transition-opacity duration-700 ${
          !isMediaReady ? 'opacity-0' : 'opacity-100'
        } ${isHidden ? 'hidden' : ''}`}
      >
        <div className="animate-fadeIn">
          <PageBannerLoaderSVG />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
