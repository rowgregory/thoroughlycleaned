'use client'

import React, { FC, useEffect } from 'react'
import { useAppDispatch } from './redux/store'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import LoadingScreen from './components/LoadingScreen'
import { setAuthState } from './redux/features/authSlice'
import { PageWrapperProps } from './types/common.types'
import 'aos/dist/aos.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const PageWrapper: FC<PageWrapperProps> = ({ children, isLoggedIn }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAuthState(isLoggedIn))
  }, [dispatch, isLoggedIn])

  return (
    <>
      <LoadingScreen />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default PageWrapper
