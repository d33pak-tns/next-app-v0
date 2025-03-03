// src/components/ClientWrapper.tsx

'use client'; // Mark this as a client-side component

import { useEffect, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store'; // Adjust the path to your store
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  // This effect will only run on the client side to prevent SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render the children without PersistGate during SSR
    return (
      <Provider store={store}>
        <CssBaseline />
        {children}
      </Provider>
    );
  }

  // Render PersistGate on the client-side only
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
