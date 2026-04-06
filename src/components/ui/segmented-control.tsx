"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md";

interface SegmentedControlItem {
  label: string;
  value: string;
  badge?: string;
}

interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: SegmentedControlItem[];
  value: string;
  onChange: (value: string) => void;
  size?: Size;
}

const sizeStyles: Record<Size, string> = {
  sm: "h-8 text-[length:var(--text-footnote)]",
  md: "h-9 text-[length:var(--text-subhead)]",
};

const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ className, items, value, onChange, size = "sm", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] bg-fill-tertiary p-[3px] gap-[2px]",
        sizeStyles[size],
        className
      )}
      role="tablist"
      {...props}
    >
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.value)}
            className={cn(
              "relative flex-1 inline-flex items-center justify-center gap-1.5 rounded-[calc(var(--radius-sm)-2px)] px-3 font-medium transition-all duration-[var(--transition-base)] select-none",
              "h-full min-w-0",
              isActive
                ? "bg-white dark:bg-bg-tertiary text-label shadow-[var(--shadow-sm)]"
                : "text-label-secondary hover:text-label"
            )}
          >
            {item.label}
            {item.badge && (
              <span className="inline-flex items-center justify-center h-[16px] min-w-[16px] px-1 rounded-full bg-error text-white text-[length:var(--text-caption2)] font-semibold leading-none">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  )
);
SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl, type SegmentedControlProps, type SegmentedControlItem };
