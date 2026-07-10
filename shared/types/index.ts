export interface CampPlan {
  campName: string;
  targetAudience: string;
  startDate: string;
  durationDays: number;
  theme: string;
  highlights: string[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface DailyContent {
  day: number;
  title: string;
  message: string;
  checkInPrompt: string;
}

export interface Camp {
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

export interface LLMConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}
