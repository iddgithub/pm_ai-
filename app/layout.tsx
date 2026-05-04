import type { Metadata } from "next";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "PM AI 模板库",
  description: "帮助产品经理快速生成 PRD、原型描述、流程图和竞品分析的 AI 模板工具站 Demo。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
