import { z } from 'zod';
import { callLLM } from '../llm/openai-client';
import { posterSystemPrompt } from '../prompts/poster';

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

const benefitSchema = z.object({
  text: z.string(),
  highlight: z.string(),
});

const curriculumChapterSchema = z.object({
  chapter: z.string(),
  lessons: z.array(z.string()).min(1),
});

export const posterContentSchema = z.object({
  posterType: z.string().optional(),
  title: z.string(),
  subtitle: z.string(),
  category: z.string(),
  joinText: z.string(),
  benefits: z.array(benefitSchema).min(1),
  curriculum: z.array(curriculumChapterSchema).min(1),
  qrText: z.string(),
});

export type PosterContent = z.infer<typeof posterContentSchema>;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlightText(text: string, keyword: string): string {
  const safeText = escapeHtml(text);
  const safeKeyword = escapeHtml(keyword);
  if (!safeKeyword) return safeText;
  return safeText.replace(safeKeyword, `<strong style="color:#FF6B35;">${safeKeyword}</strong>`);
}

export function buildPosterHTML(content: PosterContent): string {
  const benefitsHtml = content.benefits
    .map(
      (b, i) => `
        <div style="background:white;border-left:4px solid #2EC4B6;padding:15px 20px;margin-bottom:12px;border-radius:12px;font-size:15px;color:#2D3436;box-shadow:0 4px 12px rgba(0,0,0,0.06);">
          <span style="margin-right:8px;">${['🚀', '💡', '⭐', '🎯', '🔥'][i % 5]}</span>
          ${highlightText(b.text, b.highlight)}
        </div>`
    )
    .join('');

  const mid = Math.ceil(content.curriculum.length / 2);
  const leftChapters = content.curriculum.slice(0, mid);
  const rightChapters = content.curriculum.slice(mid);

  const renderChapter = (ch: z.infer<typeof curriculumChapterSchema>) => `
    <div style="margin-bottom:18px;">
      <div style="font-size:15px;font-weight:700;color:#FF6B35;margin-bottom:8px;">${escapeHtml(ch.chapter)}</div>
      ${ch.lessons
        .map(
          (lesson) =>
            `<div style="font-size:13px;color:#636E72;padding:3px 0 3px 12px;border-left:2px solid #F7C59F;margin-bottom:4px;">${escapeHtml(lesson)}</div>`
        )
        .join('')}
    </div>`;

  const curriculumHtml = `
    <div style="display:flex;gap:16px;">
      <div style="flex:1;">${leftChapters.map(renderChapter).join('')}</div>
      <div style="flex:1;">${rightChapters.map(renderChapter).join('')}</div>
    </div>`;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(content.title)}</title>
</head>
<body style="margin:0;padding:20px;font-family:'Noto Sans SC',sans-serif;background:linear-gradient(135deg,#FFFAF0 0%,#FFF5E6 50%,#FFE8D6 100%);display:flex;justify-content:center;">
  <div style="position:relative;max-width:600px;width:100%;background:white;border-radius:30px;overflow:hidden;box-shadow:0 20px 60px rgba(255,107,53,0.2);">
    <div style="position:absolute;top:0;left:0;right:0;height:280px;background:linear-gradient(135deg,#FF6B35 0%,#F7C59F 50%,#2EC4B6 100%);opacity:0.08;"></div>

    <!-- 1. 顶部标题区 -->
    <div style="position:relative;z-index:1;padding:40px 30px 24px;text-align:center;">
      <div style="display:inline-block;background:linear-gradient(135deg,#FF6B35,#F7C59F);color:white;padding:8px 20px;border-radius:20px;font-size:14px;font-weight:500;margin-bottom:15px;">🔥 限时训练营</div>
      <h1 style="font-size:38px;font-weight:900;color:#FF6B35;margin:0 0 12px;line-height:1.3;">${escapeHtml(content.title)}</h1>
      <p style="font-size:20px;color:#636E72;font-weight:500;margin:0 0 8px;">${escapeHtml(content.subtitle)}</p>
      <p style="font-size:14px;color:#B2BEC3;margin:0;">${escapeHtml(content.category)}</p>
      <div style="width:60px;height:4px;background:linear-gradient(90deg,#FF6B35,#2EC4B6);margin:20px auto 0;border-radius:2px;"></div>
    </div>

    <!-- 2. JOIN US 邀约区 -->
    <div style="position:relative;z-index:1;padding:0 30px 24px;text-align:center;">
      <div style="display:inline-block;background:linear-gradient(135deg,#FFF5E6,#FFFAF0);border:2px solid rgba(255,107,53,0.15);border-radius:50px;padding:14px 32px;font-size:18px;font-weight:700;color:#FF6B35;letter-spacing:1px;">
        ${escapeHtml(content.joinText)}
      </div>
    </div>

    <!-- 3. 你将收获 -->
    <div style="position:relative;z-index:1;padding:0 30px 28px;">
      <div style="font-size:22px;font-weight:700;color:#2D3436;margin-bottom:20px;text-align:center;">✨ 你将收获</div>
      ${benefitsHtml}
    </div>

    <!-- 4. 课程目录 -->
    <div style="position:relative;z-index:1;padding:0 30px 28px;">
      <div style="font-size:22px;font-weight:700;color:#2D3436;margin-bottom:20px;text-align:center;">📚 课程目录</div>
      ${curriculumHtml}
    </div>

    <!-- 5. 底部二维码区 -->
    <div style="position:relative;z-index:1;padding:30px;background:linear-gradient(135deg,#FF6B35,#F7C59F);text-align:center;border-radius:0 0 30px 30px;">
      <p style="color:white;font-size:18px;font-weight:500;margin:0 0 20px;">${escapeHtml(content.qrText)}</p>
      <div style="display:inline-block;background:white;padding:15px;border-radius:15px;box-shadow:0 8px 20px rgba(0,0,0,0.2);">{{QR_CODE}}</div>
    </div>
  </div>
