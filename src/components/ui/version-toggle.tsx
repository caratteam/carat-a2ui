"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface Version {
  label: string;
  id: string;
}

interface VersionToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  versions: Version[];
  current: string;
  onChange: (id: string) => void;
}

const VersionToggle = forwardRef<HTMLDivElement, VersionToggleProps>(
  ({ className, versions, current, onChange, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    >
      {versions.map((v) => {
        const isActive = v.id === current;
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            className={cn(
              "h-6 px-2 rounded-[var(--radius-xs)] text-[length:var(--text-caption1)] font-medium transition-all duration-[var(--transition-fast)] select-none",
              isActive
                ? "bg-primary text-white"
                : "bg-transparent text-label-tertiary border border-separator-opaque hover:text-label-secondary hover:border-separator"
            )}
          >
            {v.label}
          </button>
        );
      })}
    </div>
  )
);
VersionToggle.displayName = "VersionToggle";

export { VersionToggle, type VersionToggleProps };
