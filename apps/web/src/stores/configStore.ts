import { create } from 'zustand';

interface Config {
  baseUrl: string;
  apiKey: string;
  model: string;
}

interface ConfigStore {
  config: Config | null;
  setConfig: (config: Config) => void;
  clearConfig: () => void;
}

export const useConfigStore = create<ConfigStore>((set) => ({
  config: null,
  setConfig: (config) => set({ config }),
  clearConfig: () => set({ config: null }),
}));
