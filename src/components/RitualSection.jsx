import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RitualSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function RitualSection() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Pinning the section while we scroll through steps
            const steps = gsap.utils.toArray('.ritual-step');

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top top',
                end: '+=300%', // 3 steps
                pin: true,
                scrub: 1,
                animation: gsap.to(steps, {
                    yPercent: -100 * (steps.length - 1),
                    ease: 'none',
                })
            });

            // Step indicators logic
            steps.forEach((step, i) => {
                ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: `top+=${i * 100}% top`,
                    end: `top+=${(i + 1) * 100}% top`,
                    onToggle: self => {
                        if (self.isActive) {
                            gsap.to('.ritual-indicator-line', {
                                height: `${(i + 1) * 33.33}%`,
                                duration: 0.5,
                                ease: "power2.out"
                            });
                            gsap.to(`.indicator-num`, { opacity: 0.3, duration: 0.3 });
                            gsap.to(`#num-${i}`, { opacity: 1, duration: 0.3 });
                        }
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="ritual-section" ref={containerRef}>

            {/* Scroll Progress Side Nav */}
            <div className="ritual-nav">
                <div className="ritual-indicator-track">
                    <div className="ritual-indicator-line"></div>
                </div>
                <div className="ritual-numbers">
                    <span className="indicator-num" id="num-0">01</span>
                    <span className="indicator-num" id="num-1">02</span>
                    <span className="indicator-num" id="num-2">03</span>
                </div>
            </div>

            <div className="ritual-wrapper">
                <div className="ritual-step step-1">
                    <div className="ritual-step-content">
                        <h3 className="ritual-step-title text-pumpkin">01<br />THE BASE</h3>
                        <p className="ritual-step-body">We start with Assam orthodox leaves spanning the upper slopes, crushed by hand with dry cardamom pods and cloves.</p>
                    </div>
                    <div className="ritual-step-bg bg-base"></div>
                </div>

                <div className="ritual-step step-2">
                    <div className="ritual-step-content">
                        <h3 className="ritual-step-title text-pumpkin">02<br />THE INFUSION</h3>
                        <p className="ritual-step-body">Slow-boiled over an open flame with farm-fresh milk. The precise moment of rolling boil unlocks the deep amber hue.</p>
                    </div>
                    <div className="ritual-step-bg bg-infusion"></div>
                </div>

                <div className="ritual-step step-3">
                    <div className="ritual-step-content">
                        <h3 className="ritual-step-title text-pumpkin">03<br />THE POUR</h3>
                        <p className="ritual-step-body">Aerated from a height into clay kulhads, marrying the earthy minerals of soil with the rich warmth of the brew.</p>
                        <button className="btn-primary mt-4">Craft Your Ritual</button>
                    </div>
                    <div className="ritual-step-bg bg-pour"></div>
                </div>
            </div>
        </section>
    );
}
