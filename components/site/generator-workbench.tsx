"use client";

import { useMemo, useState, useTransition } from "react";
import { Sparkles } from "lucide-react";

import { CopyButton } from "@/components/site/copy-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { GeneratorType } from "@/lib/mock-data";

const generatorOptions: GeneratorType[] = ["PRD", "原型", "流程图", "竞品分析"];

function buildMockResult(type: GeneratorType, input: string) {
  const brief = input.trim() || "智能排班系统，支持多角色协同和数据看板。";

  if (type === "PRD") {
    return `# ${type} 生成结果

## 项目背景
- 需求概述：${brief}
- 目标：让产品、设计、研发快速对齐范围与优先级。

## 核心模块
1. 用户入口与触发场景
2. 主任务流程与关键页面
3. 数据指标与反馈机制

## 关键指标
- 首周激活率
- 任务完成率
- 留存与转化率

## 风险提示
- 业务规则需要先收敛
- 页面状态和异常流转需补齐`;
  }

  if (type === "原型") {
    return `# ${type} 生成结果

## 页面结构
- 顶部：页面标题、主操作按钮、最近更新时间
- 左侧：筛选器与快捷入口
- 中部：核心数据表格 / 卡片列表
- 右侧：详情抽屉与操作记录

## 模块说明
- 搜索区：支持关键词、状态、负责人筛选
- 列表区：展示重点字段、状态标签、批量操作
- 详情区：展示完整信息、备注和编辑入口

## 交互状态
- 空状态：引导创建第一条记录
- 加载状态：Skeleton 占位
- 异常状态：支持重试与错误提示`;
  }

  if (type === "流程图") {
    return `# ${type} 生成结果

\`\`\`mermaid
flowchart TD
  A[需求提出] --> B[信息收集]
  B --> C{是否信息完整}
  C -- 否 --> D[补充需求背景]
  D --> B
  C -- 是 --> E[生成初稿]
  E --> F[产品评审]
  F --> G{是否通过}
  G -- 否 --> H[修改方案]
  H --> E
  G -- 是 --> I[输出最终文档]
\`\`\`

## 节点说明
- 信息收集：明确目标用户、业务目标、上线边界
- 评审节点：用于识别范围风险与依赖关系`;
  }

  return `# ${type} 生成结果

## 对比对象
- 竞品 A：协同能力强
- 竞品 B：模板丰富
- 竞品 C：生成速度快

## 分析维度
1. 目标用户与核心场景
2. 功能亮点与不足
3. 商业模式与价格策略
4. 产品机会点

## 结论建议
- 针对 ${brief}，建议优先强调行业模板深度和展示完成度。
- 用高质量模板详情页和结构化生成结果建立可信度。`;
}

export function GeneratorWorkbench() {
  const [input, setInput] = useState("");
  const [type, setType] = useState<GeneratorType>("PRD");
  const [result, setResult] = useState(() => buildMockResult("PRD", ""));
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const placeholder = useMemo(() => {
    switch (type) {
      case "PRD":
        return "例如：我要做一个面向中小企业的 AI 周报助手，支持自动汇总项目进展、风险和下周计划。";
      case "原型":
        return "例如：我要设计一个医院信息管理后台，支持搜索、筛选、编辑、启停状态和详情查看。";
      case "流程图":
        return "例如：新用户注册后，系统需要判断是否完成首个任务，未完成则触发提醒和人工跟进。";
      case "竞品分析":
        return "例如：分析 3 个 AI 文档工具在 PRD 生成、模板深度、付费模型上的差异。";
    }
  }, [type]);

  function handleGenerate() {
    setIsGenerating(true);
    window.setTimeout(() => {
      startTransition(() => {
        setResult(buildMockResult(type, input));
        setIsGenerating(false);
      });
    }, 600);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 text-white">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles className="h-5 w-5" />
          </div>
          <CardTitle className="text-white">AI 生成器</CardTitle>
          <CardDescription className="text-slate-200">
            输入产品需求，选择生成类型，右侧会返回结构化 mock 结果。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">生成类型</label>
            <Select value={type} onChange={(event) => setType(event.target.value as GeneratorType)}>
              {generatorOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">产品需求</label>
            <Textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={placeholder} />
          </div>

          <Button className="w-full" size="lg" onClick={handleGenerate} disabled={isGenerating || isPending}>
            {isGenerating || isPending ? "生成中..." : "点击生成"}
          </Button>
        </CardContent>
      </Card>

      <Card className="min-h-[560px]">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>结构化结果</CardTitle>
            <CardDescription>当前为 mock 方式演示，不调用真实 AI API。</CardDescription>
          </div>
          <CopyButton text={result} />
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-6 font-mono text-sm leading-7 text-slate-100">
            {result}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
