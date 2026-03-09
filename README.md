# Nike DevOps Tool UI

A dark-themed (`#282828`), Nike-inspired internal developer/ops tool UI with cinematic animations.

## Tools
| Tool | Color | Description |
|------|-------|-------------|
| **Autobot** | Purple `#a855f7` | Fully automatic end-to-end pipeline |
| **PDP + ASM** | Cyan `#06b6d4` | Both PDP & Assembler services in one screen |
| **PDPgenerator** | Blue `#3b82f6` | Bulk publish PDP only |
| **Assembler** | Amber `#f59e0b` | Bulk build Assembler only |

## Stack
- **React 18** + **TypeScript**
- **Tailwind CSS v4**
- **Motion** (formerly Framer Motion) for animations
- **Vite** for build tooling
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev
```

## Features
- ✅ Authentic Nike swoosh SVG background with ink-splash reveal animation
- ✅ 3D isometric animated tool icons (robot, dual-monitor, page-stack, gear+wrench)
- ✅ Floating half-arc `ToolPanel` — no card boxes, pure icon + glowing label
- ✅ Mouse-tracked 3D tilt on every icon
- ✅ Concentric spinning rings + travelling dot on active spoke
- ✅ Shoe product carousel with particle burst entrance
- ✅ Responsive dark UI with Barlow Condensed typography

## Project Structure

```
src/
  app/
    App.tsx                      # Root component
    components/
      NikeHero.tsx               # Main hero layout (navbar + shoe + tool panel)
      SwooshBackground.tsx       # Animated Nike swoosh SVG
      ShoeParticles.tsx          # Particle burst on shoe change
      FuturisticToggles.tsx      # All 4 tool icons + ToolPanel export
      figma/
        ImageWithFallback.tsx    # Safe image with fallback
  styles/
    fonts.css     # Barlow Condensed import
    index.css     # Entry CSS
    tailwind.css  # Tailwind v4 source
    theme.css     # CSS custom properties
```
