import { useEffect, useRef } from 'react';

interface OrbitItem {
  icon: React.ReactNode;
  angle: number;
  radius: number;
  speed: number;
  size: number;
}

interface MultiOrbitSemiCircleProps {
  items: OrbitItem[];
  size?: number;
}

export default function MultiOrbitSemiCircle({ items, size = 400 }: MultiOrbitSemiCircleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const anglesRef = useRef(items.map(() => 0));

  useEffect(() => {
    let running = true;

    const animate = () => {
      if (!running) return;

      const container = containerRef.current;
      if (!container) return;

      items.forEach((item, i) => {
        anglesRef.current[i] += item.speed * 0.005;
        const angle = anglesRef.current[i];

        // Semi-circle orbit (top half)
        const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const semiAngle = normalizedAngle <= Math.PI ? normalizedAngle : 2 * Math.PI - normalizedAngle;

        const x = Math.cos(semiAngle + Math.PI) * item.radius;
        const y = Math.sin(semiAngle) * -item.radius * 0.6;

        const el = container.children[i] as HTMLElement;
        if (el) {
          el.style.transform = `translate(${x}px, ${y}px)`;
          el.style.opacity = String(0.6 + 0.4 * Math.sin(semiAngle));
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      cancelAnimationFrame(animationRef.current);
    };
  }, [items]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size * 0.6 }}
    >
      {/* Semi-circle track */}
      <div
        className="absolute border border-white/[0.04] rounded-t-full"
        style={{
          width: size * 0.7,
          height: size * 0.35,
          bottom: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        className="absolute border border-white/[0.06] rounded-t-full"
        style={{
          width: size * 0.5,
          height: size * 0.25,
          bottom: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Center glow */}
      <div className="absolute w-16 h-16 rounded-full bg-neon/10 blur-2xl" />

      {/* Orbiting items */}
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center rounded-2xl card-glass transition-opacity duration-300"
          style={{
            width: item.size,
            height: item.size,
            left: '50%',
            top: '50%',
            marginLeft: -item.size / 2,
            marginTop: -item.size / 2,
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}
