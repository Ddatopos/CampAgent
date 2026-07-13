import { plannerAgent } from './planner';
import { posterTool } from '../tools/poster';
import { formTool } from '../tools/form';
import { contentTool } from '../tools/content';

interface LLMConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

class Orchestrator {
  async generate(prompt: string, config: LLMConfig) {
    console.log('🎯 开始生成开营物料...');
    
    const plan = await plannerAgent.analyze(prompt, config);
    console.log('📋 需求分析完成:', plan);
    
    const [poster, form, dailyContents] = await Promise.all([
      posterTool.generate(plan, config),
      formTool.generate(plan, config),
      contentTool.generate(plan, config),
    ]);
    
    console.log('🎨 海报生成完成');
    console.log('📝 表单生成完成');
    console.log('💬 文案生成完成');
    
    const registrationUrl = `http://localhost:3000/register/${plan.campName}`;
    
    return {
      userPrompt: prompt,
      plan,
      poster,
      form,
      dailyContents,
      registrationUrl,
      status: 'ready' as const,
    };
  }
}

export const orchestrator = new Orchestrator();
