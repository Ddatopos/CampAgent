# 一键开营管家 (CampAgent)

> 运营提效引擎 —— 让开营物料准备从 2 天压缩到 2 小时

## 项目简介

CampAgent 是一个自动化开营工作流平台，帮助运营人员通过一句话需求自动生成：
- HTML 招募海报
- 标准报名表单结构
- 每日群发打卡文案模板

## 技术栈

### 前端
- React 18 + TypeScript
- Ant Design 5 (UI 组件库)
- Zustand (状态管理)
- Framer Motion (动画库)
- Lucide React (图标库)
- React Router DOM (路由)

### 后端
- Node.js + Express + TypeScript
- OpenAI 兼容 API (LLM 对接)
- Zod (数据验证)
- QRCode (二维码生成)

## 项目结构

```
CampAgent/
├── apps/
│   ├── web/                  # React 前端
│   │   ├── src/
│   │   │   ├── pages/        # 页面组件
│   │   │   ├── components/   # 通用组件
│   │   │   ├── stores/       # Zustand stores
│   │   │   └── api/          # API 封装
│   └── server/               # Express 后端
│       ├── src/
│       │   ├── routes/       # API 路由
│       │   ├── agents/       # Agent 编排
│       │   ├── tools/        # LLM Tools
│       │   ├── llm/          # LLM 客户端
│       │   └── store/        # 内存存储
│       └── prompts/          # Prompt 模板
└── shared/
    └── types/                # 共享类型定义
```

## 快速开始

### 1. 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装前端依赖
cd apps/web && npm install

# 安装后端依赖
cd ../server && npm install
```

### 2. 启动开发服务器

```bash
# 方式一：使用启动脚本（推荐）
# 双击 start.bat 文件

# 方式二：手动启动
# 终端1 - 启动后端
cd apps/server
npm run dev

# 终端2 - 启动前端
cd apps/web
npm run start
```

### 3. 配置 LLM

1. 访问 http://localhost:3000
2. 点击导航栏右侧的"设置"按钮
3. 填写配置信息：
   - Base URL: OpenAI 兼容 API 地址
   - API Key: 你的 API Key
   - Model: 模型名称（如 gpt-4）
4. 点击"测试连接"确认配置成功

### 4. 开始使用

1. 点击导航栏的"开营"按钮返回首页
2. 输入一句话需求
3. 点击"一键开营"即可生成物料

## 核心功能

### 1. Planner Agent
分析用户需求，提取关键信息：
- 训练营名称
- 目标受众
- 开始日期
- 持续天数
- 训练主题
- 亮点特色

### 2. Poster Tool
生成 HTML 海报：
- 移动端友好
- 暖色调设计
- 内嵌二维码
- 可预览、编辑、下载

### 3. Form Tool
生成报名表单：
- 智能字段推荐
- 动态表单渲染
- CRUD 编辑

### 4. Content Tool
生成每日文案：
- 群发消息
- 打卡引导
- 按天编辑

## UI 设计特色

- **配色方案**：暖色系 + 活力橙，摒弃传统蓝紫色调
- **不规则形状**：不对称圆角、微倾斜卡片
- **灵动动效**：流动渐变、悬浮旋转、涟漪效果
- **玻璃态效果**：模糊背景、半透明卡片

## API 接口

| Method | Path | 说明 |
|--------|------|------|
| POST | `/api/config` | 配置 LLM 并测试连接 |
| POST | `/api/camps/generate` | 生成开营物料 |
| GET | `/api/camps` | 获取活动列表 |
| GET | `/api/camps/:id` | 获取活动详情 |
| PUT | `/api/camps/:id` | 更新活动 |
| DELETE | `/api/camps/:id` | 删除活动 |

## 注意事项

1. **数据存储**：MVP 阶段使用内存存储，关闭浏览器后数据丢失
2. **API Key 安全**：API Key 仅存储在后端 session，不会暴露给前端
3. **LLM 兼容性**：支持所有 OpenAI 兼容的 API（如 Azure、本地部署等）

## 后续规划

- [ ] 数据持久化（SQLite/PostgreSQL）
- [ ] 用户登录系统
- [ ] Operation Agent（报名监控、签到统计）
- [ ] Review Agent（自动复盘报告）
- [ ] 海报模板库
- [ ] 企微/微信群集成

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
