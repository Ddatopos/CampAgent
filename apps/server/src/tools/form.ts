import { z } from 'zod';
import { callLLM } from '../llm/openai-client';
import { formSystemPrompt } from '../prompts/form';

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

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

const formFieldSchema = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(['text', 'email', 'phone', 'select', 'textarea']),
  required: z.boolean(),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
});

class FormTool {
  async generate(plan: CampPlan, config: LLMConfig): Promise<FormField[]> {
    const userPrompt = `
请为以下训练营生成报名表单字段：

营名：${plan.campName}
受众：${plan.targetAudience}
主题：${plan.theme}

要求：
1. 生成必要的报名字段（姓名、联系方式等）
2. 根据训练营特点添加相关字段
3. 字段类型包括：text, email, phone, select, textarea
4. 返回 JSON 数组格式
    `;
    
    const response = await callLLM(config, formSystemPrompt, userPrompt, true);
    
    try {
      const result = JSON.parse(response);
      const fields = Array.isArray(result) ? result : result.fields || [];
      return fields.map((field: any) => formFieldSchema.parse(field));
    } catch (error) {
      console.error('Form 输出解析失败:', error);
      return this.getDefaultForm();
    }
  }
  
  private getDefaultForm(): FormField[] {
    return [
      { name: 'name', label: '姓名', type: 'text', required: true, placeholder: '请输入姓名' },
      { name: 'email', label: '邮箱', type: 'email', required: true, placeholder: '请输入邮箱' },
      { name: 'phone', label: '手机号', type: 'phone', required: true, placeholder: '请输入手机号' },
      { name: 'company', label: '公司/学校', type: 'text', required: false, placeholder: '请输入公司或学校名称' },
      { name: 'experience', label: '相关经验', type: 'textarea', required: false, placeholder: '请简述您的相关经验' },
    ];
  }
}

export const formTool = new FormTool();
