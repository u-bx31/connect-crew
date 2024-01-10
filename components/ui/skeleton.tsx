import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-400 dark:bg-slate-800", className)}
      {...props}
    />
  )
}

export { Skeleton }
