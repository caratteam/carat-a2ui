import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "text" | "card" | "sceneCard" | "image" | "circle";
type SkeletonSize = "sm" | "md" | "lg";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  width?: string | number;
  height?: string | number;
  size?: SkeletonSize;
}

const shimmerBase =
  "bg-gradient-to-r from-fill-tertiary via-fill-secondary to-fill-tertiary bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]";

const textSizeMap: Record<SkeletonSize, number> = { sm: 12, md: 14, lg: 20 };
const circleSizeMap: Record<SkeletonSize, number> = { sm: 32, md: 44, lg: 56 };
const cardHeightMap: Record<SkeletonSize, string> = { sm: "h-20", md: "h-32", lg: "h-48" };

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "text", width, height, size = "md", style, ...props }, ref) => {
    const variantContent: Record<Variant, React.ReactNode> = {
      text: null,
      circle: null,
      card: (
        <div className="flex flex-col gap-3 p-[var(--space-4)]">
          <div className={cn("h-10 w-10 rounded-[var(--radius-md)]", shimmerBase)} />
          <div className={cn("h-4 w-3/4 rounded-[var(--radius-xs)]", shimmerBase)} />
          <div className={cn("h-3 w-1/2 rounded-[var(--radius-xs)]", shimmerBase)} />
        </div>
      ),
      sceneCard: (
        <div className="flex flex-col gap-2.5 p-[var(--space-4)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn("h-6 w-6 rounded-full", shimmerBase)} />
              <div className={cn("h-3 w-16 rounded-[var(--radius-xs)]", shimmerBase)} />
            </div>
            <div className={cn("h-3 w-20 rounded-[var(--radius-xs)]", shimmerBase)} />
          </div>
          <div className={cn("h-3 w-full rounded-[var(--radius-xs)]", shimmerBase)} />
          <div className={cn("h-3 w-5/6 rounded-[var(--radius-xs)]", shimmerBase)} />
          <div className={cn("h-3 w-2/3 rounded-[var(--radius-xs)]", shimmerBase)} />
        </div>
      ),
      image: null,
    };

    if (variant === "circle") {
      const circleSize = circleSizeMap[size];
      return (
        <div
          ref={ref}
          className={cn("rounded-full", shimmerBase, className)}
          style={{ width: width ?? circleSize, height: height ?? circleSize, ...style }}
          {...props}
        />
      );
    }

    if (variant === "text") {
      return (
        <div
          ref={ref}
          className={cn("rounded-[var(--radius-xs)]", shimmerBase, className)}
          style={{ width: width ?? "100%", height: height ?? textSizeMap[size], ...style }}
          {...props}
        />
      );
    }

    if (variant === "image") {
      return (
        <div
          ref={ref}
          className={cn("aspect-video rounded-[var(--radius-md)]", shimmerBase, className)}
          style={{ width: width ?? "100%", ...style }}
          {...props}
        />
      );
    }

    // card, sceneCard
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)] border border-separator-opaque overflow-hidden",
          variant === "card" ? cardHeightMap[size] : undefined,
          className
        )}
        style={style}
        {...props}
      >
        {variantContent[variant]}
      </div>
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Skeleton, type SkeletonProps };
