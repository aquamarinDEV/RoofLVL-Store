import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTopLevelCategories } from '../data/categories'
import { findProductsByCategory, getMixedProductsWithImages } from '../data/products'
import { CategoryCarousel } from '../components/CategoryCarousel'
import { ProductCard } from '../components/ProductCard'
import { usePageTitle } from '../hooks/usePageTitle'
import { supabase } from '../lib/supabase'
import heroImage from '../assets/Blue and White Modern Real Estate Email Header-4.png'
import heroImageMobile from '../assets/Yellow Minimal Construction Company Banner.png'

export function HomePage() {
  usePageTitle('Elemente de fixare profesionale pentru construcții')
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleContactSubmit = async () => {
    const form = formRef.current
    if (!form) return
    const formData = new FormData(form)
    const name = (formData.get('name') as string)?.trim()
    const phone = (formData.get('phone') as string)?.trim()
    const message = (formData.get('message') as string)?.trim()
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
        company: (formData.get('company') as string)?.trim() || null,
        message,
      })
      if (error) {
        setErrorMsg(`Eroare: ${error.message}`)
        return
      }
      form.reset()
      setSuccessMsg(true)
    } catch (err) {
      setErrorMsg('Eroare la trimitere. Încearcă din nou.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const popularProducts = findProductsByCategory('cuie-in-banda').slice(0, 4)
  const featuredProducts = getMixedProductsWithImages(12)

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <div className="hero-image-wrapper">
            <img
              src={heroImage}
              alt="RoofLVL - elemente de fixare profesionale pentru construcții"
              className="hero-image hero-image-desktop"
            />
            <img
              src={heroImageMobile}
              alt="RoofLVL - elemente de fixare profesionale pentru construcții"
              className="hero-image hero-image-mobile"
            />
          </div>
          <div className="hero-cta-row">
            <Link to="/produse">
              <button type="button" className="btn-primary btn-hero">
                Vezi toate produsele
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Categorii principale</h2>
            <p className="section-subtitle">
              Găsești rapid tipul de produs de care ai nevoie pe șantier.
            </p>
          </div>
        </div>
        <CategoryCarousel categories={getTopLevelCategories()} />
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Produse populare</h2>
            <p className="section-subtitle">
              Selecție de cuie, șuruburi și accesorii folosite frecvent în proiecte de acoperiș și
              construcții.
            </p>
          </div>
          <div className="section-actions">
            <Link to="/categorie/cuie-in-banda" className="section-actions-link-all">
              Vezi toate cuiele în bandă →
            </Link>
          </div>
        </div>
        <div className="product-grid">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section promo-text-section">
        <h2 className="promo-text-title">
          Elemente de fixare profesionale pentru orice proiect!
        </h2>
        <p className="promo-text-subtitle">
          Bine ai venit la RoofLVL, magazinul tău de încredere pentru{' '}
          <strong>cuie</strong>, <strong>șuruburi</strong> și <strong>accesorii</strong> de înaltă
          calitate pentru construcții și acoperișuri. Indiferent dacă ai nevoie de{' '}
          <strong>șuruburi autoforante</strong>, <strong>cuie beton</strong>,{' '}
          <strong>elemente de fixare pentru țiglă metalică</strong> sau orice alt produs, noi avem{' '}
          <strong>soluția perfectă</strong> pentru tine.
        </p>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Produse recomandate</h2>
            <p className="section-subtitle">
              Cuie în bandă, cuie tip T, Aluband și alte produse pentru construcții.
            </p>
          </div>
          <div className="section-actions">
            <Link to="/produse" className="section-actions-link-all">
              Vezi toate produsele →
            </Link>
          </div>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section promo-text-section promo-order-section">
        <h2 className="promo-text-title">
          Nu găsiți produsul dorit în stoc? Îl aducem la comandă!
        </h2>
        <p className="promo-text-subtitle">
          La RoofLVL, oferim soluții complete atât pentru particulari, cât și pentru firme (B2B).
          Prețurile pentru comenzi mai mari sunt mult mai avantajoase. Dacă cuiele, șuruburile sau
          accesoriile de care aveți nevoie nu se află în stoc, nu vă faceți griji! Vă putem aduce
          orice produs la comandă, rapid și ușor.
        </p>
        <h3 className="promo-order-steps-title">Cum funcționează?</h3>
        <ol className="promo-order-steps">
          <li>
            <strong>Identificarea produsului:</strong> Fotografiați produsul necesar sau notați
            dimensiunile (ex. șurub 4,8×35, cuie 3,1×90) și trimiteți informațiile prin formularul
            de contact sau pe WhatsApp la nr. de telefon: 0785 754 952.
          </li>
          <li>
            <strong>Confirmarea comenzii:</strong> Echipa noastră vă va contacta pentru a confirma
            detaliile comenzii și pentru a vă oferi informații despre disponibilitate și termen de
            livrare.
          </li>
          <li>
            <strong>Expedierea coletului:</strong> Vom aduce produsul dorit și îl vom livra la
            adresa indicată în cel mai scurt timp posibil.
          </li>
        </ol>
      </section>

      <section className="section contact-form-section">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          Contact
        </h2>
        <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          Trimite-ne detaliile proiectului sau cererea de produse la comandă.
        </p>
        <div className="contact-form-wrapper">
          <form className="contact-form" ref={formRef} onSubmit={(e) => { e.preventDefault(); handleContactSubmit(); }}>
            <div className="contact-form-row">
              <div className="form-field">
                <label htmlFor="home-contact-name">Nume</label>
                <input
                  id="home-contact-name"
                  name="name"
                  placeholder="Nume și prenume"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="home-contact-phone">Telefon</label>
                <input
                  id="home-contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="Telefon"
                  required
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="home-contact-company">Firmă (opțional)</label>
              <input id="home-contact-company" name="company" placeholder="Firmă / Șantier" />
            </div>
            <div className="form-field">
              <label htmlFor="home-contact-message">Mesaj</label>
              <textarea
                id="home-contact-message"
                name="message"
                placeholder="Descrie produsul dorit, dimensiuni (ex. șurub 4,8×35) sau trimite poza produsului și vom reveni cu ofertă."
              />
            </div>
            {errorMsg && <p style={{ color: '#dc2626', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>{errorMsg}</p>}
            {successMsg && <p style={{ color: 'var(--color-brand-dark)', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>Mesaj trimis! Te vom contacta în curând.</p>}
            <button
              type="button"
              className="btn-primary btn-hero btn-contact-submit"
              disabled={isSubmitting}
              onClick={() => handleContactSubmit()}
            >
              {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

