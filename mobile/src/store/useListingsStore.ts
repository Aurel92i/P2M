import { create } from 'zustand';
import { apiClient } from '../services/apiClient';
import { AddressList } from '../types/entities';

interface ListingsState {
  lists: AddressList[];
  loading: boolean;
  error: string | null;
  fetchLists: () => Promise<void>;
  setLists: (lists: AddressList[]) => void;
}

export const useListingsStore = create<ListingsState>((set) => ({
  lists: [],
  loading: false,
  error: null,
  fetchLists: async () => {
    try {
      set({ loading: true, error: null });
      const res = await apiClient.get<AddressList[]>('/address-lists');
      set({ lists: res.data, loading: false });
    } catch (error: any) {
      console.error('Erreur lors du chargement des listes:', error);
      set({
        loading: false,
        error: error.response?.data?.message || error.message || 'Erreur de connexion au serveur'
      });
    }
  },
  setLists: (lists) => set({ lists })
}));
