"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "underline" | "pill";

interface TabBarItem {
  label: string;
  value: string;
}

interface TabBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: TabBarItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: Variant;
}

const TabBar = forwardRef<HTMLDivElement, TabBarProps>(
  ({ className, items, value, onChange, variant = "underline", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex",
        variant === "underline" && "border-b border-separator gap-0",
        variant === "pill" && "gap-1",
        className
      )}
      role="tablist"
      {...props}
    >
      {items.map((item) => {
        const isActive = item.value === value;

        if (variant === "pill") {
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(item.value)}
              className={cn(
                "h-8 px-3 rounded-full text-[length:var(--text-footnote)] font-medium transition-all duration-[var(--transition-fast)] select-none",
                isActive
                  ? "bg-primary text-white"
                  : "text-label-secondary hover:bg-fill-tertiary hover:text-label"
              )}
            >
              {item.label}
            </button>
          );
        }

        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.value)}
            className={cn(
              "relative px-4 py-2.5 text-[length:var(--text-subhead)] font-medium transition-colors duration-[var(--transition-fast)] select-none",
              isActive ? "text-label" : "text-label-tertiary hover:text-label-secondary"
            )}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  )
);
TabBar.displayName = "TabBar";

export { TabBar, type TabBarProps, type TabBarItem };
