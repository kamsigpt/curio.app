import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type AnimationVariant = "fadeUp" | "popIn" | "liquidGlass" | "slideLeft" | "slideRight" | "scaleIn";

interface RevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  id?: string;
}

const initialStyles: Record<AnimationVariant, React.CSSProperties> = {
  fadeUp: { opacity: 0, transform: "translateY(16px)" },
  popIn: { opacity: 0, transform: "scale(0.95)" },
  liquidGlass: { opacity: 0, transform: "scale(0.97)" },
  slideLeft: { opacity: 0, transform: "translateX(-20px)" },
  slideRight: { opacity: 0, transform: "translateX(20px)" },
  scaleIn: { opacity: 0, transform: "scale(0.92)" },
};

const visibleStyles: Record<AnimationVariant, React.CSSProperties> = {
  fadeUp: { opacity: 1, transform: "translateY(0)" },
  popIn: { opacity: 1, transform: "scale(1)" },
  liquidGlass: { opacity: 1, transform: "scale(1)" },
  slideLeft: { opacity: 1, transform: "translateX(0)" },
  slideRight: { opacity: 1, transform: "translateX(0)" },
  scaleIn: { opacity: 1, transform: "scale(1)" },
};

export function Reveal({
  children,
  variant = "fadeUp",
  className,
  delay = 0,
  duration = 600,
  once = true,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={{
        ...(visible ? visibleStyles[variant] : initialStyles[variant]),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
