import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "selected" | "outline";
type Size = "sm" | "md";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-fill-tertiary text-label hover:bg-fill-secondary",
  selected: "bg-primary-light text-primary",
  outline: "bg-transparent border border-separator-opaque text-label hover:bg-fill-tertiary",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-7 px-2.5 text-[length:var(--text-footnote)] gap-1.5",
  md: "h-8 px-3 text-[length:var(--text-subhead)] gap-2",
};

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant = "default", size = "md", icon, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-[var(--transition-fast)] select-none disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97]",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
);
Chip.displayName = "Chip";

export { Chip, type ChipProps };
