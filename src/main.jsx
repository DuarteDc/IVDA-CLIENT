import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { NextUIProvider } from '@nextui-org/system';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)
