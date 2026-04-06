"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Dropdown, type DropdownItem } from "./dropdown";

interface ModelSelectorProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: DropdownItem[];
  value: string;
  onChange: (value: string) => void;
}

const ModelSelector = forwardRef<HTMLDivElement, ModelSelectorProps>(
  ({ className, items, value, onChange, ...props }, ref) => {
    const selected = items.find((i) => i.value === value);

    return (
      <Dropdown
        ref={ref}
        align="right"
        items={items}
        value={value}
        onChange={onChange}
        trigger={
          <button
            className={cn(
              "inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-fill-tertiary text-[length:var(--text-footnote)] font-medium text-label hover:bg-fill-secondary transition-colors duration-[var(--transition-fast)] select-none",
              className
            )}
          >
            {selected?.icon && <span className="flex-shrink-0">{selected.icon}</span>}
            <span className="truncate max-w-[140px]">{selected?.label ?? "모델 선택"}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" className="flex-shrink-0 text-label-tertiary">
              <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        }
        {...props}
      />
    );
  }
);
ModelSelector.displayName = "ModelSelector";

export { ModelSelector, type ModelSelectorProps };
