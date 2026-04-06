import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Status = "running" | "complete" | "stopped" | "error";
type Size = "sm" | "md";

interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  status: Status;
  size?: Size;
  label?: string;
}

const dotColor: Record<Status, string> = {
  running: "bg-agent",
  complete: "bg-success",
  stopped: "bg-label-tertiary",
  error: "bg-error",
};

const labelColor: Record<Status, string> = {
  running: "text-agent",
  complete: "text-success",
  stopped: "text-label-tertiary",
  error: "text-error",
};

const dotSize: Record<Size, string> = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
};

const StatusIndicator = forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ className, status, size = "md", label, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    >
      <span
        className={cn(
          "rounded-full flex-shrink-0",
          dotColor[status],
          dotSize[size],
          status === "running" && "animate-[pulse-dot_1.5s_ease-in-out_infinite]"
        )}
      />
      {label && (
        <span
          className={cn(
            "text-[length:var(--text-caption1)] font-medium",
            labelColor[status]
          )}
        >
          {label}
        </span>
      )}
    </span>
  )
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator, type StatusIndicatorProps };
