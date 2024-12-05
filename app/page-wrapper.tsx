'use client'

import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store'
import Header from './components/header/Header'
import LoadingScreen from './components/LoadingScreen'
import { ChildrenProps } from './types/common-types'

const PageWrapper: FC<ChildrenProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadingScreen />
        <Header />
        <main>{children}</main>
      </PersistGate>
    </Provider>
  )
}

export default PageWrapper
