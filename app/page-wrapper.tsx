'use client'

import React, { FC, useEffect } from 'react'
import Aos from 'aos'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store'
import Header from './components/header/Header'
import LoadingScreen from './components/LoadingScreen'
import { ChildrenProps } from './types/common-types'
import Footer from './components/footer/Footer'
import 'aos/dist/aos.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const PageWrapper: FC<ChildrenProps> = ({ children }) => {
  useEffect(() => {
    Aos.init({
      offset: 0,
      duration: 500,
      easing: 'ease-in-out',
      once: false,
      anchorPlacement: 'top-bottom'
    })

    Aos.refresh()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadingScreen />
        <Header />
        <main>{children}</main>
        <Footer />
      </PersistGate>
    </Provider>
  )
}

export default PageWrapper
