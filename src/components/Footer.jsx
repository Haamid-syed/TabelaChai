import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-section">
            <div className="container footer-container">

                <div className="footer-top">
                    <h2 className="footer-title text-pumpkin">THE RITUAL<br />AWAITS.</h2>

                    <div className="footer-newsletter">
                        <p className="newsletter-text">Join our journal for seasonal blends and stories from the estates.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="YOUR EMAIL" className="newsletter-input" />
                            <button type="submit" className="newsletter-submit">SUBSCRIBE</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-links-grid">
                        <div className="footer-col">
                            <h4 className="footer-col-title">SHOP</h4>
                            <ul className="footer-col-links">
                                <li><a href="#">The Signature Blend</a></li>
                                <li><a href="#">Single Estate Leaves</a></li>
                                <li><a href="#">Artisan Kulhads</a></li>
                                <li><a href="#">Gift Sets</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4 className="footer-col-title">STORY</h4>
                            <ul className="footer-col-links">
                                <li><a href="#">Our Estates</a></li>
                                <li><a href="#">The Roasting Process</a></li>
                                <li><a href="#">Journal</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-meta">
                        <span className="footer-logo">TABELA CHAI</span>
                        <span className="footer-copyright">&copy; {new Date().getFullYear()} TABELA CHAI. ALL RIGHTS RESERVED.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
