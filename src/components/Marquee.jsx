import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Marquee.css';

export default function Marquee() {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Endless marquee animation
            gsap.to('.marquee-part', {
                xPercent: -100,
                repeat: -1,
                duration: 15,
                ease: 'linear',
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="marquee-section" ref={containerRef}>
            <div className="marquee-wrapper">
                <div className="marquee-part text-pumpkin">
                    ARTISANAL • SMALL BATCH • RECLAIMING THE RITUAL •
                </div>
                <div className="marquee-part text-pumpkin">
                    ARTISANAL • SMALL BATCH • RECLAIMING THE RITUAL •
                </div>
                <div className="marquee-part text-pumpkin">
                    ARTISANAL • SMALL BATCH • RECLAIMING THE RITUAL •
                </div>
            </div>
        </section>
    );
}
