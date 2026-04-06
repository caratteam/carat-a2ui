"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
  useRef,
  useCallback,
} from "react";
import { cn } from "@/lib/cn";

type Side = "top" | "bottom" | "left" | "right";
type TooltipVariant = "default" | "rich";

interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: ReactNode;
  variant?: TooltipVariant;
  side?: Side;
  maxWidth?: number;
  delay?: number;
  children: ReactNode;
}

const sideStyles: Record<Side, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowStyles: Record<Side, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-foreground border-x-transparent border-b-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-foreground border-x-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-l-foreground border-y-transparent border-r-transparent",
  right: "right-full top-1/2 -translate-y-1/2 border-r-foreground border-y-transparent border-l-transparent",
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, variant = "default", side = "top", maxWidth, delay = 300, children, className, ...props }, ref) => {
    const resolvedMaxWidth = maxWidth ?? (variant === "rich" ? 320 : undefined);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const show = useCallback(() => {
      timeoutRef.current = setTimeout(() => setVisible(true), delay);
    }, [delay]);

    const hide = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setVisible(false);
    }, []);

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}
        {visible && (
          <div
            className={cn(
              "absolute z-[var(--z-tooltip)] rounded-[var(--radius-sm)] whitespace-nowrap pointer-events-none",
              variant === "default" && "px-2.5 py-1.5 bg-foreground text-background text-[length:var(--text-caption1)] leading-[var(--leading-normal)]",
              variant === "rich" && "px-4 py-3 bg-bg-primary border border-separator-opaque shadow-[var(--shadow-lg)] text-[length:var(--text-subhead)] text-label leading-[var(--leading-normal)] whitespace-normal",
              sideStyles[side]
            )}
            style={{ maxWidth: resolvedMaxWidth }}
            role="tooltip"
          >
            {content}
            {variant === "default" && (
              <span
                className={cn(
                  "absolute w-0 h-0 border-[4px]",
                  arrowStyles[side]
                )}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);
Tooltip.displayName = "Tooltip";

export { Tooltip, type TooltipProps, type TooltipVariant };
