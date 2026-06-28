import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import SocketListener from './components/SocketListener';
import Toast from './components/common/Toast';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useToastStore } from './store/toastStore';

const App = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <BrowserRouter>
      <SocketListener />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
      <Toast toasts={toasts} />
    </BrowserRouter>
  );
};

export default App;