import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/70">
      <div className="container flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md">
          <div className="text-lg font-semibold text-slate-950">PM AI 模板库</div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            面向产品经理的 AI 模板工具站 Demo，帮助你更快写 PRD、做原型描述、梳理流程图和输出竞品分析。
          </p>
        </div>
        <div className="flex gap-6 text-sm text-slate-600">
          <Link href="/templates">模板库</Link>
          <Link href="/generator">AI生成器</Link>
          <Link href="/pricing">价格</Link>
        </div>
      </div>
    </footer>
  );
}
