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

export function buildFallbackMessage(plan: CampPlan, day: number): string {
  const isFirst = day === 1;
  const isLast = day === plan.durationDays;

  const header = `📢【${plan.campName} Day ${day}】`;

  const opening = isFirst
    ? `欢迎加入 ${plan.campName}！从今天起，我们一起开启 ${plan.theme} 的学习之旅。`
    : isLast
      ? `最后一天啦！感谢一路坚持到现在的你，今天的学习是为整个训练营画上一个圆满的句号。`
      : `昨天大家的学习热情满满，今天继续保持！`;

  const encouragement = isFirst
    ? `学习最怕的不是起步慢，而是迟迟不开始。今天迈出第一步，就已经超过了停在原地的自己。`
    : isLast
      ? `能走到这里，说明你已经把「坚持」变成了实实在在的行动，这份自律比任何证书都珍贵。`
      : `坚持每天学习一点点，比临时抱佛脚更有效。慢慢积累，你会惊讶于自己的变化。`;

  const learning = `📚 今日学习内容：\n✅ ${plan.theme}核心概念（第${day}部分）\n✅ 配套实操练习\n✅ 常见问题与解决思路`;

  const tasks = `📝 今日任务：\n① 完成 Day ${day} 课程学习\n② 完成配套练习\n③ 群内打卡，并分享今天学到的一个新知识`;

  const tip = isFirst
    ? `💡 小提醒：\n第一次接触新领域，看不懂很正常。先跟着课程走一遍，把整体框架搭起来，细节可以后面慢慢补。`
    : `💡 小提醒：\n今天的内容可能涉及一些新的专业名词，第一次接触看不懂很正常，可以先理解整体思路，再慢慢消化。`;

  const closing = isLast
    ? `🎯 恭喜你完成全部 ${plan.durationDays} 天学习！这不是终点，而是你新阶段的起点，继续加油！`
    : `🎯 连续打卡第${day}天，坚持就是一种实力！继续加油！`;

  return [header, '', opening, '', encouragement, '', learning, '', tasks, '', tip, '', closing].join('\n');
}

class ContentTool {
  async generate(plan: CampPlan, config: LLMConfig): Promise<DailyContent[]> {
    const userPrompt = `
请为以下训练营生成每日群发文案和打卡引导（共 ${plan.durationDays} 天，每一天都要输出）：

营名：${plan.campName}
受众：${plan.targetAudience}
天数：${plan.durationDays} 天
主题：${plan.theme}
亮点：${plan.highlights.join('、')}

要求：
1. message 严格按 system prompt 的 6 段结构输出（标题行、开场共情、深度鼓励、今日学习内容、今日任务、小提醒、收尾激励）
2. 每日学习内容递进、贴合主题，不重复
3. 鼓励语要有深度但说人话，禁止晦涩抽象
4. Day 1 开营欢迎；Day 2+ 承接昨日；最后一天结业收尾
5. checkInPrompt 与「今日任务」③ 保持一致
6. 返回 JSON 数组格式，数组长度等于 ${plan.durationDays}
    `;

    const response = await callLLM(config, contentSystemPrompt, userPrompt, true, 6000);

    try {
      const result = JSON.parse(response);
      const contents = Array.isArray(result) ? result : result.dailyContents || [];
      return contents.map((content: unknown) => dailyContentSchema.parse(content));
    } catch (error) {
      console.error('Content 输出解析失败，使用 fallback 文案:', error);
      return this.getDefaultContent(plan);
    }
  }

  private getDefaultContent(plan: CampPlan): DailyContent[] {
    const contents: DailyContent[] = [];
    for (let i = 1; i <= plan.durationDays; i++) {
      contents.push({
        day: i,
        title: `Day ${i}｜${plan.theme}📖`,
        message: buildFallbackMessage(plan, i),
        checkInPrompt: `完成 Day ${i} 课程学习，在群内打卡并分享今天学到的一个新知识`,
      });
    }
    return contents;
  }
}

export const contentTool = new ContentTool();
