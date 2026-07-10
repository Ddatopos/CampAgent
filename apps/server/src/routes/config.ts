import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { testLLMConnection } from '../llm/openai-client';

const router = Router();

const configSchema = z.object({
  baseUrl: z.string().url(),
  apiKey: z.string().min(1),
  model: z.string().min(1),
});

const normalizeConfig = (body: unknown) => {
  const raw = z.object({
    baseUrl: z.string(),
    apiKey: z.string(),
    model: z.string(),
  }).parse(body);

  const baseUrl = raw.baseUrl.trim().replace(/\/+$/, '');
  const apiKey = raw.apiKey.trim().replace(/^Bearer\s+/i, '');
  const model = raw.model.trim();

  return configSchema.parse({ baseUrl, apiKey, model });
};

router.post('/', async (req: Request, res: Response) => {
  try {
    const config = normalizeConfig(req.body);

    req.session.llmConfig = config;

    const result = await testLLMConnection(config);

    if (result.ok) {
      res.json({ success: true, message: '连接测试成功' });
    } else {
      res.status(400).json({ success: false, error: result.error });
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, error: '配置格式错误', details: error.errors });
    } else {
      res.status(500).json({ success: false, error: error.message || '配置失败' });
    }
  }
});

export default router;
