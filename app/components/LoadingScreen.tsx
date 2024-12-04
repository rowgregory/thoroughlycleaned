'use client'

import { useEffect, useState } from 'react'
import useRemoveScroll from '../hooks/useRemoveScroll'
import { RootState, useAppSelector } from '../redux/store'

const LoadingScreen = () => {
  const { isVideoLoaded } = useAppSelector((state: RootState) => state.app)

  useRemoveScroll(isVideoLoaded)

  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    if (!isVideoLoaded) {
      const timeout = setTimeout(() => setIsHidden(true), 500)
      return () => clearTimeout(timeout)
    }
  }, [isVideoLoaded])

  return (
    <div
      className={`fixed bg-white min-h-screen w-full top-0 left-0 flex items-center justify-center z-50 transition-opacity duration-700 ${
        !isVideoLoaded ? 'opacity-0' : 'opacity-100'
      } ${isHidden ? 'hidden' : ''}`}
    >
      <div
        className={`bg-loadingImg bg-contain bg-center bg-no-repeat aspect-square w-80 h-80 transition-transform ${
          !isVideoLoaded ? 'animate-scaleFadeOut' : ''
        }`}
      ></div>
    </div>
  )
}

export default LoadingScreen
