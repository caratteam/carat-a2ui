import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type StepState = "completed" | "active" | "pending" | "error";

interface Step {
  label: string;
  state: StepState;
}

interface StepIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  steps: Step[];
}

const dotStyles: Record<StepState, string> = {
  completed: "bg-success",
  active: "bg-agent animate-[pulse-dot_1.5s_ease-in-out_infinite]",
  pending: "bg-label-quaternary",
  error: "bg-error",
};

const iconMap: Record<StepState, React.ReactNode> = {
  completed: (
    <svg width="12" height="12" viewBox="0 0 12 12" className="text-white">
      <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  active: null,
  pending: null,
  error: (
    <svg width="12" height="12" viewBox="0 0 12 12" className="text-white">
      <path d="M4 4L8 8M8 4L4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  ),
};

const lineStyles: Record<StepState, string> = {
  completed: "bg-success",
  active: "bg-separator",
  pending: "bg-separator",
  error: "bg-separator",
};

const StepIndicator = forwardRef<HTMLDivElement, StepIndicatorProps>(
  ({ className, steps, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-0 overflow-x-auto rounded-[var(--radius-md)] bg-bg-secondary p-3",
        className
      )}
      {...props}
    >
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-shrink-0">
          {/* Step dot/icon */}
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "flex items-center justify-center rounded-full flex-shrink-0",
                step.state === "completed" || step.state === "error"
                  ? "h-[18px] w-[18px]"
                  : "h-2 w-2",
                dotStyles[step.state]
              )}
            >
              {iconMap[step.state]}
            </span>
            <span
              className={cn(
                "text-[length:var(--text-caption1)] whitespace-nowrap",
                step.state === "active"
                  ? "font-semibold text-label"
                  : step.state === "completed"
                    ? "text-label-secondary"
                    : step.state === "error"
                      ? "text-error"
                      : "text-label-tertiary"
              )}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-px w-6 mx-2 flex-shrink-0",
                lineStyles[steps[i + 1]?.state ?? "pending"]
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
);
StepIndicator.displayName = "StepIndicator";

export { StepIndicator, type StepIndicatorProps, type Step };
