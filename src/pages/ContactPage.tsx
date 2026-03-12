import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import { supabase } from '../lib/supabase'

export function ContactPage() {
  usePageTitle('Contact')
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!showSuccess) return
    const t = setTimeout(() => setShowSuccess(false), 2200)
    return () => clearTimeout(t)
  }, [showSuccess])

  const handleSubmit = async () => {
    const form = formRef.current
    if (!form) return
    const formData = new FormData(form)
    const name = (formData.get('contact-name') as string)?.trim()
    const phone = (formData.get('contact-phone') as string)?.trim()
    const message = (formData.get('contact-message') as string)?.trim()
    if (!name || !phone || !message) {
      setErrorMsg('Completează numele, telefonul și mesajul.')
      return
    }
    setErrorMsg(null)
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name,
        phone,
        company: (formData.get('contact-company') as string)?.trim() || null,
        message,
      })
      if (error) {
        console.error('Contact form error:', error)
        setErrorMsg(`Eroare: ${error.message}`)
        return
      }
      form.reset()
      setShowSuccess(true)
    } catch (err) {
      console.error('Contact form error:', err)
      setErrorMsg('Eroare la trimitere. Încearcă din nou.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        <span>/</span>
        <span>Contact</span>
      </div>

      <header className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Contact</h1>
            <p className="page-subtitle">
              Trimite-ne detaliile proiectului tău de acoperiș sau construcții.
            </p>
          </div>
        </div>
      </header>

      <div className="checkout-grid">
        <form className="card" ref={formRef} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="contact-name">Nume *</label>
              <input id="contact-name" name="contact-name" placeholder="Nume și prenume" />
            </div>
            <div className="form-field">
              <label htmlFor="contact-phone">Telefon *</label>
              <input id="contact-phone" name="contact-phone" type="tel" placeholder="Telefon" />
            </div>
            <div className="form-field">
              <label htmlFor="contact-company">Firmă (opțional)</label>
              <input id="contact-company" name="contact-company" placeholder="Firmă / Șantier" />
            </div>
          </div>
          {errorMsg && (
            <p style={{ color: '#dc2626', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>{errorMsg}</p>
          )}
          <div className="form-field" style={{ marginTop: '0.8rem' }}>
            <label htmlFor="contact-message">Mesaj *</label>
            <textarea
              id="contact-message"
              name="contact-message"
              placeholder="Descrie pe scurt proiectul, necesarul de elemente de fixare sau întrebările tale."
            />
          </div>
          <button
            type="button"
            className="btn-primary"
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
            style={{ marginTop: '0.9rem', justifyContent: 'center', boxShadow: 'none', borderRadius: '6px' }}
          >
            {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="checkout-confirm-overlay">
          <div className="checkout-confirm-modal">
            <h2>Mesaj trimis</h2>
            <p>Mulțumim! Te vom contacta în curând.</p>
          </div>
        </div>
      )}
    </div>
  )
}

