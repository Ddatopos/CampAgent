import { create } from 'zustand';

interface UIStore {
  loading: boolean;
  error: string | null;
  activeTab: string;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setActiveTab: (tab: string) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  loading: false,
  error: null,
  activeTab: 'overview',
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));
