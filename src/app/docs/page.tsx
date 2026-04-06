"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import { MarkdownRenderer } from "@/components/ui";

const TABS = ["스펙", "변경 로그"] as const;

const FILES: Record<string, string> = {
  "스펙": "/docs/COMPONENT_SPEC.md",
  "변경 로그": "/docs/CHANGELOG.md",
};

export default function DocsPage() {
  const [tab, setTab] = useState<string>("스펙");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(FILES[tab])
      .then((r) => r.text())
      .then((t) => { setContent(t); setLoading(false); })
      .catch(() => { setContent("문서를 불러올 수 없습니다."); setLoading(false); });
  }, [tab]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[960px] mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-[length:var(--text-large-title)] font-bold text-label">
            컴포넌트 문서
          </h1>
          <p className="text-[length:var(--text-body)] text-label-secondary mt-2">
            <code className="text-[length:var(--text-footnote)] bg-fill-tertiary px-1.5 py-0.5 rounded-[var(--radius-xs)]">npm run docs</code>
            {" "}실행 시 최신 소스 기준으로 자동 재생성됩니다.
          </p>
        </div>

        {/* Tab */}
        <div className="sticky top-0 bg-background py-3 z-10 border-b border-separator mb-6">
          <div className="inline-flex bg-fill-tertiary rounded-[var(--radius-md)] p-1 gap-0.5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "h-9 px-5 rounded-[var(--radius-sm)] text-[length:var(--text-subhead)] font-semibold transition-all",
                  tab === t
                    ? "bg-white dark:bg-bg-tertiary text-label shadow-[var(--shadow-sm)]"
                    : "text-label-secondary hover:text-label"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-label-secondary text-[length:var(--text-body)]">불러오는 중...</p>
        ) : (
          <div className="prose-custom">
            <MarkdownRenderer content={content} />
          </div>
        )}
      </div>
    </div>
  );
}
