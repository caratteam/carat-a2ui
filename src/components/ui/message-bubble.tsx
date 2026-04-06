import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { IcLightning, IcWarningCircle } from "@/lib/icons";

type Role = "user" | "agent";
type MessageBubbleVariant = "default" | "error" | "system";

interface MessageBubbleProps extends HTMLAttributes<HTMLDivElement> {
  role: Role;
  variant?: MessageBubbleVariant;
  skillTag?: ReactNode;
}

const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  ({ className, role, variant = "default", skillTag, children, ...props }, ref) => {
    if (variant === "system") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex flex-col items-center gap-1",
            className
          )}
          {...props}
        >
          <div className="w-full rounded-[var(--radius-md)] bg-fill-tertiary px-4 py-2.5 text-center text-[length:var(--text-footnote)] italic text-label-secondary leading-[var(--leading-normal)]">
            {children}
          </div>
        </div>
      );
    }

    if (variant === "error") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex flex-col items-start gap-2",
            className
          )}
          {...props}
        >
          <div className="w-full rounded-[var(--radius-md)] bg-error-light px-4 py-3 text-[length:var(--text-body)] text-label leading-[var(--leading-normal)]">
            <div className="flex items-start gap-2">
              <span className="flex-shrink-0 text-error mt-0.5">
                <IcWarningCircle size={16} weight="fill" />
              </span>
              <div className="flex-1">{children}</div>
            </div>
          </div>
        </div>
      );
    }

    if (role === "user") {
      return (
        <div
          ref={ref}
          className={cn("flex flex-col items-end gap-1.5", className)}
          {...props}
        >
          <div className="max-w-[80%] rounded-[var(--radius-lg)] rounded-br-[var(--radius-xs)] bg-primary text-white px-4 py-3 text-[length:var(--text-body)] leading-[var(--leading-normal)]">
            {children}
          </div>
          {skillTag && (
            <div className="flex items-center gap-1">
              {skillTag}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-start gap-2", className)}
        {...props}
      >
        <div className="flex items-center gap-1.5">
          <IcLightning size={14} weight="fill" className="text-agent" />
          <span className="text-[length:var(--text-footnote)] font-semibold text-agent">
            캐럿 에이전트
          </span>
        </div>
        <div className="w-full text-[length:var(--text-body)] text-label leading-[var(--leading-normal)]">
          {children}
        </div>
      </div>
    );
  }
);
MessageBubble.displayName = "MessageBubble";

export { MessageBubble, type MessageBubbleProps, type MessageBubbleVariant };
