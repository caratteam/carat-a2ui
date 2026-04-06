import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderSize = "sm" | "md" | "lg";

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  action?: ReactNode;
  size?: SectionHeaderSize;
}

const sectionHeaderSizes: Record<SectionHeaderSize, { container: string; text: string }> = {
  sm: {
    container: "px-[var(--space-3)] py-[var(--space-1)]",
    text: "text-[length:var(--text-footnote)] font-medium",
  },
  md: {
    container: "px-[var(--space-4)] py-[var(--space-2)]",
    text: "text-[length:var(--text-subhead)] font-medium",
  },
  lg: {
    container: "px-[var(--space-4)] py-[var(--space-3)]",
    text: "text-[length:var(--text-title3)] font-bold",
  },
};

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, action, size = "md", ...props }, ref) => {
    const sizeStyles = sectionHeaderSizes[size];
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between",
          sizeStyles.container,
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "text-label-secondary uppercase tracking-wide",
            sizeStyles.text
          )}
        >
          {title}
        </span>
        {action && <span className="flex-shrink-0">{action}</span>}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader, type SectionHeaderProps };
