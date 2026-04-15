import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

type InputSize = "sm" | "md";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "h-[var(--input-height-sm)] text-[length:var(--text-footnote)]",
  md: "h-[var(--input-height-md)] text-[length:var(--text-body)]",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = "md", leftIcon, rightIcon, error = false, ...props }, ref) => {
    const hasIcon = leftIcon || rightIcon;

    if (hasIcon) {
      return (
        <div
          className={cn(
            "relative flex items-center w-full",
            sizeStyles[size]
          )}
        >
          {leftIcon && (
            <span className="absolute left-3 flex items-center text-label-tertiary pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "flex h-full w-full rounded-[var(--radius-xl)] border bg-background text-label transition-colors duration-[var(--transition-fast)] placeholder:text-placeholder focus:outline-2 focus:outline-primary focus:-outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40",
              error ? "border-error" : "border-separator-opaque",
              leftIcon ? "pl-10" : "pl-3",
              rightIcon ? "pr-10" : "pr-3",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 flex items-center text-label-tertiary">
              {rightIcon}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={cn(
          "flex w-full rounded-[var(--radius-xl)] border bg-background px-3 text-label transition-colors duration-[var(--transition-fast)] placeholder:text-placeholder focus:outline-2 focus:outline-primary focus:-outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40",
          sizeStyles[size],
          error ? "border-error" : "border-separator-opaque",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, type InputProps };
