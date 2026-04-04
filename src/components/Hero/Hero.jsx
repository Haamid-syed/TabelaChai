import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT  = 180;
const CANVAS_WIDTH  = 1080;
const CANVAS_HEIGHT = 1920;

export default function Hero() {
    const heroRef      = useRef(null);
    const canvasRef    = useRef(null);
    const ctxRef       = useRef(null);
    const framesRef    = useRef([]);  // Store loaded images without re-renders

    const [loadedCount, setLoadedCount] = useState(0);
    const [ready, setReady]             = useState(false);
    const loaderShownAt                 = useRef(Date.now());

    // Build frame paths
    const framePaths = useMemo(() => 
        Array.from({ length: FRAME_COUNT }, (_, i) => {
            const n = (i + 1).toString().padStart(4, '0');
            return `/assets/frames/frame_${n}.jpg`;
        }), []);

    // Draw a specific frame on canvas
    const renderFrame = useCallback((index) => {
        const canvas = canvasRef.current;
        const ctx    = ctxRef.current;
        const img    = framesRef.current[index];
        if (!canvas || !ctx || !img) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }, []);

    const BUFFER_COUNT = 30; // Number of frames needed to start the experience

    // Preload all frames with a streaming/buffered approach
    useEffect(() => {
        let mounted = true;
        let count   = 0;
        let isReadySet = false;

        // Initialize ref array immediately
        framesRef.current = new Array(FRAME_COUNT);

        framePaths.forEach((src, i) => {
            const img = new Image();
            img.decoding = 'async';
            img.src = src;
            
            img.onload = () => {
                if (!mounted) return;
                
                // Store frame immediately for streaming access
                framesRef.current[i] = img;
                count++;
                setLoadedCount(count);

                // Initial frame render as soon as frame 0 lands
                if (i === 0 && !ready) {
                    // Slight delay to ensure DOM is ready for canvas ops
                    requestAnimationFrame(() => renderFrame(0));
                }

                // Unlock the site once the buffer is met
                if (count >= BUFFER_COUNT && !isReadySet) {
                    isReadySet = true;
                    // Enforce a small minimum loader display for branding/polish
                    const elapsed = Date.now() - loaderShownAt.current;
                    const delay   = Math.max(0, 800 - elapsed);
                    setTimeout(() => setReady(true), delay);
                }
            };

            img.onerror = () => {
                if (!mounted) return;
                count++;
                setLoadedCount(count);
                
                // Still unlock even on errors so we don't stall
                if (count >= BUFFER_COUNT && !isReadySet) {
                    isReadySet = true;
                    setTimeout(() => setReady(true), 800);
                }
            };
        });

        return () => { mounted = false; };
    }, [framePaths, renderFrame, ready]);

    // Main GSAP setup — only fires when all frames are ready
    useEffect(() => {
        if (!ready) return;

        const canvas  = canvasRef.current;
        const hero    = heroRef.current;
        const context = canvas.getContext('2d');
        ctxRef.current = context;

        // Size canvas to fill screen at 9:16 aspect, height-driven
        const sizeCanvas = () => {
            const H = window.innerHeight;
            const W = window.innerWidth;
            // Keep native 9:16 ratio but ensure we never overflow width
            const idealW = H * (9 / 16);
            canvas.height  = H;
            canvas.width   = Math.min(idealW, W);
            renderFrame(0);
        };

        sizeCanvas();
        const ro = new ResizeObserver(sizeCanvas);
        ro.observe(document.documentElement);

        // ─── Intro animation  ─────────────
        const introTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        introTl
            .to('.hero-title-char', {
                y: 0,
                opacity: 1,
                stagger: 0.045,
                duration: 1.4,
                delay: 0.1,
            })
            .to(canvas, {
                opacity: 1,
                scale: 1,
                duration: 1.6,
                ease: 'power3.out',
            }, '-=1.2')
            .to('.hero-eyebrow', {
                opacity: 1,
                y: 0,
                duration: 1,
            }, '-=1')
            .to('.hero-scroll-hint', {
                opacity: 1,
                duration: 0.8,
            }, '-=0.4');

        // ─── Scroll scrub ─────────────────
        const air = { frame: 0 };

        const scrubTrigger = ScrollTrigger.create({
            trigger: hero,
            start: 'top top',
            end: '+=380%',
            pin: true,
            scrub: 2.5,        // higher = smoother/more cinematic
            onUpdate: (self) => {
                const targetFrame = Math.round(self.progress * (FRAME_COUNT - 1));
                if (air.frame !== targetFrame) {
                    air.frame = targetFrame;
                    renderFrame(air.frame);
                }
            }
        });

        // ─── Title parallax ───────────────
        // Title is BEHIND canvas (z-index:1), parallax makes it peek at edges
        gsap.to('.hero-title-wrap', {
            yPercent: -40,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: '+=380%',
                scrub: true,
            }
        });

        // ─── Scroll hint fade out ─────────
        gsap.to('.hero-scroll-hint', {
            opacity: 0,
            y: -16,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: '+=40%',
                scrub: true,
            }
        });

        // ─── Narrative step overlays ──────
        // Map each step to appear at specific scroll progress windows
        const stepTimings = [
            { el: '.hero-step[data-step="1"]', start: '+=60%',  mid: '+=100%', end: '+=140%' },
            { el: '.hero-step[data-step="2"]', start: '+=150%', mid: '+=190%', end: '+=230%' },
            { el: '.hero-step[data-step="3"]', start: '+=250%', mid: '+=290%', end: '+=380%' },
        ];

        stepTimings.forEach(({ el, start, mid, end }) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: hero,
                    start,
                    end,
                    scrub: 1.5,
                }
            });
            tl.to(el, { opacity: 1, y: 0, duration: 0.5 })
              .to(el, { opacity: 0, y: -8, duration: 0.4 }, '+=0.2');
        });

        // ─── Eyebrow fade early ───────────
        gsap.to('.hero-eyebrow', {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: '+=30%',
                scrub: true,
            }
        });

        return () => {
            ro.disconnect();
            scrubTrigger.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [ready, renderFrame]);

    const percent = Math.round((loadedCount / FRAME_COUNT) * 100);

    return (
        <>
            {/* ─── Loader ─── */}
            <div className={`hero-loader ${ready ? 'hidden' : ''}`}>
                <div className="loader-inner">
                    <p className="loader-brand">TABELA CHAI</p>
                    <p className="loader-sub">Preparing the ritual</p>
                </div>
                <div>
                    <div className="loader-progress-track">
                        <div className="loader-progress-fill" style={{ width: `${percent}%` }} />
                    </div>
                    <p className="loader-perc">{percent}%</p>
                </div>
            </div>

            {/* ─── Hero ─── */}
            <section className="hero-section" ref={heroRef}>
                <div className="hero-sticky">
                    {/* Warm radial glow */}
                    <div className="hero-glow" />

                    {/* Scrolled video canvas */}
                    <div className="hero-canvas-wrap">
                        <canvas
                            ref={canvasRef}
                            className="hero-canvas"
                            style={{ opacity: 0, transform: 'scale(1.04)' }}
                        />
                    </div>

                    {/* Massive title behind video */}
                    <div className="hero-title-wrap">
                        <h1 className="hero-title">
                            {'TABELA'.split('').map((c, i) => (
                                <span key={i} className="hero-mask">
                                    <span className="hero-title-char">{c}</span>
                                </span>
                            ))}
                        </h1>
                    </div>

                    {/* Eyebrow label */}
                    <div className="hero-eyebrow">
                        <div className="hero-eyebrow-line">
                            <span className="eyebrow-rule" />
                            <span>THE PREMIER CHAI EXPERIENCE</span>
                        </div>
                    </div>

                    {/* Narrative overlays */}
                    <div className="hero-steps">
                        <div className="hero-step" data-step="1">
                            <span className="step-num">01 ——</span>
                            <span className="step-label">The Base</span>
                        </div>
                        <div className="hero-step" data-step="2">
                            <span className="step-num">—— 02</span>
                            <span className="step-label">The Infusion</span>
                        </div>
                        <div className="hero-step" data-step="3">
                            <span className="step-num">03 ——</span>
                            <span className="step-label">The Perfection</span>
                        </div>
                    </div>

                    {/* Scroll cue */}
                    <div className="hero-scroll-hint">
                        <span className="scroll-hint-text">Scroll to pour</span>
                        <div className="scroll-hint-line" />
                    </div>

                    {/* Bottom blend into next section */}
                    <div className="hero-bottom-fade" />
                </div>
            </section>
        </>
    );
}
