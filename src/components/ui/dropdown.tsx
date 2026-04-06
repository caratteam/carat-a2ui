"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { cn } from "@/lib/cn";

interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  group?: string;
}

type DropdownSize = "sm" | "md";

interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  trigger: ReactNode;
  items: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  align?: "left" | "right";
  size?: DropdownSize;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, trigger, items, value, onChange, align = "left", size = "md", ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          close();
        }
      };
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleEsc);
      };
    }, [open, close]);

    // Group items
    const groups: { group: string | null; items: DropdownItem[] }[] = [];
    items.forEach((item) => {
      const groupName = item.group ?? null;
      const existing = groups.find((g) => g.group === groupName);
      if (existing) {
        existing.items.push(item);
      } else {
        groups.push({ group: groupName, items: [item] });
      }
    });

    return (
      <div ref={containerRef} className={cn("relative inline-flex", className)} {...props}>
        <div ref={ref} onClick={() => setOpen((o) => !o)} className="cursor-pointer">
          {trigger}
        </div>

        {open && (
          <div
            className={cn(
              "absolute top-full mt-1.5 z-[var(--z-dropdown)] py-1.5 rounded-[var(--radius-md)] bg-bg-primary border border-separator-opaque shadow-[var(--shadow-lg)]",
              size === "sm" ? "min-w-[160px]" : "min-w-[200px]",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {groups.map((group, gi) => (
              <div key={gi}>
                {gi > 0 && (
                  <div className="h-px bg-separator mx-2 my-1.5" />
                )}
                {group.group && (
                  <div className="px-3 py-1 text-[length:var(--text-caption1)] text-label-tertiary font-medium">
                    {group.group}
                  </div>
                )}
                {group.items.map((item) => {
                  const isSelected = item.value === value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => {
                        onChange?.(item.value);
                        close();
                      }}
                      className={cn(
                        "flex items-center gap-2.5 w-full text-label text-left transition-colors duration-[var(--transition-fast)] hover:bg-fill-tertiary",
                        size === "sm" ? "py-1.5 px-3 text-[length:var(--text-caption1)]" : "px-3 py-2 text-[length:var(--text-subhead)]",
                        isSelected && "font-medium"
                      )}
                    >
                      {item.icon && <span className="flex-shrink-0 text-label-secondary">{item.icon}</span>}
                      <span className="flex-1 truncate">{item.label}</span>
                      {isSelected && (
                        <svg width="14" height="14" viewBox="0 0 14 14" className="flex-shrink-0 text-primary">
                          <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

export { Dropdown, type DropdownProps, type DropdownItem, type DropdownSize };
