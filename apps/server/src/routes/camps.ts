import { Router, Request, Response } from 'express';
import { orchestrator } from '../agents/orchestrator';
import { campStore } from '../store/camp-store';

const router = Router();

router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ success: false, error: '请提供有效的需求描述' });
    }
    
    if (!req.session.llmConfig) {
      return res.status(400).json({ success: false, error: '请先配置 LLM' });
    }
    
    const camp = await orchestrator.generate(prompt, req.session.llmConfig);
    
    const savedCamp = campStore.add(camp);
    
    res.json({ success: true, data: savedCamp });
  } catch (error: any) {
    console.error('生成失败:', error);
    res.status(500).json({ success: false, error: error.message || '生成失败' });
  }
});

router.get('/', (req: Request, res: Response) => {
  const camps = campStore.getAll();
  res.json({ success: true, data: camps });
});

router.get('/:id', (req: Request, res: Response) => {
  const camp = campStore.get(req.params.id);
  if (!camp) {
    return res.status(404).json({ success: false, error: '活动不存在' });
  }
  res.json({ success: true, data: camp });
});

router.put('/:id', (req: Request, res: Response) => {
  const updates = req.body;
  const camp = campStore.update(req.params.id, updates);
  if (!camp) {
    return res.status(404).json({ success: false, error: '活动不存在' });
  }
  res.json({ success: true, data: camp });
});

router.delete('/:id', (req: Request, res: Response) => {
  const success = campStore.delete(req.params.id);
  if (!success) {
    return res.status(404).json({ success: false, error: '活动不存在' });
  }
  res.json({ success: true });
});

router.get('/:id/poster.html', (req: Request, res: Response) => {
  const camp = campStore.get(req.params.id);
  if (!camp) {
    return res.status(404).send('活动不存在');
  }
  res.setHeader('Content-Type', 'text/html');
  res.send(camp.poster.html);
});

export default router;
