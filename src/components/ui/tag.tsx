import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "agent" | "skill";
type Size = "sm" | "md";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: Size;
  removable?: boolean;
  onRemove?: () => void;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-fill-tertiary text-label-secondary",
  agent: "bg-agent-light text-agent",
  skill: "bg-primary-light text-primary",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-6 px-2 text-[length:var(--text-caption1)] gap-1",
  md: "h-7 px-2.5 text-[length:var(--text-footnote)] gap-1.5",
};

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant = "default", size = "md", removable = false, onRemove, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-[var(--radius-sm)] font-medium whitespace-nowrap select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="flex-shrink-0 ml-0.5 rounded-full p-0.5 hover:bg-black/10 transition-colors duration-[var(--transition-fast)]"
          aria-label="Remove"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="block">
            <path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  )
);
Tag.displayName = "Tag";

export { Tag, type TagProps };
