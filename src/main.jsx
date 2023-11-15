import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { NextUIProvider } from '@nextui-org/system';

import App from './App';
import { AuthProvider } from './context/auth/AuthProvider';
import { UIProvider } from './context/ui/UIProvider';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(

  <NextUIProvider>
    <BrowserRouter>
      <Toaster />
      <UIProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UIProvider>
    </BrowserRouter>
  </NextUIProvider>
)
