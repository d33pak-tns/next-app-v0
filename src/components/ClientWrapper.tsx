'use client';

import { useEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store'; 
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Provider store={store}>
        <CssBaseline />
        {children}
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ClientWrapper;
