'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../../lib/store';
import { PersistGate } from 'redux-persist/integration/react';
import SpinnerbLoader from '@/components/ui/SpinnerbLoader';
import { ActiveThemeProvider } from '@/components/active-theme';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const { store, persistor } = makeStore();

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className='flex h-96 items-center justify-center'>
            <SpinnerbLoader className='w-10 border-2 border-gray-300 border-r-gray-600' />
          </div>
        }
        persistor={persistor}
      >
        <ActiveThemeProvider>{children}</ActiveThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
