import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
  delay: number;
  shape: "circle" | "star" | "ring";
}

interface Props {
  accentColor: string;
  trigger: number;
}

function generateParticles(accentColor: string): Particle[] {
  const colors = [accentColor, "#ffffff", "#ffffff", accentColor, "#ffeccc", accentColor];
  const count = 22;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i / count) * 360 + Math.random() * 18 - 9,
    distance: 90 + Math.random() * 130,
    size: 3 + Math.random() * 7,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.12,
    shape: (["circle", "star", "ring"] as const)[Math.floor(Math.random() * 3)],
  }));
}

export function ShoeParticles({ accentColor, trigger }: Props) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger === 0) return;
    setParticles(generateParticles(accentColor));
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!visible || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;

        return (
          <motion.div
            key={`${trigger}-${p.id}`}
            className="absolute"
            style={{
              width: p.size,
              height: p.size,
              borderRadius: p.shape === "ring" ? "50%" : p.shape === "circle" ? "50%" : "2px",
              background: p.shape === "ring" ? "transparent" : p.color,
              border: p.shape === "ring" ? `2px solid ${p.color}` : "none",
              transformOrigin: "center",
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              x: tx,
              y: ty,
              opacity: 0,
              scale: p.shape === "star" ? [1, 1.4, 0] : [1, 0.6, 0],
              rotate: p.angle * 2,
            }}
            transition={{
              duration: 0.9 + Math.random() * 0.4,
              delay: p.delay,
              ease: [0.2, 0.8, 0.4, 1],
            }}
          />
        );
      })}

      <motion.div
        key={`flash-${trigger}`}
        className="absolute rounded-full"
        style={{
          width: 80,
          height: 80,
          background: `radial-gradient(circle, ${accentColor}88 0%, transparent 70%)`,
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
    </div>
  );
}
