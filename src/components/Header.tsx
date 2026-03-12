import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logo from '../assets/ROOF LVL (2) (1).svg'
export function Header() {
  const { state } = useCart()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    navigate(`/cautare?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <header className="app-header">
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
            <Link to="/cos" className="header-link">
              <span className="icon">🧺</span>
              <span>Coș ({totalItems})</span>
            </Link>
          </div>
        </div>

        <nav className="header-nav">
          <Link to="/" className="header-link">
            Acasă
          </Link>
          <Link to="/produse" className="header-link">
            Produse
          </Link>
          <Link to="/despre-noi" className="header-link">
            Despre noi
          </Link>
          <Link to="/contact" className="header-link">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}

