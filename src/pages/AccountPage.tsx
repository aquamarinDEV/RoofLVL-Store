import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

export function AccountPage() {
  usePageTitle('Cont client')

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        <span>/</span>
        <span>Cont client</span>
      </div>

      <header className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Cont client</h1>
            <p className="page-subtitle">
              Autentificare și administrare comenzi pentru constructori și firme de construcții.
            </p>
          </div>
        </div>
      </header>

      <div className="checkout-grid">
        <div className="card">
          <h2 style={{ marginTop: 0, marginBottom: '0.8rem', fontSize: '1rem' }}>
            Autentificare rapidă
          </h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="login-email">Email</label>
              <input id="login-email" name="login-email" placeholder="Email" />
            </div>
            <div className="form-field">
              <label htmlFor="login-password">Parolă</label>
              <input id="login-password" type="password" name="login-password" />
            </div>
          </div>
          <button
            type="button"
            className="btn-primary"
            style={{ marginTop: '0.8rem', justifyContent: 'center' }}
          >
            Autentificare
          </button>
          <p className="form-note">
            Integrarea cu un sistem de autentificare (ex. JWT sau OAuth) poate fi adăugată
            ulterior, păstrând aceeași interfață.
          </p>
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0, marginBottom: '0.8rem', fontSize: '1rem' }}>
            Creează cont pentru firmă
          </h2>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="reg-company">Firmă</label>
              <input id="reg-company" name="reg-company" placeholder="SC Exemplu Construct SRL" />
            </div>
            <div className="form-field">
              <label htmlFor="reg-cif">CUI</label>
              <input id="reg-cif" name="reg-cif" placeholder="RO..." />
            </div>
            <div className="form-field">
              <label htmlFor="reg-email">Email</label>
              <input id="reg-email" name="reg-email" placeholder="Email pentru facturare" />
            </div>
            <div className="form-field">
              <label htmlFor="reg-phone">Telefon</label>
              <input id="reg-phone" name="reg-phone" placeholder="Telefon" />
            </div>
          </div>
          <p className="form-note">
            La activarea completă a magazinului, conturile de firmă pot primi liste de prețuri
            personalizate și condiții speciale.
          </p>
        </div>
      </div>
    </div>
  )
}

