import { cn } from "@/lib/utils";

const logoSrc = `${import.meta.env.BASE_URL}curio-logo.png`;

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-glass backdrop-blur-xl",
        className
      )}
      aria-hidden="true"
    >
      <img src={logoSrc} alt="" className="h-6 w-8 object-contain" />
    </span>
  );
}

export function Logo({ className, markOnly = false }: { className?: string; dark?: boolean; markOnly?: boolean }) {
  if (markOnly) {
    return <LogoMark className={className} />;
  }

  return (
    <span className={cn("inline-flex items-center select-none", className)}>
      <img src={logoSrc} alt="Curio" className="h-full w-auto object-contain" />
    </span>
  );
}
