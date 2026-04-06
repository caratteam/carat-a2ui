"use client";

import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./button";
import { IcChatDots } from "@/lib/icons";

interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center",
        className
      )}
      {...props}
    >
      <span className="mb-4 text-label-tertiary">
        {icon || <IcChatDots size={48} />}
      </span>
      <h3 className="text-[length:var(--text-title3)] font-semibold text-label mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-[length:var(--text-subhead)] text-label-secondary max-w-[280px] leading-[var(--leading-normal)]">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-5">
          <Button variant="tinted" size="md" onClick={action.onClick}>
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
);
EmptyState.displayName = "EmptyState";

export { EmptyState, type EmptyStateProps };
