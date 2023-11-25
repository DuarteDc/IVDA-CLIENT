import { useContext, useEffect, useRef } from 'react';

import { UIContext } from './context/ui/UIContext';

import { MainRouter } from './routes';
import { InitialScreenLoading } from './components/ui/InitialScreenLoading';
import { NextUIProvider } from '@nextui-org/system';

function App() {

  const { theme } = useContext(UIContext);
  const { screenLoading } = useContext(UIContext);

  useEffect(() => {
    const body = document.querySelector('body');
    if (theme === 'dark') {
      body.classList.remove('light')
      return body.classList.add(`${theme}`);
    }
    body.classList.remove('dark')
    body.classList.add(`${theme}`);
  }, [theme]);

  return (
    screenLoading ? <InitialScreenLoading /> : <MainRouter />
  )
}

export default App
