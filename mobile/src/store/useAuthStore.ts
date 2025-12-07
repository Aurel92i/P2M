import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { apiClient } from '../services/apiClient';

interface AuthState {
  token?: string;
  loading: boolean;
  setToken: (token?: string) => Promise<void>;
  bootstrap: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  loading: true,
  setToken: async (token?: string) => {
    set({ token });
    if (token) {
      await SecureStore.setItemAsync('jwt', token);
    } else {
      await SecureStore.deleteItemAsync('jwt');
    }
  },
  bootstrap: async () => {
    const stored = await SecureStore.getItemAsync('jwt');
    if (stored) set({ token: stored });
    set({ loading: false });
  }
}));

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
