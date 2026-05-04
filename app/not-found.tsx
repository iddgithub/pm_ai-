import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-shell">
      <div className="container">
        <div className="surface-card mx-auto max-w-xl px-8 py-16 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">404</div>
          <h1 className="mt-4 text-4xl font-semibold">页面不存在</h1>
          <p className="mt-4 text-slate-600">你访问的模板可能已经下线，或者链接填写有误。</p>
          <Link href="/" className="mt-8 inline-block">
            <Button>返回首页</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
