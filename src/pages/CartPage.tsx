import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { usePageTitle } from '../hooks/usePageTitle'

export function CartPage() {
  const { state, setQuantity, removeFromCart } = useCart()
  const navigate = useNavigate()
  usePageTitle('Coș de cumpărături')

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  const subtotalDisplay = new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    minimumFractionDigits: 2,
  }).format(subtotal)

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        <span>/</span>
        <span>Coș de cumpărături</span>
      </div>

      <header className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Coș de cumpărături</h1>
          </div>
        </div>
      </header>

      {state.items.length === 0 ? (
        <div className="card">
          <p>Coșul este gol în acest moment.</p>
          <p className="form-note">
            Adaugă produse din categoriile principale: cuie în bandă, cuie beton, cuie finisaj,
            Aluband sau accesorii țiglă metalică.
          </p>
          <Link to="/">
            <button
              type="button"
              className="btn-primary"
              style={{ marginTop: '0.75rem', boxShadow: 'none', borderRadius: '6px' }}
            >
              Înapoi la magazin
            </button>
          </Link>
        </div>
      ) : (
        <div className="layout-grid">
          <div className="card">
            <div className="cart-items">
              {state.items.map((item) => {
                const lineTotal = item.product.price * item.quantity
                const lineDisplay = new Intl.NumberFormat('ro-RO', {
                  style: 'currency',
                  currency: 'RON',
                  minimumFractionDigits: 2,
                }).format(lineTotal)

                return (
                  <div key={item.product.id} className="cart-item">
                    <div className="cart-item-main">
                      <div className="cart-item-name">{item.product.name}</div>
                      <div className="cart-item-meta">
                        {item.product.dimensions} · {item.product.material}
                      </div>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(
                              item.product.id,
                              Math.max(item.quantity - item.product.minQuantity, 0),
                            )
                          }
                        >
                          -
                        </button>
                        <span>
                          {item.quantity} {item.product.unit}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(item.product.id, item.quantity + item.product.minQuantity)
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-item-meta">{lineDisplay}</div>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        Elimină
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="cart-summary">
            <div className="cart-line">
              <span>Valoare produse</span>
              <span>{subtotalDisplay}</span>
            </div>
            <div className="cart-line">
              <span>Estimare transport</span>
              <span>Se calculează la confirmare</span>
            </div>
            <div className="cart-line total">
              <span>Total estimat</span>
              <span>{subtotalDisplay}</span>
            </div>
            <p className="form-note">
              Pasul următor este introducerea datelor de livrare și facturare în formularul de
              checkout simplu.
            </p>
            <button
              type="button"
              className="btn-primary"
              style={{
                marginTop: '0.75rem',
                width: '100%',
                justifyContent: 'center',
                boxShadow: 'none',
                borderRadius: '6px',
              }}
              onClick={() => navigate('/checkout')}
            >
              Continuă la checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

