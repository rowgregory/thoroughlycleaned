'use client'

import { useEffect, useState } from 'react'
import useRemoveScroll from '../../hooks/useRemoveScroll'
import PageBannerLoaderSVG from '@/app/icons/PageBannerLoaderSVG'
import { RootState, useAppSelector } from '@/app/redux/store'

const LoadingScreen = () => {
  useRemoveScroll(true)
  const { isMediaReady } = useAppSelector((state: RootState) => state.app)

  const [hideLoadingScreen, setHideLoadingScreen] = useState(false)
  const [playAnimation, setPlayAmimation] = useState(false)

  useEffect(() => {
    let timeout: any
    let timeout2: any
    if (isMediaReady) {
      timeout = setTimeout(() => setPlayAmimation(true), 1500)
      timeout2 = setTimeout(() => setHideLoadingScreen(true), 2500)
    }
    return () => {
      clearTimeout(timeout)
      clearTimeout(timeout2)
    }
  }, [isMediaReady])

  return (
    <div className="overflow-hidden">
      <div
        className={`fixed bg-white min-h-screen w-full top-0 left-0 flex items-center justify-center z-[70] transition-all duration-700 ${
          playAnimation ? 'opacity-0 scale-[300]' : 'opacity-100'
        } ${hideLoadingScreen ? 'hidden' : ''}`}
      >
        <div className="animate-fadeIn">
          <PageBannerLoaderSVG />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
