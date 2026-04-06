import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { StatusIndicator } from "./status-indicator";
import { IcLightning, IcChatDots } from "@/lib/icons";

type Mode = "1.0" | "2.0";
type Status = "complete" | "running" | "stopped" | "error";

interface HistoryItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  mode?: Mode;
  status?: Status;
  selected?: boolean;
}

const statusLabel: Record<Status, string> = {
  complete: "완료",
  running: "생성 중",
  stopped: "중단됨",
  error: "에러",
};

const HistoryItem = forwardRef<HTMLButtonElement, HistoryItemProps>(
  ({ className, title, mode = "2.0", status = "complete", selected = false, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex items-center gap-2.5 w-full h-11 px-3 rounded-[var(--radius-sm)] text-left transition-colors duration-[var(--transition-fast)] select-none",
        selected
          ? "bg-fill-tertiary text-label"
          : "text-label-secondary hover:bg-fill-tertiary",
        className
      )}
      {...props}
    >
      {/* Mode icon */}
      <span className="flex-shrink-0">
        {mode === "2.0"
          ? <IcLightning size={14} weight="fill" className="text-agent" />
          : <IcChatDots size={14} className="text-label-tertiary" />
        }
      </span>

      {/* Title */}
      <span className="flex-1 truncate text-[length:var(--text-subhead)]">
        {title}
      </span>

      {/* Status */}
      <StatusIndicator
        status={status}
        size="sm"
        label={status !== "complete" ? statusLabel[status] : undefined}
      />
    </button>
  )
);
HistoryItem.displayName = "HistoryItem";

export { HistoryItem, type HistoryItemProps };
