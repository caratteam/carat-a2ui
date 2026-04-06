"use client";

import { type HTMLAttributes, type ReactNode, forwardRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { IcClose } from "@/lib/icons";

type ModalSize = "sm" | "md" | "lg" | "fullscreen";
type ModalVariant = "default" | "alert" | "confirm" | "form" | "bottomSheet";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  variant?: ModalVariant;
  size?: ModalSize;
  title?: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  /** Prevent closing by backdrop click (alert/confirm) */
  persistent?: boolean;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: "max-w-[400px]",
  md: "max-w-[520px]",
  lg: "max-w-[680px]",
  fullscreen: "w-full h-full max-w-none",
};

const maxHeightStyles: Record<ModalSize, string> = {
  sm: "max-h-[70vh]",
  md: "max-h-[70vh]",
  lg: "max-h-[80vh]",
  fullscreen: "max-h-full",
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      open,
      onClose,
      variant = "default",
      size = "md",
      title,
      description,
      icon,
      children,
      footer,
      persistent = false,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!open) return;
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && !persistent) onClose();
      };
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
      };
    }, [open, onClose, persistent]);

    if (!open) return null;

    const isBottomSheet = variant === "bottomSheet";
    const isAlert = variant === "alert";
    const isConfirm = variant === "confirm";
    const isCentered = isAlert || isConfirm;

    const handleBackdrop = () => {
      if (!persistent) onClose();
    };

    return (
      <div
        className={cn(
          "fixed inset-0 z-[var(--z-modal-backdrop)] flex",
          isBottomSheet ? "items-end justify-center" : "items-center justify-center"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-[var(--transition-base)]",
            isBottomSheet ? "bg-black/50" : "bg-black/40"
          )}
          onClick={handleBackdrop}
        />

        {/* Content */}
        <div
          ref={ref}
          className={cn(
            "relative z-[var(--z-modal)] w-full flex flex-col bg-bg-primary shadow-[var(--shadow-xl)]",
            // Shape
            isBottomSheet
              ? "rounded-t-[var(--radius-xl)] rounded-b-none max-h-[85vh]"
              : cn(
                  size === "fullscreen" ? "rounded-none" : "rounded-[var(--radius-xl)]",
                  sizeStyles[size],
                  maxHeightStyles[size],
                  "mx-4"
                ),
            // Animation
            isBottomSheet
              ? "animate-[sheetUp_0.3s_var(--ease-spring)]"
              : "animate-[modalIn_0.2s_ease-out]",
            className
          )}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {/* Bottom sheet handle */}
          {isBottomSheet && (
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="w-9 h-[5px] rounded-full bg-fill" />
            </div>
          )}

          {/* Header */}
          {(title || !isCentered) && !isBottomSheet && variant !== "alert" && variant !== "confirm" && (
            <div className={cn(
              "flex items-center justify-between flex-shrink-0",
              variant === "form"
                ? "px-6 py-4 border-b border-separator"
                : "px-6 pt-6 pb-0"
            )}>
              <div className="flex-1 min-w-0">
                {title && (
                  <h2 className="text-[length:var(--text-title3)] font-semibold text-label">
                    {title}
                  </h2>
                )}
                {description && !isCentered && (
                  <p className="text-[length:var(--text-footnote)] text-label-secondary mt-0.5">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="shrink-0 h-8 w-8 inline-flex items-center justify-center rounded-full bg-fill-tertiary hover:bg-fill-secondary text-label-secondary hover:text-label transition-colors ml-3"
                aria-label="닫기"
              >
                <IcClose size={13} weight="bold" />
              </button>
            </div>
          )}

          {/* Alert / Confirm centered header */}
          {isCentered && (
            <div className="flex flex-col items-center text-center px-6 pt-8 pb-2">
              {icon && (
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center mb-4",
                  isConfirm ? "bg-error/10" : "bg-primary/10"
                )}>
                  {icon}
                </div>
              )}
              {title && (
                <h2 className="text-[length:var(--text-title3)] font-semibold text-label">{title}</h2>
              )}
              {description && (
                <p className="text-[length:var(--text-body)] text-label-secondary mt-2 max-w-[320px]">{description}</p>
              )}
            </div>
          )}

          {/* Bottom sheet header */}
          {isBottomSheet && title && (
            <div className="flex items-center justify-between px-5 py-3 border-b border-separator">
              <h2 className="text-[length:var(--text-headline)] font-semibold text-label">{title}</h2>
              <button
                onClick={onClose}
                className="shrink-0 h-8 w-8 inline-flex items-center justify-center rounded-full bg-fill-tertiary hover:bg-fill-secondary text-label-secondary hover:text-label transition-colors"
                aria-label="닫기"
              >
                <IcClose size={13} weight="bold" />
              </button>
            </div>
          )}

          {/* Body */}
          <div className={cn(
            "flex-1 overflow-y-auto",
            isCentered ? "px-6 pt-2 pb-2" : "px-6 py-5",
            isBottomSheet && "px-5 py-4"
          )}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={cn(
              "flex-shrink-0 px-6 pb-6",
              variant === "form" && "px-6 py-4 border-t border-separator",
              isCentered && "pb-8",
              isBottomSheet && "px-5 pb-5"
            )}>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Modal.displayName = "Modal";

export { Modal, type ModalProps, type ModalVariant };
