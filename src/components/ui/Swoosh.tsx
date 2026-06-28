import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export function Swoosh({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("pointer-events-none", className)}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M150 40C130 22 104 12 76 12C36 12 4 50 4 96C4 142 36 180 76 180C104 180 130 170 150 152"
        fill="none"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}
