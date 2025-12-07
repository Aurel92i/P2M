import { create } from 'zustand';
import { apiClient } from '../services/apiClient';
import { AddressList } from '../types/entities';

interface ListingsState {
  lists: AddressList[];
  loading: boolean;
  fetchLists: () => Promise<void>;
  setLists: (lists: AddressList[]) => void;
}

export const useListingsStore = create<ListingsState>((set) => ({
  lists: [],
  loading: false,
  fetchLists: async () => {
    set({ loading: true });
    const res = await apiClient.get<AddressList[]>('/address-lists');
    set({ lists: res.data, loading: false });
  },
  setLists: (lists) => set({ lists })
}));
