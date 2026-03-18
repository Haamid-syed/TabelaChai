import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollVideo.css'

gsap.registerPlugin(ScrollTrigger)

function ScrollVideo({ frames, height = '100vh' }) {
    const containerRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        if (!frames || frames.length === 0) return

        const container = containerRef.current
        if (!container) return

        // Create animation that updates frame based on scroll progress
        gsap.to(imageRef.current, {
            scrollTrigger: {
                trigger: container,
                start: 'top center',
                end: 'bottom center',
                scrub: 1, // smooth scrubbing
                markers: false, // set to true for debugging
                onUpdate: (self) => {
                    // Calculate current frame index based on scroll progress
                    const progress = self.progress
                    const frameIndex = Math.floor(progress * (frames.length - 1))
                    
                    if (imageRef.current) {
                        imageRef.current.src = frames[frameIndex]
                    }
                }
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) {
                    trigger.kill()
                }
            })
        }
    }, [frames])

    return (
        <div 
            ref={containerRef}
            className="scroll-video-container"
            style={{ height }}
        >
            <div className="scroll-video-wrapper">
                <img
                    ref={imageRef}
                    className="scroll-video-image"
                    src={frames?.[0] || ''}
                    alt="Scroll animation"
                />
            </div>
        </div>
    )
}

export default ScrollVideo
