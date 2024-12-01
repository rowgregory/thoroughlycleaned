'use client'

import React, { ReactNode } from 'react'
import Header from './components/header/Header'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="min-h-screen">
          <Header />
          {children}
        </div>
      </PersistGate>
    </Provider>
  )
}

export default PageWrapper
