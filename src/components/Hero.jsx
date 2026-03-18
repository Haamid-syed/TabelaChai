import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

export default function Hero() {
    const heroRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.to('.hero-title-char', {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.2
            })
                .to('.hero-image-wrapper', {
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power3.out'
                }, "-=0.8")
                .to('.hero-subtitle', {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                }, "-=1.2");

            // Parallax effect on scroll
            gsap.to('.hero-image-wrapper', {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            gsap.to('.hero-title-wrapper', {
                yPercent: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Split text into characters for staggered reveal
    const title = "TABELA".split('');

    return (
        <section className="hero-section" ref={heroRef}>
            <div className="container hero-container">
                <div className="hero-content">
                    <p className="hero-subtitle">
                        <span className="subtitle-mask text-pumpkin">THE PREMIER</span><br />
                        <span className="subtitle-mask">CHAI EXPERIENCE</span>
                    </p>
                </div>

                {/* Massive Text in Background */}
                <div className="hero-title-wrapper">
                    <h1 className="hero-title title-massive text-pumpkin">
                        {title.map((char, index) => (
                            <span key={index} className="hero-mask">
                                <span className="hero-title-char">{char}</span>
                            </span>
                        ))}
                    </h1>
                </div>

                {/* Cinematic Foreground Image */}
                <div className="hero-image-wrapper">
                    <div className="hero-image-container">
                        <img src="/assets/hero_kulhad.png" alt="A cinematic view of a traditional Chai Kulhad" className="hero-img-real" />
                    </div>
                </div>
            </div>
        </section>
    );
}
