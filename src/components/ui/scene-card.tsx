"use client";

import { type HTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/cn";
import { IcEdit, IcRefresh, IcCopy } from "@/lib/icons";

type SceneState = "default" | "streaming" | "editing" | "regenerating";

interface SceneSection {
  label: string;
  content: string;
}

interface SceneCardProps extends HTMLAttributes<HTMLDivElement> {
  sceneNumber: number;
  timeCode?: string;
  sections: SceneSection[];
  state?: SceneState;
  onEdit?: () => void;
  onRegenerate?: () => void;
  onCopy?: () => void;
}

const SceneCard = forwardRef<HTMLDivElement, SceneCardProps>(
  (
    {
      className,
      sceneNumber,
      timeCode,
      sections,
      state = "default",
      onEdit,
      onRegenerate,
      onCopy,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-[var(--radius-md)] bg-bg-secondary border border-separator-opaque overflow-hidden transition-shadow duration-[var(--transition-fast)]",
          state === "streaming" && "border-agent",
          state === "regenerating" && "opacity-60",
          className
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-agent text-white text-[length:var(--text-caption2)] font-bold">
              {String(sceneNumber).padStart(2, "0")}
            </span>
            {timeCode && (
              <span className="text-[length:var(--text-caption1)] text-label-tertiary font-mono">
                {timeCode}
              </span>
            )}
          </div>

          {/* Actions — fade in on hover */}
          <div
            className={cn(
              "flex items-center gap-0.5 transition-opacity duration-[var(--transition-fast)]",
              hovered ? "opacity-100" : "opacity-0"
            )}
          >
            {onEdit && (
              <button
                onClick={onEdit}
                className="h-7 w-7 inline-flex items-center justify-center rounded-[var(--radius-xs)] text-label-secondary hover:bg-fill-tertiary hover:text-label transition-colors"
                title="수정"
              >
                <IcEdit size={14} />
              </button>
            )}
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="h-7 w-7 inline-flex items-center justify-center rounded-[var(--radius-xs)] text-label-secondary hover:bg-fill-tertiary hover:text-label transition-colors"
                title="재생성"
              >
                <IcRefresh size={14} />
              </button>
            )}
            {onCopy && (
              <button
                onClick={onCopy}
                className="h-7 w-7 inline-flex items-center justify-center rounded-[var(--radius-xs)] text-label-secondary hover:bg-fill-tertiary hover:text-label transition-colors"
                title="복사"
              >
                <IcCopy size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="px-4 pb-4 space-y-2.5">
          {sections.map((section, i) => (
            <div key={i}>
              <span className="text-[length:var(--text-caption1)] font-semibold text-label-secondary uppercase tracking-wide">
                [{section.label}]
              </span>
              <p className="mt-0.5 text-[length:var(--text-subhead)] text-label leading-[var(--leading-normal)] whitespace-pre-wrap">
                {section.content}
              </p>
            </div>
          ))}

          {state === "streaming" && (
            <span className="inline-block w-[2px] h-[1.1em] bg-label align-text-bottom animate-[cursor-blink_1s_step-end_infinite]" />
          )}
        </div>
      </div>
    );
  }
);
SceneCard.displayName = "SceneCard";

export { SceneCard, type SceneCardProps, type SceneSection };
