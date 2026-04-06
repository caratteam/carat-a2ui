"use client";

import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { IcInfo, IcWarning, IcCloseCircle, IcCheckCircle, IcClose } from "@/lib/icons";

type Variant = "info" | "warning" | "error" | "success";

interface InlineBannerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const variantStyles: Record<Variant, { bg: string; icon: React.ReactNode }> = {
  info: { bg: "bg-info-light", icon: <IcInfo size={16} weight="fill" /> },
  warning: { bg: "bg-warning-light", icon: <IcWarning size={16} weight="fill" /> },
  error: { bg: "bg-error-light", icon: <IcCloseCircle size={16} weight="fill" /> },
  success: { bg: "bg-success-light", icon: <IcCheckCircle size={16} weight="fill" /> },
};

const InlineBanner = forwardRef<HTMLDivElement, InlineBannerProps>(
  ({ className, variant = "info", message, dismissible = true, onDismiss, ...props }, ref) => {
    const config = variantStyles[variant];

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2.5 h-11 px-4 text-[length:var(--text-subhead)] text-label",
          config.bg,
          className
        )}
        role="alert"
        {...props}
      >
        <span className="flex-shrink-0">{config.icon}</span>
        <span className="flex-1 truncate">{message}</span>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 h-6 w-6 inline-flex items-center justify-center rounded-full hover:bg-black/10 transition-colors text-label-secondary"
            aria-label="닫기"
          >
            <IcClose size={12} />
          </button>
        )}
      </div>
    );
  }
);
InlineBanner.displayName = "InlineBanner";

export { InlineBanner, type InlineBannerProps };
