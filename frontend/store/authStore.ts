import { create } from 'zustand';
import { apiClient } from '@/lib/apiClient';
import { User, AuthState } from '@/types';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      const { accessToken, user } = response.data;
      localStorage.setItem('accessToken', accessToken);

      set({
        user,
        accessToken,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      await apiClient.post('/auth/register', {
        name,
        email,
        password,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('accessToken');
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    }
  },

  refreshToken: async () => {
    try {
      const response = await apiClient.post('/auth/refresh');
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      set({ accessToken });
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
      return;
    }

    try {
      const response = await apiClient.get('/users/me');
      set({
        user: response.data,
        accessToken: token,
        isAuthenticated: true,
      });
    } catch (error) {
      localStorage.removeItem('accessToken');
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    }
  },
}));
