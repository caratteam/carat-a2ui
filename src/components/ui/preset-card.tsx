import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface PresetCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  title: string;
  description: string;
}

const PresetCard = forwardRef<HTMLButtonElement, PresetCardProps>(
  ({ className, icon, title, description, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex flex-col items-start gap-2 p-[var(--space-4)] rounded-[var(--radius-lg)] bg-bg-secondary text-left transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 active:scale-[0.98] select-none",
        className
      )}
      {...props}
    >
      <span className="text-[length:var(--text-title1)] text-label-secondary">{icon}</span>
      <div className="flex flex-col gap-0.5">
        <span className="text-[length:var(--text-subhead)] font-semibold text-label">
          {title}
        </span>
        <span className="text-[length:var(--text-footnote)] text-label-secondary line-clamp-2">
          {description}
        </span>
      </div>
    </button>
  )
);
PresetCard.displayName = "PresetCard";

export { PresetCard, type PresetCardProps };
