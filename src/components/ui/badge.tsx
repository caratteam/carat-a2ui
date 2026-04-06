import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "success" | "warning" | "error" | "info" | "agent";
type Size = "sm" | "md";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-fill text-label-secondary",
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  error: "bg-error-light text-error",
  info: "bg-info-light text-info",
  agent: "bg-agent-light text-agent",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-[18px] min-w-[18px] px-1.5 text-[length:var(--text-caption2)]",
  md: "h-[22px] min-w-[22px] px-2 text-[length:var(--text-caption1)]",
};

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "sm", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, type BadgeProps };
