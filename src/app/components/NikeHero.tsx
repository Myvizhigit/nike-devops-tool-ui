import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";
import { Search, ShoppingBag, Grid3X3, Star, Heart } from "lucide-react";
import { SwooshBackground } from "./SwooshBackground";
import { ShoeParticles } from "./ShoeParticles";
import { ToolPanel } from "./FuturisticToggles";

const shoes = [
  {
    id: 1,
    name: "React",
    nameAccent: "Infinity",
    subtitle: "Run Flyknit 3",
    price: 312,
    oldPrice: 380,
    tag: "NEW",
    rating: 4.8,
    reviews: 2341,
    image:
      "https://images.unsplash.com/photo-1548801133-da353ebb1d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwcmVkJTIwcnVubmluZyUyMHNob2UlMjBwcm9kdWN0fGVufDF8fHx8MTc3MzAzMjU3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#e63946", "#3a86ff", "#06d6a0", "#ff006e"],
    accentColor: "#e63946",
    bgGlow: "radial-gradient(ellipse at 65% 75%, rgba(8,10,18,0.72) 0%, transparent 60%)",
    bgLeft: "radial-gradient(ellipse at 15% 90%, rgba(6,8,16,0.55) 0%, transparent 50%)",
    desc: "Engineered for maximum cushioning and energy return on every long run.",
  },
  {
    id: 2,
    name: "Air",
    nameAccent: "Jordan 1",
    subtitle: "High OG Retro",
    price: 189,
    oldPrice: 220,
    tag: "HOT",
    rating: 4.9,
    reviews: 5802,
    image:
      "https://images.unsplash.com/photo-1656335219028-dcd6c0759162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwam9yZGFuJTIwc25lYWtlciUyMGJsYWNrJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3MzAzMzM0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#111111", "#e63946", "#ffd60a", "#4361ee"],
    accentColor: "#ffd60a",
    bgGlow: "radial-gradient(ellipse at 65% 75%, rgba(10,10,14,0.70) 0%, transparent 60%)",
    bgLeft: "radial-gradient(ellipse at 15% 90%, rgba(8,9,14,0.55) 0%, transparent 50%)",
    desc: "The icon. The original high-top that changed sneaker culture forever.",
  },
  {
    id: 3,
    name: "Air",
    nameAccent: "Force 1",
    subtitle: "Low Classic '07",
    price: 110,
    oldPrice: 130,
    tag: "CLASSIC",
    rating: 4.7,
    reviews: 9124,
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwc25lYWtlciUyMHdoaXRlJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NzMwMzI1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#ffffff", "#e8e8e8", "#cccccc", "#3a86ff"],
    accentColor: "#3a86ff",
    bgGlow: "radial-gradient(ellipse at 65% 75%, rgba(6,9,18,0.68) 0%, transparent 60%)",
    bgLeft: "radial-gradient(ellipse at 15% 90%, rgba(5,8,16,0.52) 0%, transparent 50%)",
    desc: "Timeless clean style. Versatile enough for the court or the street.",
  },
  {
    id: 4,
    name: "Air",
    nameAccent: "Max 270",
    subtitle: "Running / Lifestyle",
    price: 150,
    oldPrice: 175,
    tag: "SALE",
    rating: 4.6,
    reviews: 3678,
    image:
      "https://images.unsplash.com/photo-1568039971229-d18db37510fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwYWlyJTIwbWF4JTIwb3JhbmdlJTIweWVsbG93JTIwc25lYWtlcnxlbnwxfHx8fDE3NzMwMzMzNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#fb5607", "#ffbe0b", "#06d6a0", "#3a86ff"],
    accentColor: "#fb5607",
    bgGlow: "radial-gradient(ellipse at 65% 75%, rgba(9,8,10,0.72) 0%, transparent 60%)",
    bgLeft: "radial-gradient(ellipse at 15% 90%, rgba(7,7,10,0.55) 0%, transparent 50%)",
    desc: "Nike's tallest Air unit yet. Lightweight, bold and impossible to ignore.",
  },
];

const sizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
const NAV_LINKS = ["Men", "Women", "Kids", "Customise", "Collections", "Sale"];

