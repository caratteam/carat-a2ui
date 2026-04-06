"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Chip } from "./chip";

interface ChipBarItem {
  icon?: React.ReactNode;
  label: string;
  value: string;
}

interface ChipBarProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: ChipBarItem[];
  selected?: string;
  onChange?: (value: string) => void;
  onMore?: () => void;
}

const ChipBar = forwardRef<HTMLDivElement, ChipBarProps>(
  ({ className, items, selected, onChange, onMore, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto scrollbar-hide",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Chip
          key={item.value}
          size="sm"
          variant={selected === item.value ? "selected" : "default"}
          icon={item.icon}
          onClick={() => onChange?.(item.value)}
        >
          {item.label}
        </Chip>
      ))}
      {onMore && (
        <Chip size="sm" variant="outline" onClick={onMore}>
          + 더보기
        </Chip>
      )}
    </div>
  )
);
ChipBar.displayName = "ChipBar";

export { ChipBar, type ChipBarProps, type ChipBarItem };
