import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-emerald-500 text-white hover:bg-emerald-600",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-emerald-500 text-emerald-500 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  onClick?: () => void
}

function Badge({ className, variant, onClick, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className, onClick && "cursor-pointer ripple")}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    />
  )
}

export { Badge, badgeVariants }