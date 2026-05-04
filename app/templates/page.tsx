import { TemplateLibrary } from "@/components/site/template-library";

export default function TemplatesPage() {
  return (
    <section className="section-shell">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <div className="section-kicker">模板库</div>
          <h1 className="section-title">按分类查找你的 PM AI 模板</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            覆盖 PRD、原型、流程图、竞品分析、汇报材料、AI Agent 和面试作品等场景。
          </p>
        </div>
        <TemplateLibrary />
      </div>
    </section>
  );
}
