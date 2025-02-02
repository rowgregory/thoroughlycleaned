'use client'

import { useEffect, useState } from 'react'
import useRemoveScroll from '../../hooks/useRemoveScroll'
import PageBannerLoaderSVG from '@/app/icons/PageBannerLoaderSVG'
import { shouldExcludePath } from '@/app/utils/string.functions'
import useCustomPathname from '@/app/hooks/useCustomPathname'
import { RootState, useAppSelector } from '@/app/redux/store'

const LoadingScreen = () => {
  const { isMediaReady } = useAppSelector((state: RootState) => state.app)
  const [hideLoadingScreen, setHideLoadingScreen] = useState(false)
  const [playAnimation, setPlayAmimation] = useState(false)
  const path = useCustomPathname()
  useRemoveScroll(true)

  useEffect(() => {
    let timeout: any

    if (isMediaReady || path !== '/') {
      setPlayAmimation(true)
      timeout = setTimeout(() => setHideLoadingScreen(true), 1000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isMediaReady, path])

  if (shouldExcludePath(path)) return

  return (
    <div className="overflow-hidden">
      <div
        className={`fixed bg-white min-h-screen w-full top-0 left-0 flex items-center justify-center z-[70] transition-all duration-1000 ${
          playAnimation ? 'opacity-0 scale-[100]' : 'opacity-100'
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
