import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "section";
type DividerSpacing = "compact" | "default" | "wide";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  orientation?: "horizontal" | "vertical";
  label?: string;
  spacing?: DividerSpacing;
}

const spacingMap: Record<DividerSpacing, string> = {
  compact: "my-1",
  default: "my-3",
  wide: "my-6",
};

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, variant = "default", orientation = "horizontal", label, spacing = "default", ...props }, ref) => {
    const lineColor = variant === "section" ? "bg-separator-opaque" : "bg-separator";
    const spacingClass = orientation === "horizontal" ? spacingMap[spacing] : undefined;

    if (label) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-3", spacingClass, className)}
          role="separator"
          {...props}
        >
          <div className={cn("flex-1 h-px", lineColor)} />
          <span className="text-[length:var(--text-caption1)] text-label-tertiary font-medium select-none">
            {label}
          </span>
          <div className={cn("flex-1 h-px", lineColor)} />
        </div>
      );
    }

    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          className={cn("w-px self-stretch", lineColor, className)}
          role="separator"
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn("h-px w-full", lineColor, spacingClass, className)}
        role="separator"
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider, type DividerProps };
