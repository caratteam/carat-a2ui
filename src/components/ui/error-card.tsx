"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./button";
import { IcWarning } from "@/lib/icons";

type ErrorCardVariant = "default" | "compact";

interface ErrorCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  suggestion?: string;
  variant?: ErrorCardVariant;
  onRetry?: () => void;
}

const ErrorCard = forwardRef<HTMLDivElement, ErrorCardProps>(
  (
    {
      className,
      title = "결과를 생성하지 못했어요",
      description,
      suggestion,
      variant = "default",
      onRetry,
      ...props
    },
    ref
  ) => {
    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-[var(--radius-md)] bg-error-light border border-error/20 px-3 py-2",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            <span className="flex-shrink-0 text-warning">
              <IcWarning size={16} weight="fill" />
            </span>
            <span className="flex-1 min-w-0 truncate text-[length:var(--text-footnote)] text-label">
              {description || title}
            </span>
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry} className="flex-shrink-0">
                다시 시도
              </Button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-md)] bg-error-light border border-error/20 p-4",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-2.5">
          <span className="flex-shrink-0 text-warning mt-0.5">
            <IcWarning size={20} weight="fill" />
          </span>
          <div className="flex-1 space-y-2">
            <p className="text-[length:var(--text-subhead)] font-semibold text-label">
              {title}
            </p>
            {description && (
              <p className="text-[length:var(--text-footnote)] text-label-secondary leading-[var(--leading-normal)]">
                {description}
              </p>
            )}
            {suggestion && (
              <p className="text-[length:var(--text-footnote)] text-label-secondary leading-[var(--leading-normal)]">
                예: {suggestion}
              </p>
            )}
            {onRetry && (
              <div className="pt-1">
                <Button variant="outline" size="sm" onClick={onRetry}>
                  다시 시도
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
ErrorCard.displayName = "ErrorCard";

export { ErrorCard, type ErrorCardProps, type ErrorCardVariant };
