import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ArtisanSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ArtisanSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal eyebrow
            gsap.to('.artisan-eyebrow', {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.artisan-eyebrow',
                    start: 'top 88%',
                }
            });

            // Stagger text lines
            gsap.to('.artisan-text-line', {
                opacity: 1,
                y: 0,
                stagger: 0.12,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.artisan-content',
                    start: 'top 80%',
                }
            });

            // Stats strip reveal
            gsap.to('.artisan-stats', {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.artisan-stats',
                    start: 'top 92%',
                }
            });

            // Parallax scatter elements — subtle, not excessive
            const items = gsap.utils.toArray('.scatter-item');
            items.forEach((el, i) => {
                const speed = parseFloat(el.dataset.speed || 0.8);
                const dir   = i % 2 === 0 ? 1 : -1;
                gsap.to(el, {
                    y: () => -60 * speed,
                    rotation: () => dir * 8 * speed,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="artisan-section" ref={sectionRef} id="artisan">
            <div className="container artisan-container">
                {/* ─── Left: Content ─── */}
                <div className="artisan-content">
                    <div className="artisan-eyebrow">
                        <span className="artisan-eyebrow-rule" />
                        <span>The Artisan's Workshop</span>
                    </div>

                    <h2 className="artisan-title">
                        <span className="artisan-text-line">THE</span>
                        <span className="artisan-text-line artisan-title-accent">Craft</span>
                        <span className="artisan-text-line">BEHIND</span>
                        <span className="artisan-text-line">EVERY CUP</span>
                    </h2>

                    <p className="artisan-body">
                        <span className="artisan-text-line">Every blend is a canvas. We source</span>
                        <span className="artisan-text-line">whole spices, single-origin leaves,</span>
                        <span className="artisan-text-line">and crush them by hand. No dust.</span>
                        <span className="artisan-text-line">No shortcuts. Just pure ritual.</span>
                    </p>

                    <div className="artisan-actions artisan-text-line">
                        <button className="btn-primary">Experience the Craft</button>
                        <div className="artisan-quality-badge">
                            <span className="badge-icon">✦</span>
                            <span>Small Batch Certified</span>
                        </div>
                    </div>
                </div>

                {/* ─── Right: Visual ─── */}
                <div className="artisan-visual">
                    <div className="artisan-blob" />
                    <div className="scatter-item item-cinnamon" data-speed="0.9" />
                    <div className="scatter-item item-cardamom" data-speed="0.6" />
                    <div className="scatter-item item-clove"    data-speed="1.1" />

                    {/* Stats strip */}
                    <div className="artisan-stats">
                        <div className="stat-item">
                            <span className="stat-number">12+</span>
                            <span className="stat-label">Spice Varietals</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">48h</span>
                            <span className="stat-label">Slow Blend</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">3×</span>
                            <span className="stat-label">Hand Crushed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom blends into RitualSection (charcoal) */}
            <div className="artisan-bottom-transition" />
        </section>
    );
}
