import { z } from 'zod';
import { callLLM } from '../llm/openai-client';
import { contentSystemPrompt } from '../prompts/content';

interface LLMConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

interface CampPlan {
  campName: string;
  targetAudience: string;
  startDate: string;
  durationDays: number;
  theme: string;
  highlights: string[];
}

export interface DailyContent {
  day: number;
  title: string;
  message: string;
  checkInPrompt: string;
}

const dailyContentSchema = z.object({
  day: z.number(),
  title: z.string(),
  message: z.string(),
  checkInPrompt: z.string(),
});

class ContentTool {
  async generate(plan: CampPlan, config: LLMConfig): Promise<DailyContent[]> {
    const userPrompt = `
请为以下训练营生成每日群发文案和打卡引导：

营名：${plan.campName}
受众：${plan.targetAudience}
天数：${plan.durationDays} 天
主题：${plan.theme}
亮点：${plan.highlights.join('、')}

要求：
1. 为每一天生成标题、群发消息、打卡引导语
2. 文案要专业、有吸引力
3. 打卡引导要具体可执行
4. 返回 JSON 数组格式
    `;
    
    const response = await callLLM(config, contentSystemPrompt, userPrompt, true);
    
    try {
      const result = JSON.parse(response);
      const contents = Array.isArray(result) ? result : result.dailyContents || [];
      return contents.map((content: any) => dailyContentSchema.parse(content));
    } catch (error) {
      console.error('Content 输出解析失败:', error);
      return this.getDefaultContent(plan.durationDays);
    }
  }
  
  private getDefaultContent(days: number): DailyContent[] {
    const contents: DailyContent[] = [];
    for (let i = 1; i <= days; i++) {
      contents.push({
        day: i,
        title: `第 ${i} 天：学习与实践`,
        message: `今天是训练营第 ${i} 天，让我们一起学习新知识，完成实践任务！加油！💪`,
        checkInPrompt: `请在群内分享今天的学习心得和实践成果`,
      });
    }
    return contents;
  }
}

export const contentTool = new ContentTool();
