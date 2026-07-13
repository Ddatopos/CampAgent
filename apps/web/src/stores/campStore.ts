import { create } from 'zustand';

interface CampPlan {
  campName: string;
  targetAudience: string;
  startDate: string;
  durationDays: number;
  theme: string;
  highlights: string[];
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface DailyContent {
  day: number;
  title: string;
  message: string;
  checkInPrompt: string;
}

interface Camp {
  id: string;
  userPrompt: string;
  plan: CampPlan;
  poster: {
    html: string;
    title: string;
    subtitle: string;
    bullets: string[];
  };
  form: FormField[];
  dailyContents: DailyContent[];
  registrationUrl: string;
  qrCodeDataUrl?: string;
  status: 'draft' | 'ready';
  createdAt: string;
  updatedAt: string;
}

interface CampStore {
  camps: Camp[];
  currentCamp: Camp | null;
  addCamp: (camp: Camp) => void;
  updateCamp: (id: string, updates: Partial<Camp>) => void;
  deleteCamp: (id: string) => void;
  setCurrentCamp: (camp: Camp | null) => void;
}

export const useCampStore = create<CampStore>((set) => ({
  camps: [],
  currentCamp: null,
  addCamp: (camp) => set((state) => ({ camps: [...state.camps, camp] })),
  updateCamp: (id, updates) =>
    set((state) => ({
      camps: state.camps.map((camp) =>
        camp.id === id ? { ...camp, ...updates, updatedAt: new Date().toISOString() } : camp
      ),
    })),
  deleteCamp: (id) => set((state) => ({ camps: state.camps.filter((camp) => camp.id !== id) })),
  setCurrentCamp: (camp) => set({ currentCamp: camp }),
}));
