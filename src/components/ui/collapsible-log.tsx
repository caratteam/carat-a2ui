"use client";

import { type HTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/cn";
import { IcCaretDown, IcCheckCircle, IcCloseCircle } from "@/lib/icons";

type LogStatus = "success" | "running" | "error";

interface LogEntry {
  status: LogStatus;
  message: string;
}

interface CollapsibleLogProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  defaultOpen?: boolean;
  entries: LogEntry[];
}

const statusIcon: Record<LogStatus, { icon: React.ReactNode; color: string }> = {
  success: { icon: <IcCheckCircle size={12} weight="fill" />, color: "text-success" },
  running: { icon: <span className="block w-2.5 h-2.5 rounded-full bg-current" />, color: "text-agent" },
  error: { icon: <IcCloseCircle size={12} weight="fill" />, color: "text-error" },
};

const CollapsibleLog = forwardRef<HTMLDivElement, CollapsibleLogProps>(
  ({ className, title = "실행 과정 보기", defaultOpen = false, entries, ...props }, ref) => {
    const [open, setOpen] = useState(defaultOpen);

    return (
      <div
        ref={ref}
        className={cn("rounded-[var(--radius-sm)] overflow-hidden", className)}
        {...props}
      >
        {/* Toggle bar */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 w-full px-3 py-2 text-[length:var(--text-caption1)] font-medium text-label-tertiary hover:text-label-secondary transition-colors duration-[var(--transition-fast)] select-none"
        >
          <div className="flex-1 h-px bg-separator" />
          <span>{title}</span>
          <span
            className={cn(
              "transition-transform duration-[var(--transition-fast)]",
              open && "rotate-180"
            )}
          >
            <IcCaretDown size={12} />
          </span>
          <div className="flex-1 h-px bg-separator" />
        </button>

        {/* Log entries */}
        {open && (
          <div className="max-h-[200px] overflow-y-auto bg-fill-tertiary rounded-[var(--radius-sm)] mx-1 mb-1 p-2 space-y-1">
            {entries.map((entry, i) => {
              const config = statusIcon[entry.status];
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 text-[length:var(--text-caption1)] font-mono leading-[var(--leading-relaxed)]"
                >
                  <span
                    className={cn(
                      "flex-shrink-0 w-3 h-3 flex items-center justify-center",
                      config.color,
                      entry.status === "running" && "animate-[pulse-dot_1.5s_ease-in-out_infinite]"
                    )}
                  >
                    {config.icon}
                  </span>
                  <span className="text-label-secondary">{entry.message}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
CollapsibleLog.displayName = "CollapsibleLog";

export { CollapsibleLog, type CollapsibleLogProps, type LogEntry };
