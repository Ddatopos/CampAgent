import { plannerAgent } from './planner';
import { posterTool } from '../tools/poster';
import { formTool } from '../tools/form';
import { contentTool } from '../tools/content';
import { qrcodeTool } from '../tools/qrcode';

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
    const qrCodeDataUrl = await qrcodeTool.generate(registrationUrl);
    
    const posterWithQR = poster.html.replace('{{QR_CODE}}', `<img src="${qrCodeDataUrl}" alt="QR Code" />`);
    
    return {
      userPrompt: prompt,
      plan,
      poster: {
        ...poster,
        html: posterWithQR,
      },
      form,
      dailyContents,
      registrationUrl,
      qrCodeDataUrl,
      status: 'ready' as const,
    };
  }
}

export const orchestrator = new Orchestrator();
