import Link from "next/link";
import { ArrowRight, BarChart3, Copy, Layers3, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TemplateItem } from "@/lib/mock-data";

const iconMap = {
  PRD: Layers3,
  原型: Sparkles,
  流程图: ArrowRight,
  竞品分析: BarChart3,
  汇报材料: Layers3,
  "AI Agent": Sparkles,
  面试作品: BarChart3
};

type TemplateCardProps = {
  template: TemplateItem;
};

export function TemplateCard({ template }: TemplateCardProps) {
  const Icon = iconMap[template.category];

  return (
    <Card className="h-full transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <CardHeader>
        <div className="mb-4 flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <Icon className="h-5 w-5" />
          </span>
          <Badge>{template.category}</Badge>
        </div>
        <CardTitle className="text-xl">{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-4">
        <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-6 text-slate-700">
          <span className="font-semibold text-slate-950">适用场景：</span>
          {template.scenario}
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>使用次数 {template.useCount.toLocaleString()}</span>
          <span className="inline-flex items-center gap-1">
            <Copy className="h-4 w-4" />
            可复制
          </span>
        </div>
        <div className="mt-auto flex items-center gap-3 pt-2">
          <Link href={`/templates/${template.slug}`} className="flex-1">
            <Button className="w-full">查看详情</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
