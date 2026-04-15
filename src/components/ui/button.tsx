import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "tinted" | "danger" | "dark";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconOnly?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover active:opacity-80",
  secondary:
    "bg-fill-tertiary text-label hover:bg-fill-secondary active:opacity-80",
  dark:
    "bg-secondary text-white hover:bg-secondary-hover active:opacity-80",
  tinted:
    "bg-primary-light text-primary hover:opacity-80 active:opacity-60",
  outline:
    "border border-separator-opaque bg-transparent hover:bg-fill-tertiary text-label active:opacity-80",
  ghost:
    "bg-transparent hover:bg-fill-tertiary text-label active:opacity-80",
  danger:
    "bg-error text-white hover:opacity-90 active:opacity-80",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-4 text-[length:var(--text-footnote)] gap-1.5 rounded-[var(--radius-pill)]",
  md: "h-[37px] px-5 text-[length:var(--text-subhead)] gap-2 rounded-[var(--radius-pill)]",
  lg: "h-[45px] px-5 text-[length:var(--text-body)] gap-2 rounded-[var(--radius-pill)]",
};

const iconOnlySizeStyles: Record<Size, string> = {
  sm: "h-[var(--input-height-sm)] w-[var(--input-height-sm)] rounded-full",
  md: "h-[var(--input-height-md)] w-[var(--input-height-md)] rounded-full",
  lg: "h-[var(--input-height-lg)] w-[var(--input-height-lg)] rounded-full",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      iconOnly = false,
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-[var(--transition-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40 select-none",
          variantStyles[variant],
          iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {!iconOnly && children && (
              <span className="ml-1">{children}</span>
            )}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, type ButtonProps };
