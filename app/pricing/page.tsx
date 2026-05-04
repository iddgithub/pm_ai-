import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingPlans } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  return (
    <section className="section-shell">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="section-kicker">价格页</div>
          <h1 className="section-title">为不同阶段的产品经理准备的方案</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            当前为展示版价格页，不接真实支付。重点是把套餐结构、价值感和升级路径做得清楚。
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "relative h-full",
                plan.featured ? "border-cyan-300 bg-slate-950 text-white shadow-glow" : "bg-white/85"
              )}
            >
              {plan.featured ? (
                <div className="absolute right-5 top-5 rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-slate-950">
                  推荐
                </div>
              ) : null}

              <CardHeader>
                <CardTitle className={cn("text-2xl", plan.featured && "text-white")}>{plan.name}</CardTitle>
                <div className={cn("mt-4 text-4xl font-semibold", plan.featured && "text-white")}>{plan.price}</div>
                <CardDescription className={cn(plan.featured && "text-slate-300")}>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex h-full flex-col">
                <div
                  className={cn(
                    "mb-6 rounded-2xl px-4 py-3 text-sm font-semibold",
                    plan.featured ? "bg-white/10 text-cyan-200" : "bg-amber-50 text-amber-700"
                  )}
                >
                  {plan.quota}
                </div>

                <div className="space-y-3 text-sm leading-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          plan.featured ? "bg-cyan-400 text-slate-950" : "bg-slate-950 text-white"
                        )}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      <span className={cn(plan.featured ? "text-slate-100" : "text-slate-700")}>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-8">
                  <Button
                    className="w-full"
                    variant={plan.featured ? "default" : "outline"}
                  >
                    立即体验
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
