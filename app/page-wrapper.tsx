'use client';

import React from 'react';
import Header from './components/header/Header';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18next';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const PageWrapper = ({ children }: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <div className="min-h-screen">
            <Header />
            {children}
          </div>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
};

export default PageWrapper;
