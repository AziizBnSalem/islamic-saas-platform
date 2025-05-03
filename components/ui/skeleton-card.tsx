import { cn } from "@/lib/utils"

interface SkeletonCardProps {
  className?: string
  hasImage?: boolean
  lines?: number
}

export function SkeletonCard({ className, hasImage = true, lines = 3 }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white p-4 shadow-sm animate-pulse overflow-hidden",
        className,
      )}
    >
      {hasImage && (
        <div className="h-48 w-full rounded-md bg-gray-200 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>
      )}
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-4 relative overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn("h-4 bg-gray-200 rounded mb-2 relative overflow-hidden", i === lines - 1 ? "w-1/2" : "w-full")}
        >
          <div className="absolute inset-0 shimmer"></div>
        </div>
      ))}
    </div>
  )
}
