import { create } from 'zustand';

const getStoredUser = () => {
  const stored = localStorage.getItem('user');

  if (!stored || stored === 'undefined') {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (err) {
    return null;
  }
};

export const useAuthStore = create((set) => ({
  user: getStoredUser(),
  accessToken: localStorage.getItem('accessToken') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),

  setAuth: (user, accessToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, accessToken, isAuthenticated: true });
  },

  clearAuth: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
}));