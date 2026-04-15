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
  // Figma: unselected chip — white bg, 1px border, dark text
  default:
    "bg-background border border-separator-opaque text-label hover:bg-fill-tertiary",
  // Figma: selected chip — dark fill, white text, no border
  selected:
    "bg-secondary text-white hover:bg-secondary-hover",
  // Figma: soft fill — translucent gray, no border
  outline:
    "bg-fill-tertiary text-label hover:bg-fill-secondary",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-[length:var(--text-footnote)] gap-1.5 rounded-[var(--radius-md)]",
  md: "h-[37px] px-[18px] text-[length:var(--text-subhead)] gap-2 rounded-[var(--radius-lg)]",
};

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant = "default", size = "md", icon, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-[var(--transition-fast)] select-none disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97]",
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
