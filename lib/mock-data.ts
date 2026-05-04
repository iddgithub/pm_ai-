export type TemplateCategory =
  | "全部"
  | "PRD"
  | "原型"
  | "流程图"
  | "竞品分析"
  | "汇报材料"
  | "AI Agent"
  | "面试作品";

export type GeneratorType = Exclude<TemplateCategory, "全部" | "汇报材料" | "AI Agent" | "面试作品">;

export type TemplateItem = {
  slug: string;
  title: string;
  description: string;
  category: Exclude<TemplateCategory, "全部">;
  scenario: string;
  useCount: number;
  prompt: string;
  exampleInput: string;
  exampleOutput: string;
  featured?: boolean;
};

export const categories: TemplateCategory[] = [
  "全部",
  "PRD",
  "原型",
  "流程图",
  "竞品分析",
  "汇报材料",
  "AI Agent",
  "面试作品"
];

export const templates: TemplateItem[] = [
  {
    slug: "prd-growth-membership",
    title: "增长型会员体系 PRD 模板",
    description: "用于设计会员权益、转化漏斗、激励机制和版本边界的完整 PRD 模板。",
    category: "PRD",
    scenario: "适合做会员、订阅、电商增长型产品方案。",
    useCount: 1682,
    prompt:
      "你是一位资深产品负责人。请根据以下业务背景，输出一份完整 PRD，包含：项目背景、目标指标、用户画像、核心流程、功能范围、非功能需求、风险与排期建议。语气专业，结构适合直接给设计和研发评审。",
    exampleInput:
      "我要做一个面向中小企业的会员中心，支持试用、月付、年付和企业版升级，需要提升试用转付费。",
    exampleOutput:
      "1. 项目背景：当前试用用户转付费率较低，企业客户对高级权限与团队协作有明确诉求。2. 目标指标：30 天内试用转付费率提升至 12%，年付占比达到 35%。3. 核心功能：套餐页、权益页、升级弹窗、试用到期提醒、企业席位管理。",
    featured: true
  },
  {
    slug: "prototype-enterprise-dashboard",
    title: "企业后台原型描述模板",
    description: "快速生成后台页面区块、信息层级、交互规则和状态说明。",
    category: "原型",
    scenario: "适合 SaaS 后台、管理台、运营工具页面描述。",
    useCount: 1241,
    prompt:
      "请输出一份可直接交给 AI 原型工具的页面描述。包括：页面目标、页面布局、区块说明、字段列表、交互状态、异常状态、按钮行为和页面文案风格。",
    exampleInput: "我要做一个医院信息管理页面，支持搜索、筛选、编辑和状态管理。",
    exampleOutput:
      "页面采用双栏结构：左侧为筛选面板，右侧为数据表格与详情抽屉。表格字段包括医院名称、等级、地区、联系人、合作状态。顶部提供关键字搜索、状态筛选和新增按钮。",
    featured: true
  },
  {
    slug: "flow-onboarding-conversion",
    title: "新用户转化流程图模板",
    description: "将注册、引导、触达、转化的路径拆成节点与判断条件。",
    category: "流程图",
    scenario: "适合梳理 onboarding、激活、转化链路。",
    useCount: 932,
    prompt:
      "请把以下业务过程转换为 Mermaid 流程图，要求包含开始、关键节点、判断分支、异常处理和结束节点。并补充每个节点的意图说明。",
    exampleInput: "新用户注册后 3 天内未完成核心操作，需要触发消息提醒和销售跟进。",
    exampleOutput:
      "flowchart TD A[用户注册] --> B{24 小时内是否完成核心操作} B -- 是 --> C[进入激活用户池] B -- 否 --> D[发送首次提醒] D --> E{72 小时内是否完成操作} E -- 否 --> F[进入销售跟进流程]",
    featured: true
  },
  {
    slug: "competitor-ai-writing",
    title: "AI 写作工具竞品分析模板",
    description: "从目标用户、功能亮点、商业模式、差异点四个维度快速输出竞品分析。",
    category: "竞品分析",
    scenario: "适合做 AI 工具、效率产品、内容平台竞品对比。",
    useCount: 1508,
    prompt:
      "请围绕目标用户、核心功能、产品体验、变现模式、增长动作和机会点，输出一份结构化竞品分析，并给出结论建议。",
    exampleInput: "分析 Notion AI、腾讯文档 AI、飞书智能伙伴在 PRD 辅助上的差异。",
    exampleOutput:
      "Notion AI 强在文档协作场景闭环，腾讯文档 AI 强在国内办公场景普及度，飞书智能伙伴强在组织内角色连接。若切入 PM 模板库，应强调行业模板和一键输出能力。",
    featured: true
  },
  {
    slug: "report-weekly-product",
    title: "产品周报汇报材料模板",
    description: "帮你快速整理本周目标、进展、风险、下周计划和核心数据。",
    category: "汇报材料",
    scenario: "适合向老板、业务方或项目组做周报同步。",
    useCount: 785,
    prompt:
      "根据以下项目进度，生成一份适合周会汇报的结构化材料，包含本周目标、完成情况、数据变化、风险事项和下周计划。",
    exampleInput: "本周上线了会员续费提醒，转化率提升 4%，但支付引导页还在优化。",
    exampleOutput:
      "本周已完成会员续费提醒上线，触达链路稳定，续费转化率提升 4%。当前风险在于支付引导页步骤偏长，导致部分用户流失，下周重点优化流程与文案。",
    featured: false
  },
  {
    slug: "agent-pm-researcher",
    title: "产品研究 AI Agent 模板",
    description: "定义一个能持续拆需求、补背景、输出初稿的 PM Agent Prompt。",
    category: "AI Agent",
    scenario: "适合团队内部沉淀固定研究和文档助理。",
    useCount: 468,
    prompt:
      "你是一名产品研究助理。接到需求后需要先澄清目标，再拆解业务问题，补齐上下文，最后输出带结论的结构化文档。回答要可追溯、可复用。",
    exampleInput: "请协助我分析智能客服产品的重点机会方向。",
    exampleOutput:
      "会先澄清目标行业、客户规模和现有渠道，再从成本替代、质量提升和部署复杂度三个维度建立分析框架。",
    featured: false
  },
  {
    slug: "interview-case-b2b",
    title: "B2B 面试作品包装模板",
    description: "把你的项目经历包装成结构完整、适合面试展示的作品集案例。",
    category: "面试作品",
    scenario: "适合求职产品经理、作品集补强和项目复盘。",
    useCount: 651,
    prompt:
      "请把以下项目经历整理成适合面试展示的作品集案例，包含业务背景、问题定义、方案设计、推进方式、结果数据和个人贡献。",
    exampleInput: "我做过一个企业线索管理后台，提升了销售跟进效率。",
    exampleOutput:
      "项目重点在于线索分配不均和跟进不透明，我负责从流程诊断到后台能力设计，最终让有效跟进率提升 18%。",
    featured: false
  },
  {
    slug: "prd-ai-report-upload",
    title: "AI 报告上传功能 PRD 模板",
    description: "适合设计上传、解析、结果展示、权限和失败处理等完整方案。",
    category: "PRD",
    scenario: "适合文档处理、报告分析、知识库类产品。",
    useCount: 1034,
    prompt:
      "请根据以下需求，输出 AI 报告上传功能的 PRD，覆盖上传入口、文件格式限制、解析流程、异常场景、权限控制和结果展示。",
    exampleInput: "用户上传 PDF 报告后，系统要自动提取摘要和重点问题。",
    exampleOutput:
      "上传入口建议放在工作台主操作区，支持 PDF/Word，单文件大小限制 20MB。上传后分为解析中、成功、失败三种状态，并允许用户重试。",
    featured: false
  }
];

