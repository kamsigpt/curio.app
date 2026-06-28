import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = "sm",
  showValue = true,
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
  showValue?: boolean;
}) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.4 && value - full < 0.9;
  const starSize = size === "sm" ? 14 : 18;

  return (
    <div className="flex items-center gap-1">
      {showValue && (
        <span className={cn("font-semibold text-amber-600", size === "sm" ? "text-xs" : "text-sm")}>
          {value.toFixed(1)}
        </span>
      )}
      <div className="flex items-center text-amber-500">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full) return <Star key={i} size={starSize} fill="currentColor" strokeWidth={0} />;
          if (i === full && hasHalf)
            return <StarHalf key={i} size={starSize} fill="currentColor" strokeWidth={0} />;
          return <Star key={i} size={starSize} className="text-cool-400" fill="none" />;
        })}
      </div>
      {count !== undefined && (
        <span className={cn("text-cool", size === "sm" ? "text-xs" : "text-sm")}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
