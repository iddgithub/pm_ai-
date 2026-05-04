import { GeneratorWorkbench } from "@/components/site/generator-workbench";

export default function GeneratorPage() {
  return (
    <section className="section-shell">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <div className="section-kicker">AI生成器</div>
          <h1 className="section-title">输入需求，生成结构化结果</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            第一版只做 mock 演示，不接真实 AI API，但会把交互流程和展示结果先完整做出来。
          </p>
        </div>
        <GeneratorWorkbench />
      </div>
    </section>
  );
}
