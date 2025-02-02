'use client'

import { useEffect, useState } from 'react'
import useRemoveScroll from '../../hooks/useRemoveScroll'
import PageBannerLoaderSVG from '@/app/icons/PageBannerLoaderSVG'
import { shouldExcludePath } from '@/app/utils/string.functions'
import useCustomPathname from '@/app/hooks/useCustomPathname'

const LoadingScreen = () => {
  const [hideLoadingScreen, setHideLoadingScreen] = useState(false)
  const [playAnimation, setPlayAmimation] = useState(false)
  const path = useCustomPathname()
  useRemoveScroll(true)

  useEffect(() => {
    let timeout: any
    let timeout2: any

    timeout = setTimeout(() => setPlayAmimation(true), 2000)
    timeout2 = setTimeout(() => setHideLoadingScreen(true), 3000)

    return () => {
      clearTimeout(timeout)
      clearTimeout(timeout2)
    }
  }, [path])

  if (shouldExcludePath(path)) return

  return (
    <div className="overflow-hidden">
      <div
        className={`fixed bg-white min-h-screen w-full top-0 left-0 flex items-center justify-center z-[70] transition-all duration-1000 ${
          playAnimation ? 'opacity-0 scale-[100]' : 'opacity-100'
        } ${hideLoadingScreen ? 'hidden' : ''}`}
      >
        <div className="animate-scaleBackForth">
          <PageBannerLoaderSVG />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
