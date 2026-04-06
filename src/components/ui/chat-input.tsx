"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useRef,
  useCallback,
} from "react";
import { cn } from "@/lib/cn";

type Mode = "default" | "skill-selected" | "generating";

interface ChatInputProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  mode?: Mode;
  value?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  onStop?: () => void;
  placeholder?: string;
  skillTag?: ReactNode;
  toolbar?: ReactNode;
  chipBar?: ReactNode;
  disabled?: boolean;
}

const ChatInput = forwardRef<HTMLDivElement, ChatInputProps>(
  (
    {
      className,
      mode = "default",
      value = "",
      onChange,
      onSend,
      onStop,
      placeholder = "만들고 싶은 걸 알려주세요",
      skillTag,
      toolbar,
      chipBar,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleResize = useCallback(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = "auto";
      const maxH = 200;
      el.style.height = `${Math.min(el.scrollHeight, maxH)}px`;
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && mode !== "generating") {
        e.preventDefault();
        onSend?.();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col rounded-[var(--radius-lg)] border bg-bg-primary transition-colors duration-[var(--transition-fast)]",
          mode === "generating" ? "border-agent" : "border-separator-opaque focus-within:border-primary",
          className
        )}
        {...props}
      >
        {/* Skill tag area */}
        {skillTag && (
          <div className="px-3 pt-3 pb-0">
            {skillTag}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            onChange?.(e.target.value);
            handleResize();
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || mode === "generating"}
          rows={1}
          className="w-full resize-none border-none bg-transparent px-4 pt-3 pb-1 text-[length:var(--text-body)] text-label placeholder:text-placeholder focus:outline-none disabled:opacity-40"
        />

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-1">
            {toolbar}
          </div>

          <div className="flex items-center gap-2">
            {/* Chip bar (shown only in default mode) */}
            {mode === "default" && chipBar && (
              <div className="hidden sm:flex">{chipBar}</div>
            )}

            {/* Send / Stop button */}
            {mode === "generating" ? (
              <button
                onClick={onStop}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-error text-white hover:opacity-90 transition-opacity duration-[var(--transition-fast)]"
                aria-label="중단"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                </svg>
              </button>
            ) : (
              <button
                onClick={onSend}
                disabled={!value.trim() || disabled}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-primary text-white disabled:opacity-30 hover:bg-primary-hover transition-colors duration-[var(--transition-fast)]"
                aria-label="전송"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 2.5L8 13.5M8 2.5L3 7.5M8 2.5L13 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
ChatInput.displayName = "ChatInput";

export { ChatInput, type ChatInputProps };
