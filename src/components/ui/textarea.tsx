"use client";

import {
  type TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/cn";

type TextareaSize = "sm" | "md";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  error?: boolean;
  size?: TextareaSize;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      autoResize = false,
      minRows = 2,
      maxRows = 10,
      error = false,
      size = "md",
      onChange,
      ...props
    },
    ref
  ) => {
    const sizeStyles: Record<TextareaSize, string> = {
      sm: "text-[length:var(--text-footnote)] py-2 px-2.5 min-h-[60px]",
      md: "text-[length:var(--text-body)] py-2.5 px-3",
    };
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const resize = useCallback(() => {
      const el = internalRef.current;
      if (!el || !autoResize) return;
      el.style.height = "auto";
      const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 22;
      const min = lineHeight * minRows + 16; // padding
      const max = lineHeight * maxRows + 16;
      const scrollH = el.scrollHeight;
      el.style.height = `${Math.min(Math.max(scrollH, min), max)}px`;
    }, [autoResize, minRows, maxRows]);

    useEffect(() => {
      resize();
    }, [resize]);

    return (
      <textarea
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }}
        rows={autoResize ? minRows : minRows}
        onChange={(e) => {
          onChange?.(e);
          resize();
        }}
        className={cn(
          "flex w-full rounded-[var(--radius-md)] border bg-background text-label leading-[var(--leading-normal)] transition-colors duration-[var(--transition-fast)] placeholder:text-placeholder focus:outline-2 focus:outline-primary focus:-outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 resize-none",
          sizeStyles[size],
          error ? "border-error" : "border-separator-opaque",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, type TextareaProps };
