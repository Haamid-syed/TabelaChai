import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Marquee.css';

const TEXT = ['ARTISANAL', 'SMALL BATCH', 'RECLAIMING THE RITUAL', 'SINGLE ORIGIN', 'BREWED WITH INTENT'];

export default function Marquee() {
    const wrapRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.marquee-part', {
                xPercent: -100,
                repeat: -1,
                duration: 22,
                ease: 'linear',
                modifiers: {
                    xPercent: gsap.utils.unitize(x => parseFloat(x) % 100)
                }
            });
        }, wrapRef);

        return () => ctx.revert();
    }, []);

    // Duplicate 3× to ensure seamless looping at all widths
    const parts = [0, 1, 2].map(key => (
        <div key={key} className="marquee-part" aria-hidden={key > 0}>
            {TEXT.map((word, i) => (
                <span key={i}>
                    {word}
                    <span className="marquee-dot" aria-hidden="true" />
                </span>
            ))}
        </div>
    ));

    return (
        <section className="marquee-section" aria-label="Brand marquee">
            <div className="marquee-band" />
            <div className="marquee-wrapper" ref={wrapRef}>
                {parts}
            </div>
        </section>
    );
}
