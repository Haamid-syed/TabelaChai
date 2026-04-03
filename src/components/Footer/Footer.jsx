import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer-section">
            <div className="footer-ambient" />
            <div className="container footer-container">

                {/* ─── Big CTA ─── */}
                <div className="footer-cta">
                    <div className="footer-cta-eyebrow">
                        <span className="footer-cta-rule" />
                        Begin Your Journey
                        <span className="footer-cta-rule" />
                    </div>
                    <h2 className="footer-cta-title">
                        THE RITUAL<br />
                        <em>AWAITS.</em>
                    </h2>
                    <button className="btn-primary">Explore the Collection</button>
                </div>

                {/* ─── Newsletter + Links ─── */}
                <div className="footer-body">
                    <div className="footer-newsletter">
                        <span className="footer-newsletter-label">The Journal</span>
                        <p className="footer-newsletter-sub">
                            Seasonal blends, estate stories, and the art of chai — delivered gently.
                        </p>
                        <form className="footer-form" onSubmit={e => e.preventDefault()}>
                            <input
                                type="email"
                                className="footer-input"
                                placeholder="Your email"
                                aria-label="Subscribe to newsletter"
                            />
                            <button type="submit" className="footer-submit">Subscribe</button>
                        </form>
                    </div>

                    <div className="footer-links">
                        <div>
                            <span className="footer-col-title">Shop</span>
                            <ul className="footer-col-list">
                                <li><a href="#">The Signature Blend</a></li>
                                <li><a href="#">Single Estate Leaves</a></li>
                                <li><a href="#">Artisan Kulhads</a></li>
                                <li><a href="#">Gift Sets</a></li>
                            </ul>
                        </div>
                        <div>
                            <span className="footer-col-title">Story</span>
                            <ul className="footer-col-list">
                                <li><a href="#">Our Estates</a></li>
                                <li><a href="#">The Roasting Process</a></li>
                                <li><a href="#">Journal</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ─── Bottom Bar ─── */}
                <div className="footer-bottom-bar">
                    <span className="footer-bottom-logo">TABELA CHAI</span>
                    <span className="footer-bottom-copy">
                        &copy; {year} Tabela Chai. All Rights Reserved.
                    </span>
                    <div className="footer-bottom-socials">
                        <a href="#" className="footer-social-link">Instagram</a>
                        <a href="#" className="footer-social-link">Pinterest</a>
                        <a href="#" className="footer-social-link">TikTok</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
