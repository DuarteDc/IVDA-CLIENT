import { useContext } from 'react';

import { UIContext } from './context/ui/UIContext';

import { MainRouter } from './routes';
import { LoadingScreen } from './components/ui/LoadingScreen';

function App() {

  const { loading } = useContext(UIContext);
  return loading ? <LoadingScreen /> : <MainRouter />
}

export default App
