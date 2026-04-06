"use client";

import { type HTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/cn";
import { CodeBlock } from "./code-block";
import { IcDesktop, IcTablet, IcMobile } from "@/lib/icons";

type ViewMode = "preview" | "code" | "split";
type DeviceFrame = "desktop" | "mobile" | "tablet";

interface HTMLRendererProps extends HTMLAttributes<HTMLDivElement> {
  html: string;
  viewMode?: ViewMode;
  deviceFrame?: DeviceFrame;
  defaultHeight?: number;
}

const deviceWidths: Record<DeviceFrame, string> = {
  desktop: "100%",
  mobile: "375px",
  tablet: "768px",
};

const deviceIcons: Record<DeviceFrame, React.ReactNode> = {
  desktop: <IcDesktop size={14} />,
  tablet: <IcTablet size={14} />,
  mobile: <IcMobile size={14} />,
};

const HTMLRenderer = forwardRef<HTMLDivElement, HTMLRendererProps>(
  (
    {
      className,
      html,
      viewMode: initialViewMode = "preview",
      deviceFrame: initialDevice = "desktop",
      defaultHeight = 480,
      ...props
    },
    ref
  ) => {
    const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
    const [deviceFrame, setDeviceFrame] = useState<DeviceFrame>(initialDevice);

    const renderPreview = () => (
      <div className="flex justify-center bg-fill-tertiary p-4 overflow-auto" style={{ minHeight: defaultHeight }}>
        <iframe
          srcDoc={html}
          sandbox="allow-scripts"
          className="bg-white rounded-[var(--radius-sm)] border border-separator-opaque"
          style={{
            width: deviceWidths[deviceFrame],
            height: defaultHeight,
            maxWidth: "100%",
          }}
          title="HTML Preview"
        />
      </div>
    );

    const renderCode = () => (
      <CodeBlock code={html} language="html" maxHeight={defaultHeight} showLineNumbers />
    );

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)] border border-separator-opaque overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-separator bg-bg-secondary">
          <div className="flex items-center gap-1">
            {(["preview", "code", "split"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "h-7 px-2.5 rounded-[var(--radius-xs)] text-[length:var(--text-caption1)] font-medium transition-colors",
                  viewMode === mode
                    ? "bg-fill-tertiary text-label"
                    : "text-label-tertiary hover:text-label-secondary"
                )}
              >
                {mode === "preview" ? "미리보기" : mode === "code" ? "</> 코드" : "분할"}
              </button>
            ))}
          </div>

          {viewMode !== "code" && (
            <div className="flex items-center gap-1">
              {(["desktop", "tablet", "mobile"] as DeviceFrame[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDeviceFrame(d)}
                  className={cn(
                    "h-7 w-7 inline-flex items-center justify-center rounded-[var(--radius-xs)] transition-colors",
                    deviceFrame === d
                      ? "bg-fill-tertiary text-label"
                      : "text-label-tertiary hover:text-label-secondary"
                  )}
                >
                  {deviceIcons[d]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        {viewMode === "preview" && renderPreview()}
        {viewMode === "code" && renderCode()}
        {viewMode === "split" && (
          <div className="flex divide-x divide-separator">
            <div className="w-1/2 overflow-auto">{renderCode()}</div>
            <div className="w-1/2">{renderPreview()}</div>
          </div>
        )}
      </div>
    );
  }
);
HTMLRenderer.displayName = "HTMLRenderer";

export { HTMLRenderer, type HTMLRendererProps };
