import { motion } from "motion/react";

const SWOOSH_BODY =
  "M922,329 " +
  "L264,792 " +
  "C209,831 163,850 126,850 " +
  "c-42,0 -72,-24 -91,-73 " +
  "  -24,-63 -14,-164 28,-272 " +
  "  25,-63 56,-120 87,-175 " +
  "-7,19 -71,195 -1,278 " +
  "  14,17 33,25 57,25 " +
  "  19,0 41,-5 66,-16 " +
  "L922,329 Z";

const SWOOSH_EDGE =
  "M126,850 C163,850 209,831 264,792 L922,329";

interface Props {
  accentColor: string;
  shoeIndex: number;
}

export function SwooshBackground({ accentColor, shoeIndex }: Props) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMinYMax slice"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id={`swooshGrad-${shoeIndex}`}
          gradientUnits="userSpaceOnUse"
          x1="126"  y1="850"
          x2="922"  y2="329"
        >
          <stop offset="0%"   stopColor="#000000" stopOpacity="1"   />
          <stop offset="45%"  stopColor="#0d0d0d" stopOpacity="1"   />
          <stop offset="80%"  stopColor="#1f1f1f" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#2e2e2e" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient
          id={`innerShimmer-${shoeIndex}`}
          gradientUnits="userSpaceOnUse"
          x1="200" y1="830" x2="750" y2="410"
        >
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.00" />
          <stop offset="38%"  stopColor="#ffffff" stopOpacity="0.00" />
          <stop offset="52%"  stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="62%"  stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.00" />
        </linearGradient>

        <filter id="inkBlur">
          <feGaussianBlur stdDeviation="40" />
        </filter>

        <filter
          id={`rimGlow-${shoeIndex}`}
          x="-15%" y="-60%" width="130%" height="220%"
        >
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id={`fillReveal-${shoeIndex}`}>
          <motion.rect
            key={`cr-${shoeIndex}`}
            x="-100" width="1640"
            initial={{ y: 950, height: 0 }}
            animate={{ y: -50,  height: 1000 }}
            transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
          />
        </clipPath>
      </defs>

      <motion.ellipse
        key={`ink1-${shoeIndex}`}
        cx="140" cy="820" rx="220" ry="160"
        fill="#060a14" filter="url(#inkBlur)"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.92, scale: 1 }}
        transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
        style={{ transformOrigin: "140px 820px" }}
      />
      <motion.ellipse
        key={`ink2-${shoeIndex}`}
        cx="260" cy="870" rx="180" ry="110"
        fill="#080d1c" filter="url(#inkBlur)"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.78, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        style={{ transformOrigin: "260px 870px" }}
      />
      <motion.ellipse
        key={`ink3-${shoeIndex}`}
        cx="80" cy="895" rx="130" ry="80"
        fill="#050810" filter="url(#inkBlur)"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 0.65, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "80px 895px" }}
      />

      <g clipPath={`url(#fillReveal-${shoeIndex})`}>
        <path d={SWOOSH_BODY} fill={`url(#swooshGrad-${shoeIndex})`} />
        <path d={SWOOSH_BODY} fill={`url(#innerShimmer-${shoeIndex})`} />
      </g>

      <motion.path
        key={`rimGlow-${shoeIndex}`}
        d={SWOOSH_EDGE}
        fill="none"
        stroke="rgba(180,210,255,0.28)"
        strokeWidth="4"
        strokeLinecap="round"
        filter={`url(#rimGlow-${shoeIndex})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
      />
      <motion.path
        key={`rimSharp-${shoeIndex}`}
        d={SWOOSH_EDGE}
        fill="none"
        stroke="rgba(220,235,255,0.75)"
        strokeWidth="0.9"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
      />

      <motion.ellipse
        key={`floor-${shoeIndex}`}
        cx="720" cy="890" rx="280" ry="28"
        fill={accentColor} filter="url(#inkBlur)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ duration: 0.9, delay: 1.6 }}
      />
    </svg>
  );
}
