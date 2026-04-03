# Tabela Chai Project Handover

## Project Overview
Tabela Chai is a premium, immersive web experience built with React, Vite, and GSAP. The design aesthetic is "The Artisan's Workshop" — warm, tactile, and cinematic, using a palette of Pumpkin (#FD802E) and Charcoal (#233D4C).

## Key Technical Achievements

### 1. High-Performance Scroll Video (The "Brewing Ritual")
The core of the experience is a 60fps, canvas-based scroll-driven animation integrated directly into the `Hero.jsx` component.
- **Workflow:** AI Video (8s) -> 192 image frames (`/public/assets/frames/`) -> Canvas scrubbing.
- **Mechanism:** `ScrollTrigger` pins the Hero section for 4x screen height while the user "scrub" pours the chai using their scroll wheel.
- **Visuals:** Uses a 9:16 vertical video masked with CSS (`mask-image`) to blend seamlessly into a pitch-black background void, preventing any "box" edges.

### 2. Design System & Assets
- **Color Palette:** CSS variables defined in `src/index.css`.
- **Typography:** Display fonts ('Playfair Display') for an editorial look.
- **AI Generated Assets:**
    - `artisan_scatter.png`: High-res spices used in the ArtisanSection.
    - `chai_video.mp4`: Source video for the scroll animation.
    - Path to frames: `/public/assets/frames/frame_0001.jpg` to `frame_0192.jpg`.

### 3. Component Architecture
- `App.jsx`: Global Lenis smooth-scroll setup and section layout.
- `Hero.jsx`: The video-scroll engine, title parallax, and narrative text markers ("01. THE BASE", etc.).
- `Marquee.jsx`: High-impact looping text divider.
- `ArtisanSection.jsx`: CSS Grid with staggered parallax spice elements.
- `RitualSection.jsx`: (Deprecated in favor of Hero Video but still in codebase) Horizontal scroll logic.

## Skills & Capabilities Installed
The following skills were activated and installed in this workspace for advanced prompting:
- `video-prompting-guide`: (Local) Framework for image sequence animations.
- `nano-banana-veo-workflow`: (Local) Pipeline for high-fidelity Start/End frame video generation.
- `nano-banana-prompt`: (Official) Advanced JSON-structured image prompting.
- `ai-video-prompting`: (Official) Professional Veo 3.1 & Runway workflow guide.

## Current Build Status
- **Build:** `npm run build` is passing with 0 errors.
- **Environment:** Vite dev server is stable.

## Next Steps for the Next Agent
- **Mobile Optimization:** Further refine the mask on ultra-small screens.
- **Micro-Interactions:** Add hover sound effects to the Navbar to match the "Tactile" goal.
- **Content Expansion:** Build out the "Shop" or "Our Story" sub-pages using the same established visual language.
