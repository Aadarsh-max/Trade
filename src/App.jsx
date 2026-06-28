import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import SocketListener from './components/SocketListener';
import Toast from './components/common/Toast';
import { useToastStore } from './store/toastStore';

const App = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <BrowserRouter>
      <SocketListener />
      <AppRoutes />
      <Toast toasts={toasts} />
    </BrowserRouter>
  );
};

export default App;