export const heroStats = [
  { label: "热门模板", value: "120+" },
  { label: "累计生成", value: "28,000+" },
  { label: "常见场景", value: "32 个" }
];

export const capabilityCards = [
  {
    title: "PRD 生成",
    description: "快速形成完整需求文档框架，减少从空白页开始的压力。"
  },
  {
    title: "原型描述生成",
    description: "把页面想法变成可交付的结构化描述，方便设计和 AI 出图。"
  },
  {
    title: "业务流程图生成",
    description: "把复杂链路拆成清晰节点和判断，适合评审和对齐。"
  },
  {
    title: "竞品分析生成",
    description: "从用户、功能、商业模式和机会点维度快速形成分析。"
  }
];

export const scenarios = [
  {
    title: "写需求方案",
    description: "把模糊业务想法快速整理成 PRD 初稿和评审要点。"
  },
  {
    title: "做页面原型",
    description: "将页面结构、模块内容和交互状态一次性描述清楚。"
  },
  {
    title: "做竞品调研",
    description: "统一分析口径，沉淀可复用的竞品分析模板。"
  },
  {
    title: "做汇报材料",
    description: "把碎片化进展整理成结构清楚、适合老板汇报的内容。"
  }
];

export const pricingPlans = [
  {
    name: "免费版",
    price: "0 元",
    description: "适合初次体验和个人试用。",
    quota: "每天 3 次生成",
    features: ["基础模板浏览", "热门模板复制", "AI 生成体验版"],
    featured: false
  },
  {
    name: "入门版",
    price: "9.9 元/月",
    description: "适合正在积累模板资产的新人产品经理。",
    quota: "50 次生成",
    features: ["基础模板全量可用", "PRD 与原型模板", "个人工作流推荐"],
    featured: false
  },
  {
    name: "专业版",
    price: "29 元/月",
    description: "适合高频输出方案的在职产品经理。",
    quota: "200 次生成",
    features: ["行业模板", "竞品分析模板", "汇报材料模板", "收藏与历史记录（Demo 占位）"],
    featured: true
  },
  {
    name: "高级版",
    price: "99 元/月",
    description: "适合做团队模板库和高标准展示。",
    quota: "1000 次生成",
    features: ["完整 PRD + 原型提示词", "高级行业模板", "AI Agent 模板", "优先更新模板包"],
    featured: false
  }
];

export function getTemplateBySlug(slug: string) {
  return templates.find((template) => template.slug === slug);
}

export function getRelatedTemplates(currentSlug: string, category: TemplateItem["category"]) {
  return templates.filter((template) => template.slug !== currentSlug && template.category === category).slice(0, 3);
}
