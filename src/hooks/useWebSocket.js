import { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import { initSocket, disconnectSocket, getSocket } from '../sockets/socket.client';

export const useWebSocket = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const socketRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      socketRef.current = initSocket(accessToken);
    }

    return () => {
      if (!isAuthenticated) {
        disconnectSocket();
      }
    };
  }, [isAuthenticated, accessToken]);

  return getSocket();
};