import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import ArtisanSection from './components/ArtisanSection'
import RitualSection from './components/RitualSection'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        return () => {
            lenis.destroy()
            gsap.ticker.remove(lenis.raf)
        }
    }, [])

    return (
        <>
            <div className="grain-overlay" />
            <Navbar />
            <Hero />
            <Marquee />
            <ArtisanSection />
            <RitualSection />
            <Footer />
        </>
    )
}

export default App
