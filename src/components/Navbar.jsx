import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Navbar.css';

export default function Navbar() {
    const navRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Intro animation
            gsap.from('.nav-item', {
                y: -50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: 'power3.out',
                delay: 0.5
            });

            // Simple hide-on-scroll down, show-on-scroll up
            let lastScroll = window.scrollY;

            const handleScroll = () => {
                const currentScroll = window.scrollY;
                if (currentScroll > 100) {
                    if (currentScroll > lastScroll) {
                        gsap.to(navRef.current, { yPercent: -100, duration: 0.3, ease: 'power2.out' });
                    } else {
                        gsap.to(navRef.current, { yPercent: 0, duration: 0.3, ease: 'power2.out' });
                    }
                } else {
                    gsap.to(navRef.current, { yPercent: 0, duration: 0.3, ease: 'power2.out' });
                }
                lastScroll = currentScroll;
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);

        }, navRef);
        return () => ctx.revert();
    }, []);

    return (
        <nav className="navbar" ref={navRef}>
            <div className="container nav-container">
                <ul className="nav-links nav-left">
                    <li className="nav-item"><a href="#ritual">The Ritual</a></li>
                    <li className="nav-item"><a href="#shop">Shop</a></li>
                </ul>

                <div className="nav-logo nav-item text-pumpkin">
                    TABELA
                </div>

                <ul className="nav-links nav-right">
                    <li className="nav-item"><a href="#journal">Journal</a></li>
                    <li className="nav-item"><a href="#cart">Cart [0]</a></li>
                </ul>
            </div>
        </nav>
    );
}
