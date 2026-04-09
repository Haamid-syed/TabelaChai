# ☕ Tabela Chai — The Premier Chai Experience

Tabela Chai is a premium, immersive web experience designed to showcase the ritual and craft of artisanal chai. Built with a "cinematic-first" approach, the site uses high-performance scroll-driven animations to bring the brewing process to life.

## ✨ The Vision
The design aesthetic is **"The Artisan's Workshop"** — warm, tactile, and cinematic. The experience is centered around a rich palette of **Pumpkin (#FD802E)** and **Charcoal (#233D4C)**, creating a sophisticated yet inviting digital space.

## 🚀 Key Technical Features

### 1. The Brewing Ritual (Scroll-Driven Video)
The core of the experience is a 60fps, canvas-based animation integrated into the Hero section.
- **Canvas Scrubbing:** 192 high-resolution image frames are scrubbed via GSAP ScrollTrigger.
- **Seamless Blending:** Vertical video frames are masked with CSS to blend into a pitch-black void, creating a "holographic" tactile feel.
- **Hardware Accelerated:** Optimized for smooth performance across modern browsers.

### 2. Immersive Interactions
- **Smooth Scroll:** Integrated with `Lenis` for a buttery-smooth navigating experience.
- **Parallax Layers:** Staggered spice elements and narrative markers that respond to user movement.
- **Editorial Typography:** A blend of *Playfair Display*, *Cormorant Garamond*, and *DM Sans* for a premium magazine feel.

## 🛠️ Tech Stack
- **Framework:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Animation:** [GSAP](https://greensock.com/gsap/) (ScrollTrigger)
- **Smooth Scrolling:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Vanilla CSS (Custom tokens)

## 📦 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

---

*Part of the Tabela Chai digital ecosystem.*
