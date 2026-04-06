"use client";

import { type HTMLAttributes, forwardRef, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import { IcMusic } from "@/lib/icons";

type AudioVariant = "compact" | "waveform";

interface AudioRendererProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  title?: string;
  variant?: AudioVariant;
}

const AudioRenderer = forwardRef<HTMLDivElement, AudioRendererProps>(
  ({ className, src, title, variant = "compact", ...props }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const onTime = () => setCurrentTime(audio.currentTime);
      const onMeta = () => setDuration(audio.duration);
      const onEnd = () => setPlaying(false);
      audio.addEventListener("timeupdate", onTime);
      audio.addEventListener("loadedmetadata", onMeta);
      audio.addEventListener("ended", onEnd);
      return () => {
        audio.removeEventListener("timeupdate", onTime);
        audio.removeEventListener("loadedmetadata", onMeta);
        audio.removeEventListener("ended", onEnd);
      };
    }, []);

    const togglePlay = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (audio.paused) {
        audio.play();
        setPlaying(true);
      } else {
        audio.pause();
        setPlaying(false);
      }
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * duration;
    };

    const fmt = (s: number) => {
      const m = Math.floor(s / 60);
      const sec = Math.floor(s % 60);
      return `${m}:${String(sec).padStart(2, "0")}`;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-md)] bg-bg-secondary border border-separator-opaque p-3",
          variant === "compact" ? "h-14" : "",
          className
        )}
        {...props}
      >
        <audio ref={audioRef} src={src} preload="metadata" />

        {/* Title */}
        {title && (
          <div className="text-[length:var(--text-footnote)] font-medium text-label mb-2 truncate">
            <IcMusic size={14} className="inline-block mr-1 -mt-0.5" />{title}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors"
            aria-label={playing ? "일시정지" : "재생"}
          >
            {playing ? (
              <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                <rect x="1" y="1" width="3.5" height="12" rx="1" />
                <rect x="7.5" y="1" width="3.5" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                <path d="M1 1L11 7L1 13V1Z" />
              </svg>
            )}
          </button>

          <span className="text-[length:var(--text-caption1)] text-label-secondary font-mono w-8 text-right flex-shrink-0">
            {fmt(currentTime)}
          </span>

          {/* Progress bar */}
          <div
            className="flex-1 h-1.5 bg-fill-tertiary rounded-full cursor-pointer relative"
            onClick={seek}
          >
            <div
              className="h-full bg-primary rounded-full transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-primary shadow-[var(--shadow-sm)] border-2 border-white"
              style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
            />
          </div>

          <span className="text-[length:var(--text-caption1)] text-label-tertiary font-mono w-8 flex-shrink-0">
            {fmt(duration)}
          </span>
        </div>

        {/* Waveform placeholder */}
        {variant === "waveform" && (
          <div className="mt-3 h-12 flex items-end gap-[2px] overflow-hidden">
            {Array.from({ length: 60 }).map((_, i) => {
              const h = Math.random() * 100;
              const isFilled = (i / 60) * 100 <= progress;
              return (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-full transition-colors",
                    isFilled ? "bg-primary" : "bg-fill-secondary"
                  )}
                  style={{ height: `${Math.max(h, 10)}%` }}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
AudioRenderer.displayName = "AudioRenderer";

export { AudioRenderer, type AudioRendererProps };
