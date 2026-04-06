import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { SceneCard, type SceneCardProps } from "./scene-card";
import { MetaInfoBar, type MetaItem } from "./meta-info-bar";
import { ActionBar, type Action } from "./action-bar";

interface SceneCardListProps extends HTMLAttributes<HTMLDivElement> {
  scenes: Omit<SceneCardProps, "className">[];
  metaItems?: MetaItem[];
  actions?: Action[];
  onAction?: (action: Action) => void;
}

const SceneCardList = forwardRef<HTMLDivElement, SceneCardListProps>(
  ({ className, scenes, metaItems, actions, onAction, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col", className)}
      {...props}
    >
      {/* Scene cards with connector line */}
      <div className="relative">
        {/* Vertical connector line */}
        {scenes.length > 1 && (
          <div className="absolute left-[27px] top-6 bottom-6 w-px bg-separator-opaque" />
        )}

        <div className="space-y-3 relative">
          {scenes.map((scene, i) => (
            <SceneCard key={i} {...scene} />
          ))}
        </div>
      </div>

      {/* Meta info bar */}
      {metaItems && metaItems.length > 0 && (
        <div className="mt-3 pt-3 border-t border-separator">
          <MetaInfoBar items={metaItems} />
        </div>
      )}

      {/* Action bar */}
      {actions && actions.length > 0 && (
        <ActionBar actions={actions} onAction={onAction} />
      )}
    </div>
  )
);
SceneCardList.displayName = "SceneCardList";

export { SceneCardList, type SceneCardListProps };
