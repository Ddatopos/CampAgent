import { create } from 'zustand';

interface UIStore {
  loading: boolean;
  error: string | null;
  activeTab: string;
  createPrompt: string;
  createLoading: boolean;
  createProgress: number;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setActiveTab: (tab: string) => void;
  setCreatePrompt: (prompt: string) => void;
  clearCreatePrompt: () => void;
  setCreateLoading: (loading: boolean) => void;
  setCreateProgress: (progress: number) => void;
  tickCreateProgress: () => void;
  resetCreateProgress: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  loading: false,
  error: null,
  activeTab: 'overview',
  createPrompt: '',
  createLoading: false,
  createProgress: 0,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setCreatePrompt: (createPrompt) => set({ createPrompt }),
  clearCreatePrompt: () => set({ createPrompt: '' }),
  setCreateLoading: (createLoading) => set({ createLoading }),
  setCreateProgress: (createProgress) => set({ createProgress }),
  tickCreateProgress: () =>
    set((state) => ({
      createProgress: state.createProgress >= 90 ? state.createProgress : state.createProgress + 10,
    })),
  resetCreateProgress: () => set({ createLoading: false, createProgress: 0 }),
}));
