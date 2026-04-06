"use client";

import { type HTMLAttributes, type ReactNode, forwardRef, useState } from "react";
import { cn } from "@/lib/cn";
import { TabBar } from "./tab-bar";

interface CompositeTab {
  label: string;
  value: string;
  content: ReactNode;
}

interface CompositeResultProps extends HTMLAttributes<HTMLDivElement> {
  tabs: CompositeTab[];
  defaultTab?: string;
}

const CompositeResult = forwardRef<HTMLDivElement, CompositeResultProps>(
  ({ className, tabs, defaultTab, ...props }, ref) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value || "");
    const activeContent = tabs.find((t) => t.value === activeTab)?.content;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)] border border-separator-opaque overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="bg-bg-secondary px-1">
          <TabBar
            items={tabs.map((t) => ({ label: t.label, value: t.value }))}
            value={activeTab}
            onChange={setActiveTab}
            variant="underline"
          />
        </div>
        <div className="p-4">
          {activeContent}
        </div>
      </div>
    );
  }
);
CompositeResult.displayName = "CompositeResult";

export { CompositeResult, type CompositeResultProps, type CompositeTab };
