import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import ThemeContextProvider from './contexts/ThemeContext';
import { CakeProvider } from './contexts/CakeContext';
import { SnackbarProvider } from './contexts/SnackbarContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <SnackbarProvider>
        <CakeProvider>
          <Router />
        </CakeProvider>
      </SnackbarProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