export function NikeHero() {
  const [activeShoe, setActiveShoe] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeSize, setActiveSize] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [particleTrigger, setParticleTrigger] = useState(0);
  const [shoeReady, setShoeReady] = useState(false);
  const floatControls = useAnimation();

  const shoe = shoes[activeShoe];

  useEffect(() => {
    setShoeReady(false);
    setActiveColor(0);
    setActiveSize(null);

    const t = setTimeout(async () => {
      setShoeReady(true);
      setParticleTrigger((n) => n + 1);
      await new Promise((r) => setTimeout(r, 880));
      floatControls.start({
        y: [0, -16, 0],
        transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
      });
    }, 1550);

    return () => clearTimeout(t);
  }, [activeShoe]);

  const handleBuy = () => {
    if (activeSize === null) return;
    setCartCount((c) => c + 1);
  };

  const toggleWishlist = (id: number) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  return (
    <div
      className="relative w-full h-screen min-h-[700px] select-none overflow-hidden"
      style={{ background: "#282828" }}
    >
      <SwooshBackground accentColor={shoe.accentColor} shoeIndex={activeShoe} />

      <AnimatePresence mode="wait">
        <motion.div
          key={`glows-${activeShoe}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="absolute inset-0" style={{ background: shoe.bgGlow }} />
          <div className="absolute inset-0" style={{ background: shoe.bgLeft }} />
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(130px, 21vw, 300px)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: "rgba(255,255,255,0.035)",
          whiteSpace: "nowrap",
          userSelect: "none",
          fontFamily: "'Barlow Condensed', Impact, Arial Black, sans-serif",
        }}
      >
        NIKE
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 flex items-center justify-between px-8 pt-6 pb-3">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <svg viewBox="2.5 8.2 19 7.2" className="w-28 h-10" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="navSwooshFill" gradientUnits="userSpaceOnUse" x1="3" y1="15" x2="21" y2="8.7">
                <stop offset="0%"   stopColor="#000000" stopOpacity="1"   />
                <stop offset="60%"  stopColor="#111111" stopOpacity="1"   />
                <stop offset="100%" stopColor="#2e2e2e" stopOpacity="0.65"/>
              </linearGradient>
              <linearGradient id="navSwooshShimmer" gradientUnits="userSpaceOnUse" x1="6" y1="14.5" x2="16" y2="9.5">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.00" />
                <stop offset="35%"  stopColor="#ffffff" stopOpacity="0.00" />
                <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.22" />
                <stop offset="65%"  stopColor="#ffffff" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.00" />
              </linearGradient>
              <filter id="navRimGlow" x="-10%" y="-40%" width="120%" height="180%">
                <feGaussianBlur stdDeviation="0.18" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              fillRule="evenodd" clipRule="evenodd"
              d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
              fill="url(#navSwooshFill)"
            />
            <path
              fillRule="evenodd" clipRule="evenodd"
              d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
              fill="url(#navSwooshShimmer)"
            />
            <path
              fillRule="evenodd" clipRule="evenodd"
              d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
              fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.15" filter="url(#navRimGlow)"
            />
            <path
              fillRule="evenodd" clipRule="evenodd"
              d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
              fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="0.06"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="hidden lg:flex items-center gap-8"
        >
          {NAV_LINKS.map((link, i) => (
            <button
              key={link}
              className="relative tracking-wide transition-colors group text-[15px]"
              style={{ color: i === 5 ? shoe.accentColor : "rgba(255,255,255,0.65)", fontWeight: i === 5 ? 700 : 400 }}
            >
              {link}
              <span
                className="absolute -bottom-1 left-0 h-px transition-all duration-300 group-hover:w-full w-0"
                style={{ background: shoe.accentColor }}
              />
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-4"
        >
          <div className="hidden md:flex items-center gap-2 rounded-full px-4 py-2 border border-white/10" style={{ background: "rgba(255,255,255,0.06)" }}>
            <Search className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white/35 text-xs tracking-wide">Search</span>
          </div>
          <button className="relative text-white/60 hover:text-white transition-colors" onClick={() => toggleWishlist(shoe.id)}>
            <Heart className="w-5 h-5" fill={wishlist.includes(shoe.id) ? shoe.accentColor : "none"} stroke={wishlist.includes(shoe.id) ? shoe.accentColor : "currentColor"} />
          </button>
          <button className="relative text-white/60 hover:text-white transition-colors" onClick={handleBuy}>
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                  style={{ background: shoe.accentColor, fontSize: "9px", fontWeight: 700 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button className="text-white/60 hover:text-white transition-colors">
            <Grid3X3 className="w-5 h-5" style={{ color: shoe.accentColor }} />
          </button>

          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            {shoes.map((s, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveShoe(i)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.85 }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeShoe === i ? "22px" : "6px",
                  height: "6px",
                  background: activeShoe === i ? shoe.accentColor : "rgba(255,255,255,0.22)",
                  boxShadow: activeShoe === i ? `0 0 8px ${shoe.accentColor}` : "none",
                }}
              />
            ))}
          </div>
        </motion.div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex h-[calc(100%-72px)]">
        {/* LEFT: Product info */}
        <div className="flex flex-col justify-center pl-8 md:pl-14 w-[250px] md:w-[300px] shrink-0 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${activeShoe}`}
              initial={{ opacity: 0, x: -36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.55, delay: 1.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 }}
                className="inline-flex items-center px-3 py-1 rounded-full mb-3 text-xs tracking-widest"
                style={{ background: `${shoe.accentColor}22`, color: shoe.accentColor, border: `1px solid ${shoe.accentColor}44`, fontWeight: 700 }}
              >
                {shoe.tag}
              </motion.div>

              <h1
                style={{
                  fontSize: "clamp(30px, 4.2vw, 54px)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  fontFamily: "'Barlow Condensed', Impact, Arial Black, sans-serif",
                  marginBottom: "4px",
                }}
              >
                <span className="text-white">{shoe.name} </span>
                <span style={{ color: shoe.accentColor }}>{shoe.nameAccent}</span>
              </h1>
              <p className="text-white/50 text-xs mb-3 tracking-wider">{shoe.subtitle}</p>
              <p className="text-white/40 text-xs mb-4 leading-relaxed" style={{ maxWidth: "200px" }}>{shoe.desc}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3" fill={s <= Math.round(shoe.rating) ? shoe.accentColor : "none"} stroke={shoe.accentColor} />
                  ))}
                </div>
                <span className="text-white/50 text-xs">{shoe.rating} ({shoe.reviews.toLocaleString()})</span>
              </div>

              <div className="mb-4">
                <p className="text-white/40 text-xs mb-2 tracking-widest uppercase">Colorway</p>
                <div className="flex gap-2">
                  {shoe.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveColor(i)}
                      className="rounded-full transition-all duration-200"
                      style={{
                        width: "18px", height: "18px",
                        background: color,
                        boxShadow: activeColor === i ? `0 0 0 2px rgba(255,255,255,0.15), 0 0 0 4px ${color}` : "none",
                        transform: activeColor === i ? "scale(1.25)" : "scale(1)",
                        border: color === "#ffffff" || color === "#e8e8e8" ? "1px solid rgba(255,255,255,0.2)" : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER: Hero shoe */}
        <div className="flex-1 relative flex items-center justify-center">
          <ShoeParticles accentColor={shoe.accentColor} trigger={particleTrigger} />

          <AnimatePresence mode="wait">
            {shoeReady && (
              <motion.div
                key={`float-${activeShoe}`}
                animate={floatControls}
                className="relative z-10"
                style={{ width: "min(480px, 42vw)", height: "min(360px, 33vw)" }}
              >
                <motion.div
                  key={`entrance-${activeShoe}`}
                  initial={{ opacity: 0, y: -280, x: 130, rotate: -35, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 80, scale: 0.85, rotate: 5 }}
                  transition={{ duration: 0.88, ease: [0.34, 1.4, 0.64, 1] }}
                  className="w-full h-full"
                >
                  <img
                    src={shoe.image}
                    alt={`${shoe.name} ${shoe.nameAccent}`}
                    className="w-full h-full object-contain"
                    style={{
                      filter: `drop-shadow(0 40px 70px ${shoe.accentColor}99) drop-shadow(-10px 20px 25px rgba(0,0,0,0.85))`,
                      mixBlendMode: "screen",
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 0.65, scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full blur-3xl"
                  style={{ width: "85%", height: "24px", background: shoe.accentColor, transformOrigin: "center" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Tool Arsenal */}
        <div className="flex flex-col items-center justify-center shrink-0 pr-0 md:pr-4 overflow-visible" style={{ minWidth: 230 }}>
          <ToolPanel />
        </div>
      </div>
    </div>
  );
}
