"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { TemplateCard } from "@/components/site/template-card";
import { Input } from "@/components/ui/input";
import { categories, templates, type TemplateCategory } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function TemplateLibrary() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("全部");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filteredTemplates = useMemo(() => {
    const keyword = deferredSearch.trim().toLowerCase();

    return templates.filter((template) => {
      const categoryMatch = activeCategory === "全部" || template.category === activeCategory;
      const textMatch =
        keyword.length === 0 ||
        [template.title, template.description, template.scenario, template.category]
          .join(" ")
          .toLowerCase()
          .includes(keyword);

      return categoryMatch && textMatch;
    });
  }, [activeCategory, deferredSearch]);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="surface-card h-fit p-4">
        <div className="mb-4 text-sm font-semibold text-slate-500">模板分类</div>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition",
                activeCategory === category
                  ? "bg-slate-950 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              <span>{category}</span>
              <span className="text-xs opacity-80">
                {category === "全部" ? templates.length : templates.filter((item) => item.category === category).length}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="space-y-6">
        <div className="surface-card p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜索模板标题、描述、场景"
              className="pl-11"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>

        {filteredTemplates.length === 0 ? (
          <div className="surface-card px-6 py-16 text-center text-slate-600">
            没有找到匹配模板，试试更换分类或搜索关键词。
          </div>
        ) : null}
      </div>
    </div>
  );
}
