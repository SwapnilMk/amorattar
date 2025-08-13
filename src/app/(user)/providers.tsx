'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../../lib/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ActiveThemeProvider } from '@/components/active-theme';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const { store, persistor } = makeStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ActiveThemeProvider>{children}</ActiveThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
