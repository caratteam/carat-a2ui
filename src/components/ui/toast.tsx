"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
  useEffect,
} from "react";
import { cn } from "@/lib/cn";
import { IcCheckCircle, IcCloseCircle, IcInfo } from "@/lib/icons";

type Variant = "success" | "error" | "info";
type ToastSize = "sm" | "md";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  size?: ToastSize;
  message: string;
  duration?: number;
  visible?: boolean;
  onDismiss?: () => void;
}

const variantConfig: Record<Variant, Record<ToastSize, { icon: ReactNode }>> = {
  success: {
    sm: { icon: <IcCheckCircle size={14} weight="fill" className="text-success" /> },
    md: { icon: <IcCheckCircle size={18} weight="fill" className="text-success" /> },
  },
  error: {
    sm: { icon: <IcCloseCircle size={14} weight="fill" className="text-error" /> },
    md: { icon: <IcCloseCircle size={18} weight="fill" className="text-error" /> },
  },
  info: {
    sm: { icon: <IcInfo size={14} weight="fill" className="text-primary" /> },
    md: { icon: <IcInfo size={18} weight="fill" className="text-primary" /> },
  },
};

const sizeStyles: Record<ToastSize, string> = {
  sm: "px-3 py-2 text-[length:var(--text-caption1)]",
  md: "px-4 py-3 text-[length:var(--text-subhead)]",
};

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "info", size = "md", message, duration = 3000, visible = true, onDismiss, ...props }, ref) => {
    const [show, setShow] = useState(visible);

    useEffect(() => {
      setShow(visible);
      if (visible && duration > 0) {
        const timer = setTimeout(() => {
          setShow(false);
          onDismiss?.();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [visible, duration, onDismiss]);

    if (!show) return null;

    const config = variantConfig[variant][size];

    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-toast)] flex items-center gap-2.5 rounded-[var(--radius-md)] bg-bg-primary border border-separator-opaque shadow-[var(--shadow-lg)] text-label animate-[slideUp_0.2s_ease-out]",
          sizeStyles[size],
          className
        )}
        role="alert"
        {...props}
      >
        <span className="flex-shrink-0">
          {config.icon}
        </span>
        <span>{message}</span>
      </div>
    );
  }
);
Toast.displayName = "Toast";

export { Toast, type ToastProps, type ToastSize };
