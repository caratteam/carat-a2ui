"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface ImagePickerItem {
  id: string;
  src?: string;
  alt?: string;
  /** Shown as caption/label.
   *  - layout="thumb": overlaid on bottom of the thumbnail
   *  - layout="card":  rendered below the image as card title
   */
  label?: string;
  /** Only shown when layout="card". Rendered below label. */
  description?: string;
  /** Optional badge (e.g. "Recommended") shown at top-left of the image. */
  badge?: string;
  disabled?: boolean;
}

type Size = "sm" | "md" | "lg";
type Layout = "thumb" | "card";
type Aspect = "square" | "portrait" | "landscape";

interface ImagePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  items: ImagePickerItem[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  size?: Size;
  layout?: Layout;
  aspect?: Aspect;
  columns?: number;
  /** Show a soft dark placeholder when an item has no src. */
  placeholderTint?: boolean;
}

const thumbSizeStyles: Record<Size, string> = {
  sm: "w-[96px] rounded-[var(--radius-2xl)]",
  md: "w-[140px] rounded-[var(--radius-lg)]",
  lg: "w-[180px] rounded-[var(--radius-lg)]",
};

const cardSizeStyles: Record<Size, string> = {
  sm: "w-[140px]",
  md: "w-[180px]",
  lg: "w-[220px]",
};

const aspectStyles: Record<Aspect, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/9]",
};

const ImagePicker = forwardRef<HTMLDivElement, ImagePickerProps>(
  (
    {
      className,
      items,
      value,
      onChange,
      multiple = false,
      size = "md",
      layout = "thumb",
      aspect = "square",
      columns,
      placeholderTint = true,
      ...props
    },
    ref
  ) => {
    const selected: string[] = Array.isArray(value)
      ? value
      : value != null
      ? [value]
      : [];

    const isSelected = (id: string) => selected.includes(id);

    const handleClick = (item: ImagePickerItem) => {
      if (item.disabled || !onChange) return;
      if (multiple) {
        const next = isSelected(item.id)
          ? selected.filter((s) => s !== item.id)
          : [...selected, item.id];
        onChange(next);
      } else {
        onChange(item.id);
      }
    };

    const gridStyle = columns
      ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
      : undefined;

    return (
      <div
        ref={ref}
        role={multiple ? "group" : "radiogroup"}
        className={cn(
          "grid gap-[var(--space-2half)]",
          !columns && "grid-flow-col auto-cols-max",
          className
        )}
        style={gridStyle}
        {...props}
      >
        {items.map((item) => {
          const selectedState = isSelected(item.id);
          const isCard = layout === "card";

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => handleClick(item)}
              disabled={item.disabled}
              role={multiple ? "checkbox" : "radio"}
              aria-checked={selectedState}
              aria-label={item.alt ?? item.label ?? item.id}
              className={cn(
                "group text-left transition-all duration-[var(--transition-fast)]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                "active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none",
                isCard ? cardSizeStyles[size] : thumbSizeStyles[size],
                isCard &&
                  cn(
                    "flex flex-col gap-2 rounded-[var(--radius-lg)] border p-[var(--space-2)] bg-bg-primary",
                    selectedState
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-separator-opaque hover:border-label-tertiary"
                  )
              )}
            >
              {/* Image area */}
              <div
                className={cn(
                  "relative overflow-hidden",
                  aspectStyles[aspect],
                  isCard
                    ? "rounded-[var(--radius-md)]"
                    : cn(
                        thumbSizeStyles[size].split(" ").find((c) => c.startsWith("rounded")) ?? "",
                        selectedState
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "ring-1 ring-separator-opaque"
                      ),
                  placeholderTint && !item.src && "bg-secondary"
                )}
              >
                {item.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    className="h-full w-full object-cover"
                  />
                ) : null}

                {item.badge && (
                  <span className="absolute top-2 left-2 rounded-[var(--radius-xs)] bg-primary px-1.5 py-0.5 text-[length:var(--text-caption3)] font-medium text-white shadow-[var(--shadow-sm)]">
                    {item.badge}
                  </span>
                )}

                {!isCard && item.label && (
                  <span className="absolute inset-x-0 bottom-0 px-2 py-1 text-[length:var(--text-caption1)] text-white bg-gradient-to-t from-black/60 to-transparent">
                    {item.label}
                  </span>
                )}

                {selectedState && (
                  <span className="absolute top-2 right-2 grid place-items-center h-5 w-5 rounded-full bg-primary text-white text-[10px] font-bold shadow-[var(--shadow-sm)]">
                    ✓
                  </span>
                )}
              </div>

              {/* Card footer (label + description) */}
              {isCard && (item.label || item.description) && (
                <div className="flex flex-col gap-0.5 px-1 pb-1">
                  {item.label && (
                    <span className="text-[length:var(--text-subhead)] font-medium text-label leading-[var(--leading-tight)]">
                      {item.label}
                    </span>
                  )}
                  {item.description && (
                    <span className="text-[length:var(--text-footnote)] text-label-secondary leading-[var(--leading-normal)]">
                      {item.description}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);
ImagePicker.displayName = "ImagePicker";

export { ImagePicker };
