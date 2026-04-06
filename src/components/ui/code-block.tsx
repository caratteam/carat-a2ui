"use client";

import { type HTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/cn";
import { IcCopy, IcCheck } from "@/lib/icons";

type CodeBlockSize = "sm" | "md";

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: number;
  size?: CodeBlockSize;
  onCopy?: () => void;
}

const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      code,
      language = "",
      showLineNumbers = false,
      maxHeight,
      size = "md",
      onCopy,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.split("\n");
    const resolvedMaxHeight = maxHeight ?? (size === "sm" ? 160 : 400);

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-md)] bg-fill-tertiary border border-separator overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between border-b border-separator",
            size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5"
          )}
        >
          <span
            className={cn(
              "text-label-tertiary font-medium",
              size === "sm"
                ? "text-[length:var(--text-caption2)]"
                : "text-[length:var(--text-caption1)]"
            )}
          >
            {language || "code"}
          </span>
          <button
            onClick={handleCopy}
            className={cn(
              "inline-flex items-center gap-1 rounded-[var(--radius-xs)] text-label-secondary hover:bg-fill-secondary transition-colors duration-[var(--transition-fast)]",
              size === "sm"
                ? "h-5 px-1.5 text-[length:var(--text-caption2)]"
                : "h-6 px-2 text-[length:var(--text-caption1)]"
            )}
          >
            {copied ? (
              <>
                <IcCheck size={size === "sm" ? 10 : 12} />
                <span>복사됨</span>
              </>
            ) : (
              <>
                <IcCopy size={size === "sm" ? 10 : 12} />
                <span>복사</span>
              </>
            )}
          </button>
        </div>

        {/* Code content */}
        <div
          className={cn(
            "overflow-auto",
            size === "sm" ? "py-3 px-3" : "p-3"
          )}
          style={{ maxHeight: resolvedMaxHeight }}
        >
          <pre
            className={cn(
              "leading-[var(--leading-relaxed)] font-mono text-label",
              size === "sm"
                ? "text-[length:var(--text-caption2)]"
                : "text-[length:var(--text-footnote)]"
            )}
          >
            {showLineNumbers ? (
              <table className="border-collapse">
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i}>
                      <td className="pr-4 text-right text-label-tertiary select-none align-top w-1">
                        {i + 1}
                      </td>
                      <td className="whitespace-pre">{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <code className="whitespace-pre">{code}</code>
            )}
          </pre>
        </div>
      </div>
    );
  }
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock, type CodeBlockProps, type CodeBlockSize };
