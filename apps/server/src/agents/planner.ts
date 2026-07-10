import { z } from 'zod';
import { callLLM } from '../llm/openai-client';
import { plannerSystemPrompt } from '../prompts/planner';

interface LLMConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

export interface CampPlan {
  campName: string;
  targetAudience: string;
  startDate: string;
  durationDays: number;
  theme: string;
  highlights: string[];
}

const campPlanSchema = z.object({
  campName: z.string(),
  targetAudience: z.string(),
  startDate: z.string(),
  durationDays: z.number(),
  theme: z.string(),
  highlights: z.array(z.string()),
});

class PlannerAgent {
  async analyze(prompt: string, config: LLMConfig): Promise<CampPlan> {
    const response = await callLLM(config, plannerSystemPrompt, prompt, true);
    
    try {
      const plan = JSON.parse(response);
      const validatedPlan = campPlanSchema.parse(plan);
      return validatedPlan;
    } catch (error) {
      console.error('Planner 输出解析失败:', error);
      throw new Error('需求分析失败，请重新描述需求');
    }
  }
}

export const plannerAgent = new PlannerAgent();
