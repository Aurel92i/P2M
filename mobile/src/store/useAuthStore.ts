import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { apiClient } from '../services/apiClient';
import { User, RegisterData } from '../types/entities';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  setToken: (token?: string) => Promise<void>;
  bootstrap: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  setToken: async (token?: string) => {
    if (token) {
      await SecureStore.setItemAsync('jwt', token);
      set({ token, isAuthenticated: true });
    } else {
      await SecureStore.deleteItemAsync('jwt');
      set({ token: null, isAuthenticated: false, user: null });
    }
  },

  bootstrap: async () => {
    try {
      set({ isLoading: true });
      const stored = await SecureStore.getItemAsync('jwt');

      if (stored) {
        set({ token: stored, isAuthenticated: true });
        // Fetch user data
        await get().fetchUser();
      }
    } catch (error) {
      console.error('Bootstrap error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUser: async () => {
    try {
      const response = await apiClient.get<User>('/auth/me');
      set({ user: response.data });
    } catch (error) {
      console.error('Fetch user error:', error);
      // If token is invalid, clear auth state
      await get().logout();
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<{ token: string; user: User }>('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      await get().setToken(token);
      set({ user, isAuthenticated: true });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur de connexion');
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data: RegisterData) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.post<{ token: string; user: User }>('/auth/register', data);

      const { token, user } = response.data;
      await get().setToken(token);
      set({ user, isAuthenticated: true });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await get().setToken(undefined);
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  refreshToken: async () => {
    try {
      const response = await apiClient.post<{ token: string }>('/auth/refresh');
      await get().setToken(response.data.token);
    } catch (error) {
      console.error('Refresh token error:', error);
      await get().logout();
    }
  },

  updateProfile: async (data: Partial<User>) => {
    try {
      set({ isLoading: true });
      const response = await apiClient.put<User>('/auth/profile', data);
      set({ user: response.data });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Setup axios interceptor for authorization
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Setup axios interceptor for token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await useAuthStore.getState().refreshToken();
        return apiClient(originalRequest);
      } catch (refreshError) {
        await useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
