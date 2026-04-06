"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { IcCopy, IcDownloadSimple, IcRefresh, IcEdit } from "@/lib/icons";

type Action = "copy" | "download" | "regenerate" | "edit";

interface ActionBarProps extends HTMLAttributes<HTMLDivElement> {
  actions?: Action[];
  onAction?: (action: Action) => void;
}

const actionConfig: Record<Action, { label: string; icon: React.ReactNode }> = {
  copy: { label: "복사", icon: <IcCopy size={14} /> },
  download: { label: "다운로드", icon: <IcDownloadSimple size={14} /> },
  regenerate: { label: "재생성", icon: <IcRefresh size={14} /> },
  edit: { label: "수정 요청", icon: <IcEdit size={14} /> },
};

const ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(
  ({ className, actions = ["copy", "download", "regenerate"], onAction, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-1 pt-2", className)}
      {...props}
    >
      {actions.map((action) => {
        const config = actionConfig[action];
        return (
          <button
            key={action}
            onClick={() => onAction?.(action)}
            className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-[var(--radius-sm)] text-[length:var(--text-caption1)] font-medium text-label-secondary hover:bg-fill-tertiary hover:text-label transition-colors duration-[var(--transition-fast)] select-none"
            title={config.label}
          >
            {config.icon}
            <span className="hidden sm:inline">{config.label}</span>
          </button>
        );
      })}
    </div>
  )
);
ActionBar.displayName = "ActionBar";

export { ActionBar, type ActionBarProps, type Action };
