import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "mint" | "ink" | "amber" | "outline";

const toneClasses: Record<Tone, string> = {
  mint: "bg-mint-100 text-mint-800",
  ink: "bg-ink text-white",
  amber: "bg-amber-100 text-amber-800",
  outline: "border border-cool-100 text-cool-700 bg-white",
};

export function Badge({
  children,
  tone = "outline",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
