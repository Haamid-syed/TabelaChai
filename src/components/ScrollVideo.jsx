import { useEffect, useRef, useState, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollVideo.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollVideo: A high-performance canvas-based scroll animation
 * Renders an image sequence to canvas at 60fps linked to scroll position.
 */
export default function ScrollVideo() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  
  // Frame configuration
  const frameCount = 192 // Based on the ffmpeg output count
  const frames = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => {
      const frameNumber = (i + 1).toString().padStart(4, '0')
      return `/assets/frames/frame_${frameNumber}.jpg`
    })
  }, [])

  const [images, setImages] = useState([])
  const [loadedCount, setLoadedCount] = useState(0)

  // Preload all images for zero-lag scrubbing
  useEffect(() => {
    const loadedImages = []
    let count = 0

    frames.forEach((src, index) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        count++
        setLoadedCount(count)
        if (count === frameCount) {
          setImages(loadedImages)
        }
      }
      loadedImages[index] = img
    })
  }, [frames])

  // Setup Canvas and ScrollTrigger
  useEffect(() => {
    if (images.length < frameCount) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const container = containerRef.current

    // Set initial canvas size
    const setCanvasSize = () => {
      // 9:16 Aspect Ratio Handling
      const width = window.innerWidth
      const height = window.innerHeight
      const canvasWidth = height * (9 / 16)
      
      canvas.width = canvasWidth
      canvas.height = height
      
      // Draw first frame immediately
      renderFrame(0)
    }

    const renderFrame = (index) => {
      if (images[index]) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(images[index], 0, 0, canvas.width, canvas.height)
      }
    }

    window.addEventListener('resize', setCanvasSize)
    setCanvasSize()

    // Scroll Animation
    const airObject = { frame: 0 }
    
    const tl = gsap.to(airObject, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=400%', // Scroll length: 4 screens deep
        pin: true,
        scrub: 1.5,
        markers: false,
      },
      onUpdate: () => renderFrame(airObject.frame)
    })

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [images])

  return (
    <section className="video-scroll-section" ref={containerRef}>
      <div className="loader-overlay" style={{ opacity: loadedCount < frameCount ? 1 : 0 }}>
        <div className="loader-text">
          <span className="text-pumpkin">BREWING</span> RITUAL
          <div className="loading-perc">{Math.round((loadedCount / frameCount) * 100)}%</div>
        </div>
      </div>
      
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
        
        {/* Subtle Text Overlays for Narrative Depth */}
        <div className="ritual-overlays">
          <div className="step-label" data-step="1">01. THE BASE</div>
          <div className="step-label" data-step="2">02. THE INFUSION</div>
          <div className="step-label" data-step="3">03. THE PERFECTION</div>
        </div>
      </div>
    </section>
  )
}
