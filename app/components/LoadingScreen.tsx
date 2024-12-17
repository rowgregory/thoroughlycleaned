'use client'

import { useEffect, useState } from 'react'
import useRemoveScroll from '../hooks/useRemoveScroll'
import { RootState, useAppDispatch, useAppSelector } from '../redux/store'
import useCustomPathname from '../hooks/useCustomPathname'
import { setIsVideoLoaded } from '../redux/features/appSlice'

const LoadingScreen = () => {
  const { isVideoLoaded } = useAppSelector((state: RootState) => state.app)

  const pathname = useCustomPathname()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (pathname !== '/') {
      setTimeout(() => {
        dispatch(setIsVideoLoaded())
      }, 1000)
    }
  }, [dispatch, pathname])

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
        className={`bg-logo bg-contain bg-center bg-no-repeat aspect-square w-80 h-80 transition-transform ${
          !isVideoLoaded ? 'animate-scaleFadeOut' : ''
        }`}
      ></div>
    </div>
  )
}

export default LoadingScreen
