"use client";

import { type ComponentType, forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type IconWeight = "thin" | "light" | "regular" | "bold" | "fill" | "duotone";

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  icon: ComponentType<{ size?: number | string; weight?: IconWeight; color?: string; className?: string }>;
  size?: number;
  weight?: IconWeight;
  color?: string;
  label?: string;
}

const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ icon: IconComponent, size = 20, weight = "regular", color, label, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role={label ? "img" : "presentation"}
        aria-label={label}
        aria-hidden={!label}
        className={cn("inline-flex items-center justify-center shrink-0", className)}
        {...props}
      >
        <IconComponent size={size} weight={weight} color={color} />
      </span>
    );
  }
);
Icon.displayName = "Icon";

export { Icon, type IconProps, type IconWeight };
