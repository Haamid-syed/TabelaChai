import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Navbar.css';

export default function Navbar() {
    const navRef = useRef(null);

    useEffect(() => {
        const nav = navRef.current;

        // Intro stagger animation
        gsap.to('.nav-item, .nav-logo-wrap, .nav-cart', {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 1,
            ease: 'power3.out',
            delay: 0.4
        });

        // Scroll-aware: add glass class + hide/show
        let lastScroll = 0;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const current = window.scrollY;
                    
                    // Add/remove glass background
                    if (current > 60) {
                        nav.classList.add('scrolled');
                    } else {
                        nav.classList.remove('scrolled');
                    }

                    // Hide on scroll down, show on scroll up
                    if (current > 200) {
                        if (current > lastScroll + 5) {
                            gsap.to(nav, { yPercent: -100, duration: 0.4, ease: 'power2.out' });
                        } else if (current < lastScroll - 5) {
                            gsap.to(nav, { yPercent: 0, duration: 0.4, ease: 'power2.out' });
                        }
                    } else {
                        gsap.to(nav, { yPercent: 0, duration: 0.4, ease: 'power2.out' });
                    }

                    lastScroll = current;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="navbar" ref={navRef}>
            <div className="container nav-container">
                {/* Left Links */}
                <ul className="nav-links">
                    <li className="nav-item"><a href="#ritual">The Ritual</a></li>
                    <li className="nav-item"><a href="#artisan">Our Craft</a></li>
                </ul>

                {/* Centered Logo */}
                <div className="nav-logo-wrap nav-item">
                    <div className="nav-logo-dot" />
                    <span className="nav-logo-text">TABELA</span>
                    <div className="nav-logo-dot" />
                </div>

                {/* Right Links */}
                <ul className="nav-links">
                    <li className="nav-item"><a href="#journal">Journal</a></li>
                    <li className="nav-item">
                        <span className="nav-cart">
                            Cart&nbsp;<span className="cart-count">0</span>
                        </span>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
