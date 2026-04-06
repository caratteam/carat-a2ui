"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { cn } from "@/lib/cn";

interface CommandItem {
  icon?: ReactNode;
  label: string;
  description?: string;
  value: string;
}

type CommandPaletteSize = "sm" | "md";

interface CommandPaletteProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  open: boolean;
  items: CommandItem[];
  filter?: string;
  onSelect: (value: string) => void;
  onClose?: () => void;
  maxItems?: number;
  size?: CommandPaletteSize;
}

const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      className,
      open,
      items,
      filter = "",
      onSelect,
      onClose,
      maxItems = 8,
      size = "md",
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const innerRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 감지 — 팔레트 바깥을 클릭하면 닫힘
    useEffect(() => {
      if (!open) return;
      const handleClickOutside = (e: MouseEvent) => {
        const el = innerRef.current;
        if (el && !el.contains(e.target as Node)) {
          onClose?.();
        }
      };
      // mousedown 으로 등록해야 버튼 클릭 이전에 잡힘
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, onClose]);

    const filtered = items
      .filter((item) => {
        const q = filter.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        );
      })
      .slice(0, maxItems);

    useEffect(() => {
      setActiveIndex(0);
    }, [filter]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (!open) return;
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filtered[activeIndex]) {
            onSelect(filtered[activeIndex].value);
          }
        } else if (e.key === "Escape") {
          onClose?.();
        }
      },
      [open, filtered, activeIndex, onSelect, onClose]
    );

    useEffect(() => {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (!open || filtered.length === 0) return null;

    return (
      <div
        ref={(node) => {
          // 두 ref 모두 연결
          (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "absolute bottom-full mb-2 left-0 right-0 z-[var(--z-popover)] rounded-[var(--radius-lg)] bg-bg-primary border border-separator-opaque shadow-[var(--shadow-lg)] overflow-hidden animate-[slideUp_0.15s_ease-out]",
          className
        )}
        {...props}
      >
        <div className={cn(
          "overflow-y-auto py-1.5",
          size === "sm" ? "max-h-[200px]" : "max-h-[320px]"
        )}>
          {filtered.map((item, i) => (
            <button
              key={item.value}
              onClick={() => onSelect(item.value)}
              onMouseEnter={() => setActiveIndex(i)}
              className={cn(
                "flex items-center gap-3 w-full text-left transition-colors duration-75",
                size === "sm" ? "px-3 py-2" : "px-4 py-2.5",
                i === activeIndex ? "bg-fill-tertiary" : ""
              )}
            >
              {item.icon && (
                <span className="flex-shrink-0 text-[length:var(--text-title3)]">
                  {item.icon}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "font-medium text-label truncate",
                  size === "sm" ? "text-[length:var(--text-footnote)]" : "text-[length:var(--text-subhead)]"
                )}>
                  {item.label}
                </div>
                {item.description && (
                  <div className="text-[length:var(--text-caption1)] text-label-secondary truncate">
                    {item.description}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }
);
CommandPalette.displayName = "CommandPalette";

export { CommandPalette, type CommandPaletteProps, type CommandItem, type CommandPaletteSize };
