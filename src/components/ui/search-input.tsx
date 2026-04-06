"use client";

import { type InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/cn";
import { IcSearch, IcCloseCircle } from "@/lib/icons";

type SearchSize = "sm" | "md";
type SearchVariant = "default" | "filled";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: SearchSize;
  variant?: SearchVariant;
  onClear?: () => void;
}

const sizeStyles: Record<SearchSize, string> = {
  sm: "h-8 text-[length:var(--text-footnote)] pl-8 pr-8",
  md: "h-[var(--input-height-md)] text-[length:var(--text-body)] pl-10 pr-10",
};

const iconSizeMap: Record<SearchSize, number> = {
  sm: 14,
  md: 18,
};

const variantStyles: Record<SearchVariant, string> = {
  default: "bg-fill-tertiary border border-transparent",
  filled: "bg-bg-secondary border border-separator-opaque",
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, size = "md", variant = "default", value, onChange, onClear, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState("");
    const displayValue = value !== undefined ? value : internalValue;
    const hasValue = String(displayValue).length > 0;

    return (
      <div className="relative flex items-center w-full">
        {/* Search icon */}
        <span className="absolute left-3 text-label-tertiary pointer-events-none">
          <IcSearch size={iconSizeMap[size]} />
        </span>

        <input
          ref={ref}
          type="search"
          value={displayValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            onChange?.(e);
          }}
          className={cn(
            "flex w-full rounded-[var(--radius-sm)] text-label transition-colors duration-[var(--transition-fast)] placeholder:text-placeholder focus:outline-2 focus:outline-primary focus:-outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 [&::-webkit-search-cancel-button]:hidden",
            variantStyles[variant],
            sizeStyles[size],
            className
          )}
          {...props}
        />

        {/* Clear button */}
        {hasValue && (
          <button
            type="button"
            onClick={() => {
              setInternalValue("");
              onClear?.();
            }}
            className="absolute right-2.5 flex items-center justify-center text-label-tertiary hover:text-label-secondary transition-colors duration-[var(--transition-fast)]"
            aria-label="Clear"
          >
            <IcCloseCircle size={size === "sm" ? 14 : 18} weight="fill" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput, type SearchInputProps, type SearchVariant };
