"use client";

import { type HTMLAttributes, forwardRef, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type AspectRatio = "16:9" | "9:16" | "1:1";
type Controls = "minimal" | "full";

interface VideoRendererProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  poster?: string;
  aspectRatio?: AspectRatio;
  controls?: Controls;
  autoPlay?: boolean;
}

const aspectClasses: Record<AspectRatio, string> = {
  "16:9": "aspect-video",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
};

const VideoRenderer = forwardRef<HTMLDivElement, VideoRendererProps>(
  (
    {
      className,
      src,
      poster,
      aspectRatio = "16:9",
      controls = "full",
      autoPlay = false,
      ...props
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [showOverlay, setShowOverlay] = useState(!autoPlay);

    const togglePlay = () => {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) {
        video.play();
        setPlaying(true);
        setShowOverlay(false);
      } else {
        video.pause();
        setPlaying(false);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-[var(--radius-lg)] overflow-hidden bg-black",
          aspectClasses[aspectRatio],
          className
        )}
        {...props}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          controls={controls === "full"}
          playsInline
          onPlay={() => { setPlaying(true); setShowOverlay(false); }}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setShowOverlay(true); }}
          className="w-full h-full object-contain"
        />

        {/* Play overlay */}
        {showOverlay && !playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-[var(--transition-base)] hover:bg-black/40"
            aria-label="재생"
          >
            <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-[var(--shadow-lg)]">
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                <path d="M2 2L18 12L2 22V2Z" fill="#000" />
              </svg>
            </div>
          </button>
        )}
      </div>
    );
  }
);
VideoRenderer.displayName = "VideoRenderer";

export { VideoRenderer, type VideoRendererProps };
