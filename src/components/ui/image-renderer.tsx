"use client";

import { type HTMLAttributes, type ReactNode, forwardRef, useState } from "react";
import { cn } from "@/lib/cn";
import { IcHeart, IcChatDots, IcArrowUpRight, IcDownloadSimple } from "@/lib/icons";

type AspectRatio = "16:9" | "9:16" | "1:1" | "4:3" | "auto";
type Frame = "none" | "youtube" | "shorts" | "instagram";
type ImageState = "loading" | "loaded" | "error";

interface ImageMeta {
  width?: number;
  height?: number;
  format?: string;
  size?: string;
}

interface ImageRendererProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  aspectRatio?: AspectRatio;
  frame?: Frame;
  meta?: ImageMeta;
  onDownload?: () => void;
}

const aspectClasses: Record<AspectRatio, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
  "4:3": "aspect-[4/3]",
  auto: "",
};

const ImageRenderer = forwardRef<HTMLDivElement, ImageRendererProps>(
  (
    {
      className,
      src,
      alt = "",
      aspectRatio = "auto",
      frame = "none",
      meta,
      onDownload,
      ...props
    },
    ref
  ) => {
    const [state, setState] = useState<ImageState>("loading");

    return (
      <div
        ref={ref}
        className={cn("rounded-[var(--radius-md)] overflow-hidden", className)}
        {...props}
      >
        {/* Image container */}
        <div className={cn("relative bg-fill-tertiary overflow-hidden", aspectClasses[aspectRatio])}>
          {state === "loading" && (
            <div className="absolute inset-0 bg-gradient-to-r from-fill-tertiary via-fill-secondary to-fill-tertiary bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
          )}
          <img
            src={src}
            alt={alt}
            onLoad={() => setState("loaded")}
            onError={() => setState("error")}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-[var(--transition-slow)]",
              state === "loaded" ? "opacity-100" : "opacity-0"
            )}
          />
          {state === "error" && (
            <div className="absolute inset-0 flex items-center justify-center text-label-tertiary text-[length:var(--text-footnote)]">
              이미지를 불러올 수 없습니다
            </div>
          )}

          {/* YouTube frame overlay */}
          {frame === "youtube" && state === "loaded" && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-label-quaternary">
              <div className="h-full w-1/3 bg-error rounded-r" />
            </div>
          )}

          {/* Shorts frame overlay */}
          {frame === "shorts" && state === "loaded" && (
            <div className="absolute right-3 bottom-12 flex flex-col items-center gap-4 text-white">
              {([
                <IcHeart key="heart" size={24} weight="fill" />,
                <IcChatDots key="chat" size={24} />,
                <IcArrowUpRight key="arrow" size={24} />,
              ] as ReactNode[]).map((icon, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  {icon}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Meta bar */}
        {(meta || onDownload) && (
          <div className="flex items-center justify-between px-3 py-2 bg-bg-secondary border-t border-separator">
            <span className="text-[length:var(--text-caption1)] text-label-tertiary">
              {meta?.width && meta?.height && `${meta.width} × ${meta.height}`}
              {meta?.format && ` · ${meta.format}`}
              {meta?.size && ` · ${meta.size}`}
            </span>
            <div className="flex items-center gap-1">
              {onDownload && (
                <button
                  onClick={onDownload}
                  className="h-7 px-2.5 inline-flex items-center gap-1 rounded-[var(--radius-xs)] text-[length:var(--text-caption1)] font-medium text-label-secondary hover:bg-fill-tertiary transition-colors"
                >
                  <IcDownloadSimple size={14} className="inline-block mr-0.5" /> 다운로드
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
ImageRenderer.displayName = "ImageRenderer";

export { ImageRenderer, type ImageRendererProps };
