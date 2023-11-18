import { useContext } from 'react';

import { UIContext } from './context/ui/UIContext';

import { MainRouter } from './routes';
import { InitialScreenLoading } from './components/ui/InitialScreenLoading';

function App() {

  const { screenLoading } = useContext(UIContext);
  return screenLoading ? <InitialScreenLoading /> : <MainRouter />
}

export default App
