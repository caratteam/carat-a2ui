import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

interface SkillCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  title: string;
  description: string;
  category?: string;
}

const SkillCard = forwardRef<HTMLButtonElement, SkillCardProps>(
  ({ className, icon, title, description, category, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex flex-col items-start gap-1.5 p-[var(--space-3)] rounded-[var(--radius-md)] bg-bg-primary border border-separator-opaque text-left transition-all duration-[var(--transition-fast)] hover:border-primary hover:shadow-[var(--shadow-sm)] active:scale-[0.98] select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="text-[length:var(--text-title3)] text-label-secondary">{icon}</span>
        <span className="text-[length:var(--text-subhead)] font-semibold text-label">
          {title}
        </span>
      </div>
      <span className="text-[length:var(--text-footnote)] text-label-secondary line-clamp-2 leading-[var(--leading-normal)]">
        {description}
      </span>
      {category && (
        <span className="text-[length:var(--text-caption2)] text-label-tertiary font-medium">
          {category}
        </span>
      )}
    </button>
  )
);
SkillCard.displayName = "SkillCard";

export { SkillCard, type SkillCardProps };
