import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { CopyButton } from "@/components/site/copy-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRelatedTemplates, getTemplateBySlug } from "@/lib/mock-data";

type TemplateDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const template = getTemplateBySlug(params.slug);

  if (!template) {
    notFound();
  }

  const relatedTemplates = getRelatedTemplates(template.slug, template.category);

  return (
    <section className="section-shell">
      <div className="container">
        <Link href="/templates" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
          <ArrowLeft className="h-4 w-4" />
          返回模板库
        </Link>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <Card>
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{template.category}</Badge>
                  <Badge className="border-amber-200 bg-amber-50 text-amber-700">使用 {template.useCount.toLocaleString()} 次</Badge>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle className="text-3xl sm:text-4xl">{template.title}</CardTitle>
                    <CardDescription className="mt-3 text-base">{template.description}</CardDescription>
                  </div>
                  <CopyButton text={template.prompt} label="复制 Prompt" />
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>适用场景</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl bg-amber-50 px-5 py-4 text-base leading-7 text-slate-700">{template.scenario}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>完整 Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-6 font-mono text-sm leading-7 text-slate-100">
                  {template.prompt}
                </pre>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>示例输入</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-2xl bg-white p-5 text-sm leading-7 text-slate-700 shadow-inner shadow-slate-100">
                    {template.exampleInput}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>示例输出</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-2xl bg-cyan-50 p-5 text-sm leading-7 text-slate-700">{template.exampleOutput}</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>相关推荐模板</CardTitle>
                <CardDescription>继续浏览同类高频模板。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedTemplates.length > 0 ? (
                  relatedTemplates.map((item) => (
                    <Link key={item.slug} href={`/templates/${item.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-cyan-200 hover:bg-cyan-50/50">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-950">{item.title}</div>
                          <div className="mt-2 text-sm leading-6 text-slate-600">{item.description}</div>
                        </div>
                        <ChevronRight className="mt-1 h-4 w-4 text-slate-400" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-sm text-slate-500">暂无更多同类模板。</div>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
}
