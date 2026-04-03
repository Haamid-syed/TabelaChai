import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Marquee from './components/Marquee/Marquee'
import ArtisanSection from './components/ArtisanSection/ArtisanSection'
import RitualSection from './components/RitualSection/RitualSection'
import Footer from './components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
    useEffect(() => {
        // ─── Lenis smooth scroll ───────────────────────────────────
        const lenis = new Lenis({
            duration: 1.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.9,
            smoothTouch: false,
            touchMultiplier: 1.5,
            infinite: false,
        })

        // Single RAF via GSAP ticker — no duplicate loops
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        // Keep ScrollTrigger synced with Lenis position
        lenis.on('scroll', ScrollTrigger.update)

        return () => {
            lenis.destroy()
        }
    }, [])

    return (
        <>
            {/* Film grain overlay sits above everything */}
            <div className="grain-overlay" aria-hidden="true" />

            {/* Page components */}
            <Navbar />

            {/* Hero: void background, scroll-driven video */}
            <Hero />

            {/* Transparent marquee: blends with hero bottom → artisan top */}
            <Marquee />

            {/* Cream "artisan card" peels up from the void */}
            <ArtisanSection />

            {/* Charcoal ritual section with vertical timeline */}
            <RitualSection />

            {/* Footer: returns to void */}
            <Footer />
        </>
    )
}

export default App
