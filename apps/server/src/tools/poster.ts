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

class PosterTool {
  async generate(plan: CampPlan, config: LLMConfig) {
    const userPrompt = `
请为以下训练营生成 HTML 海报：

营名：${plan.campName}
受众：${plan.targetAudience}
日期：${plan.startDate}
天数：${plan.durationDays} 天
主题：${plan.theme}
亮点：${plan.highlights.join('、')}

要求：
1. 生成移动端友好的 HTML，内联 CSS
2. 使用暖色调（橙色、杏色、青绿色）
3. 在海报中预留 {{QR_CODE}} 占位符用于插入二维码
4. 标题醒目，布局清晰
    `;
    
    const response = await callLLM(config, posterSystemPrompt, userPrompt, true);
    
    try {
      const result = JSON.parse(response);
      return {
        html: result.htmlTemplate || result.html,
        title: result.title || plan.campName,
        subtitle: result.subtitle || plan.theme,
        bullets: result.bullets || plan.highlights,
      };
    } catch (error) {
      console.error('Poster 输出解析失败:', error);
      return {
        html: this.getDefaultHTML(plan),
        title: plan.campName,
        subtitle: plan.theme,
        bullets: plan.highlights,
      };
    }
  }
  
  private getDefaultHTML(plan: CampPlan): string {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=ZCOOL+KuaiLe&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Noto Sans SC', sans-serif;
      background: linear-gradient(135deg, #FFFAF0 0%, #FFF5E6 50%, #FFE8D6 100%);
      min-height: 100vh;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .poster {
      position: relative;
      max-width: 600px;
      width: 100%;
      background: white;
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2), 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    /* 装饰背景 */
    .decorative-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 300px;
      background: linear-gradient(135deg, #FF6B35 0%, #F7C59F 50%, #2EC4B6 100%);
      opacity: 0.1;
      z-index: 0;
    }
    
    .decorative-circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.15;
      z-index: 0;
    }
    
    .circle-1 {
      width: 200px;
      height: 200px;
      background: #FF6B35;
      top: -50px;
      right: -50px;
    }
    
    .circle-2 {
      width: 150px;
      height: 150px;
      background: #2EC4B6;
      bottom: 100px;
      left: -30px;
    }
    
    .circle-3 {
      width: 100px;
      height: 100px;
      background: #F7C59F;
      top: 200px;
      right: 20px;
    }
    
    /* 标题区域 */
    .header {
      position: relative;
      z-index: 1;
      padding: 40px 30px 30px;
      text-align: center;
    }
    
    .badge {
      display: inline-block;
      background: linear-gradient(135deg, #FF6B35, #F7C59F);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 15px;
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
      animation: pulse 2s ease-in-out infinite;
    }
    
    .title {
      font-family: 'ZCOOL KuaiLe', 'Noto Sans SC', sans-serif;
      font-size: 42px;
      font-weight: 900;
      color: #FF6B35;
      margin-bottom: 12px;
      text-shadow: 2px 2px 4px rgba(255, 107, 53, 0.1);
      line-height: 1.3;
    }
    
    .subtitle {
      font-size: 20px;
      color: #636E72;
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    .divider {
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #FF6B35, #2EC4B6);
      margin: 20px auto;
      border-radius: 2px;
    }
    
    /* 信息卡片 */
    .info-section {
      position: relative;
      z-index: 1;
      padding: 0 30px 20px;
    }
    
    .info-card {
      background: linear-gradient(135deg, #FFF5E6, #FFFAF0);
      border-radius: 20px;
      padding: 25px;
      margin-bottom: 25px;
      border: 2px solid rgba(255, 107, 53, 0.1);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    }
    
    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      font-size: 17px;
      color: #2D3436;
    }
    
    .info-item:last-child {
      margin-bottom: 0;
    }
    
    .info-icon {
      font-size: 24px;
      margin-right: 12px;
    }
    
    .info-label {
      font-weight: 500;
      color: #FF6B35;
      margin-right: 8px;
    }
    
    /* 亮点区域 */
    .highlights-section {
      position: relative;
      z-index: 1;
      padding: 0 30px 30px;
    }
    
    .highlights-title {
      font-size: 22px;
      font-weight: 700;
      color: #2D3436;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .highlight-item {
      background: white;
      border-left: 4px solid #2EC4B6;
      padding: 15px 20px;
      margin-bottom: 15px;
      border-radius: 12px;
      font-size: 16px;
      color: #2D3436;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease;
    }
    
    .highlight-item:hover {
      transform: translateX(5px);
    }
    
    .highlight-icon {
      margin-right: 10px;
      font-size: 20px;
    }
    
    /* 二维码区域 */
    .qr-section {
      position: relative;
      z-index: 1;
      padding: 30px;
      background: linear-gradient(135deg, #FF6B35, #F7C59F);
      text-align: center;
      border-radius: 0 0 30px 30px;
    }
    
    .qr-tip {
      color: white;
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    
    .qr-code {
      display: inline-block;
      background: white;
      padding: 15px;
      border-radius: 15px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
    
    .qr-code img {
      display: block;
      border-radius: 10px;
    }
    
    /* 动画 */
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    /* 装饰SVG */
    .decoration {
      position: absolute;
      z-index: 0;
      opacity: 0.1;
    }
  </style>
</head>
<body>
  <div class="poster">
    <!-- 装饰背景 -->
    <div class="decorative-bg"></div>
    <div class="decorative-circle circle-1"></div>
    <div class="decorative-circle circle-2"></div>
    <div class="decorative-circle circle-3"></div>
    
    <!-- 装饰SVG图案 -->
    <svg class="decoration" style="top: 50px; left: 20px;" width="60" height="60" viewBox="0 0 60 60">
      <polygon points="30,5 55,25 45,55 15,55 5,25" fill="#FF6B35"/>
    </svg>
    <svg class="decoration" style="bottom: 150px; right: 30px;" width="50" height="50" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" stroke="#2EC4B6" stroke-width="3"/>
    </svg>
    
    <!-- 标题区域 -->
    <div class="header">
      <div class="badge">🔥 限时训练营</div>
      <h1 class="title">${plan.campName}</h1>
      <p class="subtitle">${plan.theme}</p>
      <div class="divider"></div>
    </div>
    
    <!-- 信息卡片 -->
    <div class="info-section">
      <div class="info-card">
        <div class="info-item">
          <span class="info-icon">📅</span>
          <span class="info-label">时间：</span>
          <span>${plan.startDate} 起，共 ${plan.durationDays} 天</span>
        </div>
        <div class="info-item">
          <span class="info-icon">👥</span>
          <span class="info-label">受众：</span>
          <span>${plan.targetAudience}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">🎯</span>
          <span class="info-label">主题：</span>
          <span>${plan.theme}</span>
        </div>
      </div>
    </div>
    
    <!-- 亮点列表 -->
    <div class="highlights-section">
      <div class="highlights-title">✨ 课程亮点</div>
      ${plan.highlights.map((h, i) => `
        <div class="highlight-item">
          <span class="highlight-icon">${['🚀', '💡', '⭐', '🎯', '🔥'][i % 5]}</span>
          ${h}
        </div>
      `).join('')}
    </div>
    
    <!-- 二维码 -->
    <div class="qr-section">
      <p class="qr-tip">📱 扫码立即报名</p>
      <div class="qr-code">{{QR_CODE}}</div>
    </div>
  </div>
</body>
</html>
    `;
  }
}

export const posterTool = new PosterTool();
