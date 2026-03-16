import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <div className="footer-brand">
          <strong>RoofLVL</strong>
          <span>Elemente de fixare profesionale pentru construcții și acoperișuri.</span>
        </div>
        <div className="footer-nav">
          <div className="footer-nav-col">
            <span className="footer-nav-title">Navigare</span>
            <Link to="/">Acasă</Link>
            <Link to="/produse">Produse</Link>
            <Link to="/despre-noi">Despre noi</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cos">Coș</Link>
          </div>
          <div className="footer-nav-col">
            <span className="footer-nav-title">Contact</span>
            <a href="https://wa.me/40785754952" target="_blank" rel="noopener noreferrer">
              WhatsApp: 0785 754 952
            </a>
            <a
              href="https://www.facebook.com/p/Roof-LVL-61556692213419/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} RoofLVL. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  )
}

