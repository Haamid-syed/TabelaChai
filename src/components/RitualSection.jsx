import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RitualSection.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        num: '01',
        tag: 'Foundation',
        title: 'The Base',
        text: 'We begin with Assam orthodox leaves from the upper slopes, carefully selected for their bold, malty character. Each batch is crushed by hand with whole, dry-roasted cardamom pods.',
        detail: 'Assam — Single Estate'
    },
    {
        num: '02',
        tag: 'Transformation',
        title: 'The Infusion',
        text: 'Slow-boiled over a controlled flame with farm-fresh whole milk. The rolling boil unlocks the deep amber hue and marries the spice aromatics into one cohesive, layered brew.',
        detail: '48 Minute Slow Steep'
    },
    {
        num: '03',
        tag: 'The Finish',
        title: 'The Pour',
        text: 'Aerated from height into handmade clay kulhads. The vessel breathes — earthy minerals from the fired clay mingle with the warmth of the brew in the final thirty seconds.',
        detail: 'Clay Kulhad Finish'
    }
];

export default function RitualSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            gsap.to('.ritual-header', {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.ritual-header',
                    start: 'top 85%',
                }
            });

            // Each step staggered reveal
            const steps = gsap.utils.toArray('.ritual-step');
            steps.forEach((step, i) => {
                gsap.to(step, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: step,
                        start: 'top 82%',
                    }
                });

                // Activate circle highlight when step enters viewport center
                ScrollTrigger.create({
                    trigger: step,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    onEnter: () => step.classList.add('active'),
                    onLeave: () => step.classList.remove('active'),
                    onEnterBack: () => step.classList.add('active'),
                    onLeaveBack: () => step.classList.remove('active'),
                });
            });

            // CTA reveal
            gsap.to('.ritual-cta', {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.ritual-cta',
                    start: 'top 88%',
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="ritual-section" ref={sectionRef} id="ritual">
            <div className="container">
                {/* Header */}
                <div className="ritual-header">
                    <div className="ritual-eyebrow">
                        <span className="ritual-eyebrow-rule" />
                        From Leaf to Cup
                        <span className="ritual-eyebrow-rule" />
                    </div>
                    <h2 className="ritual-headline">
                        The Brewing<br />
                        <em>Ritual</em>
                    </h2>
                </div>

                {/* Steps */}
                <div className="ritual-steps">
                    {STEPS.map(({ num, tag, title, text, detail }) => (
                        <div className="ritual-step" key={num}>
                            {/* Left: number node */}
                            <div className="ritual-step-node">
                                <div className="step-node-circle">{num}</div>
                            </div>

                            {/* Right: content */}
                            <div className="ritual-step-body">
                                <span className="ritual-step-tag">{tag}</span>
                                <h3 className="ritual-step-title">{title}</h3>
                                <p className="ritual-step-text">{text}</p>
                                <div className="ritual-step-detail">
                                    <span className="step-detail-line" />
                                    {detail}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="ritual-cta">
                    <p>Ready to experience the craft?</p>
                    <button className="btn-primary">Craft Your Ritual</button>
                </div>
            </div>

            {/* Bottom fade transition */}
            <div className="ritual-bottom-fade" />
        </section>
    );
}
