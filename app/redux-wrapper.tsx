'use client'

import React, { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import Aos from 'aos'
import { store } from './redux/store'
import { PageWrapperProps } from './types/common.types'
import PageWrapper from './page-wrapper'

const ReduxWrapper: FC<PageWrapperProps> = ({ children, isLoggedIn }) => {
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
      <PageWrapper isLoggedIn={isLoggedIn}>{children}</PageWrapper>
    </Provider>
  )
}

export default ReduxWrapper
