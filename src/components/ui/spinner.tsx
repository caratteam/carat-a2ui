import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
}

const sizeStyles: Record<Size, string> = {
  sm: "h-4 w-4 border-[1.5px]",
  md: "h-5 w-5 border-2",
  lg: "h-8 w-8 border-2",
};

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-spin rounded-full border-current border-t-transparent text-primary",
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
);
Spinner.displayName = "Spinner";

export { Spinner, type SpinnerProps };
