import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type StreamingState = "streaming" | "complete" | "stopped";

interface StreamingTextProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  state?: StreamingState;
}

const StreamingText = forwardRef<HTMLDivElement, StreamingTextProps>(
  ({ className, content, state = "streaming", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "text-[length:var(--text-body)] text-label leading-[var(--leading-normal)]",
        className
      )}
      {...props}
    >
      <span>{content}</span>

      {state === "streaming" && (
        <span className="inline-block w-[2px] h-[1.1em] bg-label align-text-bottom ml-0.5 animate-[cursor-blink_1s_step-end_infinite]" />
      )}

      {state === "stopped" && (
        <div className="mt-3 flex items-center gap-2 py-2 border-t border-dashed border-separator">
          <span className="text-[length:var(--text-caption1)] text-label-tertiary font-medium">
            여기까지 생성됨
          </span>
        </div>
      )}
    </div>
  )
);
StreamingText.displayName = "StreamingText";

export { StreamingText, type StreamingTextProps };
