import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ArtisanSection.css';

export default function ArtisanSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Parallax scattering elements
            const elements = gsap.utils.toArray('.scatter-item');

            elements.forEach((el, index) => {
                const speed = el.dataset.speed || 1;
                gsap.to(el, {
                    y: () => -50 * speed,
                    rotation: () => (index % 2 === 0 ? 15 : -15) * speed,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });

            // Text reveal
            gsap.from('.artisan-text-line', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.artisan-content',
                    start: 'top 80%',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="artisan-section" ref={sectionRef}>
            <div className="container artisan-container">
                <div className="artisan-content">
                    <h2 className="artisan-title">
                        <div className="artisan-text-line text-pumpkin">THE ARTISAN'S</div>
                        <div className="artisan-text-line text-charcoal-dark">WORKSHOP</div>
                    </h2>
                    <p className="artisan-body">
                        <span className="artisan-text-line block">Every blend is a canvas. We source</span>
                        <span className="artisan-text-line block">whole spices, single-origin leaves,</span>
                        <span className="artisan-text-line block">and crush them by hand. No dust.</span>
                        <span className="artisan-text-line block">No shortcuts. Just pure ritual.</span>
                    </p>
                    <div className="artisan-action artisan-text-line">
                        <button className="btn-primary" style={{ marginTop: '2rem' }}>Experience the Craft</button>
                    </div>
                </div>

                {/* Scattered Parallax Elements */}
                {/* These would ideally be high-res cutouts of spices */}
                <div className="scattered-grid">
                    <div className="scatter-item item-cinnamon" data-speed="1.2"></div>
                    <div className="scatter-item item-cardamom" data-speed="0.8"></div>
                    <div className="scatter-item item-clove" data-speed="1.5"></div>
                    <div className="scatter-item item-tea" data-speed="0.5"></div>
                </div>
            </div>
        </section>
    );
}
