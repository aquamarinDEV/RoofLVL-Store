import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logo from '../assets/ROOF LVL (2) (1).svg'

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Link to="/" className="header-link" onClick={onNavigate}>Acasă</Link>
      <Link to="/produse" className="header-link" onClick={onNavigate}>Produse</Link>
      <Link to="/despre-noi" className="header-link" onClick={onNavigate}>Despre noi</Link>
      <Link to="/contact" className="header-link" onClick={onNavigate}>Contact</Link>
    </>
  )
}

export function Header() {
  const { state } = useCart()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    navigate(`/cautare?q=${encodeURIComponent(trimmed)}`)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className={`app-header ${menuOpen ? 'menu-open' : ''}`}>
      <div className="app-header-inner">
        <div className="header-top">
          <Link to="/">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <div className="logo-mark">
                <img src={logo} alt="RoofLVL" className="logo-svg" />
              </div>
            </div>
          </Link>

          <form className="header-search" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="search"
                placeholder="Caută după cod, dimensiune sau tip (ex. 4.8x35, autoforant, EPDM)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="header-actions">
            <button
              type="button"
              className="header-hamburger"
              aria-label="Meniul"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span />
              <span />
              <span />
            </button>
            <Link to="/cos" className="header-link header-link-cart">
              <span className="icon">🛒</span>
              <span>Coș ({totalItems})</span>
            </Link>
          </div>
        </div>

        <nav className="header-nav">
          <NavLinks />
        </nav>
        <nav className="header-nav-mobile">
          <NavLinks onNavigate={closeMenu} />
        </nav>
      </div>
    </header>
  )
}

