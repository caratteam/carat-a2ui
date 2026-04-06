import { type HTMLAttributes, type ImgHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
  src?: string;
  alt?: string;
  initials?: string;
  icon?: React.ReactNode;
}

const sizeStyles: Record<Size, string> = {
  sm: "h-7 w-7 text-[length:var(--text-caption2)]",
  md: "h-9 w-9 text-[length:var(--text-footnote)]",
  lg: "h-11 w-11 text-[length:var(--text-subhead)]",
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "md", src, alt = "", initials, icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-fill-secondary text-label-secondary font-medium select-none overflow-hidden flex-shrink-0",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : icon ? (
        <span className="flex items-center justify-center">{icon}</span>
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  )
);
Avatar.displayName = "Avatar";

export { Avatar, type AvatarProps };
