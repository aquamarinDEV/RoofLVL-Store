import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { supabase } from '../lib/supabase'
import { useToast } from '../context/ToastContext'

export function CheckoutPage() {
  const { state, clearCart } = useCart()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  usePageTitle('Checkout simplu')

  useEffect(() => {
    if (!showConfirmation) return
    const timer = setTimeout(() => {
      navigate('/')
    }, 2000)
    return () => clearTimeout(timer)
  }, [showConfirmation, navigate])

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
        <Link to="/cos">Coș</Link>
        <span>/</span>
        <span>Checkout</span>
      </div>

      <header className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Checkout simplu</h1>
          </div>
        </div>
      </header>

      <div className="checkout-grid">
        <form
          id="checkout-form"
          className="card"
          onSubmit={async (event) => {
            event.preventDefault()
            const form = event.currentTarget
            if (!form.reportValidity()) return
            if (state.items.length === 0) {
              showToast('Adaugă produse în coș înainte de a trimite comanda.')
              return
            }
            setIsSubmitting(true)
            const formData = new FormData(form)
            const items = state.items.map((item) => ({
              productId: item.product.id,
              productName: item.selectedRal
                ? `${item.product.name} (${item.selectedRal})`
                : item.product.name,
              quantity: item.quantity,
              price: item.product.price,
              unit: item.product.unit,
            }))
            const { error } = await supabase.from('orders').insert({
              company: formData.get('company') || '',
              cif: formData.get('cif') || null,
              contact: formData.get('contact') || '',
              phone: formData.get('phone') || '',
              email: formData.get('email') || '',
              city: formData.get('city') || '',
              address: formData.get('address') || '',
              county: formData.get('county') || '',
              notes: formData.get('notes') || null,
              items,
              subtotal,
            })
            setIsSubmitting(false)
            if (error) {
              console.error('Supabase order error:', error)
              showToast(`Eroare: ${error.message}`)
              return
            }
            clearCart()
            setShowConfirmation(true)
          }}
          noValidate={false}
        >
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="company">Firmă / Persoană fizică *</label>
              <input
                id="company"
                name="company"
                placeholder="Ex. SC Exemplu Construct SRL / Persoană fizică"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="cif">CUI / CNP (opțional)</label>
              <input id="cif" name="cif" placeholder="Pentru facturare firmă" />
            </div>
            <div className="form-field">
              <label htmlFor="contact">Persoană de contact *</label>
              <input id="contact" name="contact" placeholder="Nume și prenume" required />
            </div>
            <div className="form-field">
              <label htmlFor="phone">Telefon *</label>
              <input id="phone" name="phone" placeholder="Pentru livrare curier" required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email *</label>
              <input id="email" name="email" placeholder="Pentru confirmare comandă" required />
            </div>
            <div className="form-field">
              <label htmlFor="city">Localitate *</label>
              <input id="city" name="city" placeholder="Oraș / Localitate" required />
            </div>
            <div className="form-field">
              <label htmlFor="address">Adresă completă *</label>
              <input
                id="address"
                name="address"
                placeholder="Stradă, număr, bloc, apartament"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="county">Județ *</label>
              <input id="county" name="county" placeholder="Județ" required />
            </div>
          </div>

          <div className="divider" />

          <div className="form-field">
            <label htmlFor="notes">Observații pentru livrare / proiect</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Ex. program șantier, acces cu utilaje, termen de execuție..."
            />
          </div>

          <p className="form-note">
            După trimitere, vei fi contactat pentru confirmarea comenzii și detaliile de livrare.
          </p>
        </form>

        <div className="cart-summary">
          <div className="cart-line">
            <span>Produse ({state.items.length})</span>
            <span>{subtotalDisplay}</span>
          </div>
          <div className="cart-line">
            <span>Transport</span>
            <span>Se calculează</span>
          </div>
          <div className="cart-line total">
            <span>Total estimat</span>
            <span>{subtotalDisplay}</span>
          </div>
          <div className="checkout-payment-pill">Plată ramburs (cu verificare colet)</div>
          <button
            type="submit"
            form="checkout-form"
            className="btn-primary"
            disabled={isSubmitting}
            style={{
              marginTop: '0.75rem',
              width: '100%',
              justifyContent: 'center',
              boxShadow: 'none',
              borderRadius: '6px',
            }}
          >
            {isSubmitting ? 'Se trimite...' : 'Trimite comanda'}
          </button>
        </div>
      </div>
      {showConfirmation && (
        <div className="checkout-confirm-overlay">
          <div className="checkout-confirm-modal">
            <h2>Comanda a fost trimisă</h2>
            <p>
              Un consultant RoofLVL te va contacta pentru confirmarea comenzii și detaliile de
              livrare.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