</body>
</html>`;
}

const DEFAULT_CHAPTERS = [
  { chapter: 'Ⅰ. 认知与定位', lessons: ['行业趋势与核心概念', '学习路径规划', '目标设定与方法'] },
  { chapter: 'Ⅱ. 基础搭建', lessons: ['工具与环境准备', '基础技能入门', '实操练习'] },
  { chapter: 'Ⅲ. 内容产出', lessons: ['核心方法掌握', '案例拆解分析', '动手实践'] },
  { chapter: 'Ⅳ. 专项实操', lessons: ['进阶技巧训练', '常见问题解决', '项目练习'] },
  { chapter: 'Ⅴ. 流量运营', lessons: ['推广策略入门', '渠道运营方法', '用户增长技巧'] },
  { chapter: 'Ⅵ. 数据复盘', lessons: ['数据分析基础', '效果评估方法', '优化迭代'] },
  { chapter: 'Ⅶ. 变现规划', lessons: ['商业化路径', '变现模式分析', '实战方案'] },
  { chapter: 'Ⅷ. 结业输出', lessons: ['成果整理展示', '作品集构建', '后续成长规划'] },
];

function buildFallbackContent(plan: CampPlan): PosterContent {
  const benefits = plan.highlights.length > 0
    ? plan.highlights.map((h) => ({ text: h, highlight: h.slice(0, Math.min(6, h.length)) }))
    : [
        { text: '掌握核心技能，建立系统化知识体系', highlight: '核心技能' },
        { text: '完成实战项目，积累可展示的作品成果', highlight: '实战项目' },
        { text: '获得社群支持，与同行者共同进步', highlight: '社群支持' },
      ];

  while (benefits.length < 5) {
    benefits.push({ text: '持续提升专业能力，拓展职业发展空间', highlight: '职业发展' });
  }

  return {
    posterType: '招生引流海报',
    title: plan.campName.includes('训练营') ? plan.campName : `${plan.campName}训练营`,
    subtitle: `${plan.durationDays}天${plan.theme}，从零到一系统进阶`,
    category: `面向${plan.targetAudience} · ${plan.theme}`,
    joinText: 'JOIN US · 一起开启成长之旅',
    benefits: benefits.slice(0, 5),
    curriculum: DEFAULT_CHAPTERS,
    qrText: `扫码立即报名，${plan.startDate} 开营`,
  };
}

class PosterTool {
  async generate(plan: CampPlan, config: LLMConfig) {
    const userPrompt = `
请为以下训练营生成海报文案 JSON（5大分区全部必填，curriculum 输出完整8章）：

营名：${plan.campName}
受众：${plan.targetAudience}
开营日期：${plan.startDate}
天数：${plan.durationDays} 天
主题：${plan.theme}
参考亮点：${plan.highlights.join('、')}

要求：
1. 严格按 system prompt 的 JSON 字段输出，不要输出 HTML
2. benefits 输出 5 条，curriculum 输出 8 章（Ⅰ~Ⅷ）
3. 文案贴合训练营主题与受众，参考亮点但不照搬
    `;

    const response = await callLLM(config, posterSystemPrompt, userPrompt, true, 4000);

    let content: PosterContent;
    try {
      const parsed = JSON.parse(response);
      content = posterContentSchema.parse(parsed);
    } catch (error) {
      console.error('Poster 输出解析失败，使用 fallback 文案:', error);
      content = buildFallbackContent(plan);
    }

    return {
      html: buildPosterHTML(content),
      title: content.title,
      subtitle: content.subtitle,
      category: content.category,
      joinText: content.joinText,
      benefits: content.benefits,
      curriculum: content.curriculum,
      qrText: content.qrText,
      bullets: content.benefits.map((b) => b.text),
    };
  }
}

export const posterTool = new PosterTool();
