import Link from "next/link";
import { ArrowRight, Copy, FileText, LayoutTemplate, Sparkles, Workflow } from "lucide-react";

import { TemplateCard } from "@/components/site/template-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { capabilityCards, heroStats, scenarios, templates } from "@/lib/mock-data";

const capabilityIcons = [FileText, LayoutTemplate, Workflow, Sparkles];

export default function HomePage() {
  const popularTemplates = templates.filter((item) => item.featured).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:48px_48px] opacity-50" />
        <div className="container section-shell pb-12 pt-12 sm:pb-16 sm:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl">
              <Badge className="mb-5 border-cyan-200 bg-cyan-50 text-cyan-700">
                专为产品经理打造的 AI 模板工作台
              </Badge>
              <h1 className="max-w-4xl text-5xl font-semibold leading-tight sm:text-6xl">
                产品经理的 <span className="text-cyan-600">AI 工作台</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                用 AI 快速生成 PRD、原型描述、流程图和竞品分析，让产品经理从重复文档中解放出来。
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/generator">
                  <Button size="lg">
                    开始使用
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button size="lg" variant="outline">
                    查看模板库
                  </Button>
                </Link>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                {heroStats.map((item) => (
                  <div key={item.label} className="surface-card px-5 py-4">
                    <div className="text-2xl font-semibold text-slate-950">{item.value}</div>
                    <div className="mt-1 text-sm text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="surface-card animate-float overflow-hidden p-5">
                <div className="rounded-[28px] bg-slate-950 p-5 text-white shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-cyan-200">AI Workspace</div>
                      <div className="mt-2 text-2xl font-semibold">模板生成面板</div>
                    </div>
                    <div className="rounded-full bg-white/10 px-3 py-1 text-xs">Mock Demo</div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-2xl bg-white/8 p-4">
                      <div className="text-sm text-slate-300">当前任务</div>
                      <div className="mt-2 text-lg font-medium">生成「会员增长方案」PRD</div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-cyan-500/15 p-4">
                        <div className="text-sm text-cyan-200">输出模块</div>
                        <div className="mt-3 space-y-2 text-sm text-white">
                          <div>项目背景</div>
                          <div>目标指标</div>
                          <div>核心流程</div>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-amber-500/15 p-4">
                        <div className="text-sm text-amber-200">生成状态</div>
                        <div className="mt-3 flex items-center gap-2 text-sm text-white">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          Mock 结果已生成
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white p-4 text-slate-900">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="text-sm font-semibold">结构化结果预览</div>
                        <Copy className="h-4 w-4 text-slate-400" />
                      </div>
                      <div className="rounded-xl bg-slate-100 p-4 font-mono text-sm leading-6 text-slate-700">
                        1. 项目背景：试用用户转付费偏低...
                        <br />
                        2. 核心模块：套餐页、权益页、升级弹窗...
                        <br />
                        3. 风险点：支付链路和权益说明待验证...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 -z-10 h-32 w-32 rounded-full bg-cyan-200/60 blur-3xl" />
              <div className="absolute -right-4 top-6 -z-10 h-40 w-40 rounded-full bg-amber-200/60 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container">
          <div className="mb-10">
            <div className="section-kicker">核心能力</div>
            <h2 className="section-title">从需求草稿到展示材料，一站式完成</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              第一版聚焦产品经理最常见的四类文档工作，先把展示效果和体验打磨到位。
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {capabilityCards.map((card, index) => {
              const Icon = capabilityIcons[index];
              return (
                <Card key={card.title} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white/55">
        <div className="container">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="section-kicker">热门模板</div>
              <h2 className="section-title">打开就能复制使用的高频模板</h2>
            </div>
            <Link href="/templates" className="hidden text-sm font-semibold text-cyan-700 md:block">
              查看全部模板
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {popularTemplates.map((template) => (
              <TemplateCard key={template.slug} template={template} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container">
          <div className="mb-10">
            <div className="section-kicker">用户场景</div>
            <h2 className="section-title">适合新手产品经理日常拿来就用</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {scenarios.map((scenario, index) => (
              <Card key={scenario.title} className="overflow-hidden">
                <CardContent className="flex items-start gap-5 pt-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{scenario.title}</h3>
                    <p className="mt-2 text-base leading-7 text-slate-600">{scenario.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <div className="overflow-hidden rounded-[32px] bg-slate-950 px-8 py-10 text-white shadow-glow sm:px-12 sm:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="section-kicker border-white/10 bg-white/10 text-white">底部 CTA</div>
                <h2 className="text-3xl font-semibold sm:text-4xl">把你的 PM 展示站先跑起来</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                  先用模板库建立可信度，再用 AI 生成器展示真实输出过程。这一版专门为 Demo 展示而设计。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/generator">
                  <Button size="lg" variant="default">
                    立即体验
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    查看价格
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
