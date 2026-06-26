import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupApi, loginApi, logoutApi } from '../../../api/auth.api';
import { useAuthStore } from '../../../store/authStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const signup = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await signupApi(data);
      const { user, accessToken } = response.data;
      setAuth(user, accessToken);
      navigate('/dashboard');
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginApi(data);
      const { user, accessToken } = response.data;
      setAuth(user, accessToken);
      navigate('/dashboard');
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
    } finally {
      clearAuth();
      navigate('/login');
    }
  };

  return { signup, login, logout, loading, error };
};