"use client";

import { type HTMLAttributes, type ComponentType, forwardRef } from "react";
import { cn } from "@/lib/cn";
import {
  IcFilePdf, IcFileText, IcFileDoc, IcFileCsv,
  IcFileCode, IcMusic, IcVideo, IcFileZip,
  IcFileImage, IcFile, IcDownloadSimple, IcUpload,
} from "@/lib/icons";

type FileSize = "sm" | "md";
type FileCardVariant = "default" | "download" | "upload";

interface FileCardProps extends HTMLAttributes<HTMLDivElement> {
  fileName: string;
  fileType?: string;
  fileSize?: string;
  onDownload?: () => void;
  size?: FileSize;
  variant?: FileCardVariant;
}

const fileIconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  pdf: IcFilePdf,
  srt: IcFileText,
  vtt: IcFileText,
  docx: IcFileDoc,
  doc: IcFileDoc,
  csv: IcFileCsv,
  xlsx: IcFileCsv,
  json: IcFileCode,
  md: IcFileText,
  txt: IcFileText,
  mp3: IcMusic,
  wav: IcMusic,
  mp4: IcVideo,
  zip: IcFileZip,
  png: IcFileImage,
  jpg: IcFileImage,
  jpeg: IcFileImage,
  svg: IcFileImage,
  webp: IcFileImage,
};

const sizeStyles: Record<FileSize, string> = {
  sm: "h-11 px-3",
  md: "h-16 px-4",
};

const variantStyles: Record<FileCardVariant, string> = {
  default: "bg-bg-secondary border border-separator-opaque",
  download: "bg-bg-secondary border border-primary/30",
  upload: "bg-bg-secondary border border-dashed border-separator-opaque",
};

const FileCard = forwardRef<HTMLDivElement, FileCardProps>(
  ({ className, fileName, fileType, fileSize, onDownload, size = "sm", variant = "default", ...props }, ref) => {
    const ext = fileType || fileName.split(".").pop()?.toLowerCase() || "";
    const IconComponent = fileIconMap[ext] || IcFile;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-[var(--radius-md)]",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <span className={cn(
          "flex-shrink-0",
          variant === "download" ? "text-primary" : variant === "upload" ? "text-agent" : "text-label-secondary"
        )}>
          {variant === "download" ? (
            <IcDownloadSimple size={size === "sm" ? 20 : 24} />
          ) : variant === "upload" ? (
            <IcUpload size={size === "sm" ? 20 : 24} />
          ) : (
            <IconComponent size={size === "sm" ? 20 : 24} />
          )}
        </span>
        <div className="flex-1 min-w-0">
          <span className="block truncate text-[length:var(--text-subhead)] font-medium text-label">
            {fileName}
          </span>
          {fileSize && size === "md" && (
            <span className="text-[length:var(--text-caption1)] text-label-tertiary">
              {fileSize}
            </span>
          )}
        </div>
        {fileSize && size === "sm" && (
          <span className="flex-shrink-0 text-[length:var(--text-caption1)] text-label-tertiary">
            {fileSize}
          </span>
        )}
        {onDownload && (
          <button
            onClick={onDownload}
            className={cn(
              "flex-shrink-0 h-7 w-7 inline-flex items-center justify-center rounded-[var(--radius-xs)] transition-colors",
              variant === "download"
                ? "text-primary hover:bg-primary/10"
                : "text-label-secondary hover:bg-fill-tertiary"
            )}
            aria-label="다운로드"
          >
            <IcDownloadSimple size={14} />
          </button>
        )}
      </div>
    );
  }
);
FileCard.displayName = "FileCard";

export { FileCard, type FileCardProps, type FileCardVariant };
