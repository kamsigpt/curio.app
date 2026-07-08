import {
  Code2,
  Palette,
  Briefcase,
  Megaphone,
  BarChart3,
  Camera,
  Music2,
  Brain,
  type LucideIcon,
} from "lucide-react";
import { Swoosh } from "./Swoosh";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "code-2": Code2,
  palette: Palette,
  briefcase: Briefcase,
  megaphone: Megaphone,
  "bar-chart-3": BarChart3,
  camera: Camera,
  "music-2": Music2,
  brain: Brain,
};

const GRADIENTS = [
  "from-mint-500 to-aqua-500",
  "from-ink to-mint-700",
  "from-aqua-500 to-mint-400",
  "from-mint-600 to-cool-700",
];

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function CourseThumb({
  seed,
  categoryIcon,
  imageUrl,
  alt,
  className,
}: {
  seed: string;
  categoryIcon: string;
  imageUrl?: string;
  alt?: string;
  className?: string;
}) {
  const Icon = ICONS[categoryIcon] ?? Code2;
  const gradient = GRADIENTS[hashString(seed) % GRADIENTS.length];
  const rotate = (hashString(seed + "r") % 40) - 20;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        gradient,
        className
      )}
    >
      {imageUrl && /^https?:\/\//i.test(imageUrl) && (
        <img
          src={imageUrl}
          alt={alt ?? ""}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {imageUrl && /^https?:\/\//i.test(imageUrl) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      )}
      {!imageUrl || !/^https?:\/\//i.test(imageUrl) ? (
        <>
          <Swoosh
            className="absolute -right-6 -bottom-8 h-40 w-40 text-white/15"
            style={{ transform: `rotate(${rotate}deg)` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="h-12 w-12 text-white/90" strokeWidth={1.6} />
          </div>
          <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-white/40" />
        </>
      ) : null}
    </div>
  );
}
