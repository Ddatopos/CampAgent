import { v4 as uuidv4 } from 'uuid';

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
  qrCodeDataUrl: string;
  status: 'draft' | 'ready';
  createdAt: string;
  updatedAt: string;
}

class CampStore {
  private camps: Map<string, Camp> = new Map();
  
  add(camp: Omit<Camp, 'id' | 'createdAt' | 'updatedAt'>): Camp {
    const id = uuidv4();
    const now = new Date().toISOString();
    const newCamp: Camp = {
      ...camp,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.camps.set(id, newCamp);
    return newCamp;
  }
  
  get(id: string): Camp | undefined {
    return this.camps.get(id);
  }
  
  getAll(): Camp[] {
    return Array.from(this.camps.values());
  }
  
  update(id: string, updates: Partial<Camp>): Camp | undefined {
    const camp = this.camps.get(id);
    if (!camp) return undefined;
    
    const updatedCamp: Camp = {
      ...camp,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.camps.set(id, updatedCamp);
    return updatedCamp;
  }
  
  delete(id: string): boolean {
    return this.camps.delete(id);
  }
}

export const campStore = new CampStore();
