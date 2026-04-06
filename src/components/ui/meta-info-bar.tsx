import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface MetaItem {
  label: string;
  value: string | number;
}

interface MetaInfoBarProps extends HTMLAttributes<HTMLDivElement> {
  items: MetaItem[];
}

const MetaInfoBar = forwardRef<HTMLDivElement, MetaInfoBarProps>(
  ({ className, items, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-0 text-[length:var(--text-caption1)] text-label-tertiary",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-0">
          {i > 0 && <span className="mx-1.5">·</span>}
          <span>
            {item.label && <span className="mr-0.5">{item.label}</span>}
            <span className="font-medium text-label-secondary">{item.value}</span>
          </span>
        </span>
      ))}
    </div>
  )
);
MetaInfoBar.displayName = "MetaInfoBar";

export { MetaInfoBar, type MetaInfoBarProps, type MetaItem };
