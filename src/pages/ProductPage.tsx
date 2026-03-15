import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DOLII_RAL_OPTIONS, findProductBySlug, products } from '../data/products'
import { categories } from '../data/categories'
import { useCart } from '../context/CartContext'
import { productImages } from '../lib/productImages'
import { usePageTitle } from '../hooks/usePageTitle'
import { setMetaDescription } from '../seo'
import { ProductCard } from '../components/ProductCard'
import { useToast } from '../context/ToastContext'

export function ProductPage() {
  const { productSlug } = useParams<{ productSlug: string }>()
  const product = productSlug ? findProductBySlug(productSlug) : undefined
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedRal, setSelectedRal] = useState<string>('')

  useEffect(() => {
    if (product) {
      setQuantity(product.minQuantity)
      if (product.categorySlug === 'dolii') setSelectedRal(DOLII_RAL_OPTIONS[0])
      else if (product.colorOptions?.length) setSelectedRal(product.colorOptions[0])
      else setSelectedRal('')
    }
  }, [product?.id, product?.categorySlug, product?.colorOptions])

  if (!product) {
    usePageTitle('Produs indisponibil')
    return (
      <div>
        <div className="breadcrumbs">
          <Link to="/">Acasă</Link>
          <span>/</span>
          <span>Produs</span>
        </div>
        <h1 className="page-title">Produsul nu a fost găsit</h1>
        <p className="page-subtitle">
          Produsul nu există sau a fost dezactivat. Revino la catalog pentru alte variante.
        </p>
      </div>
    )
  }

  const category = categories.find((c) => c.slug === product.categorySlug)
  usePageTitle(product.name)
  setMetaDescription(`${product.shortDescription} Dimensiuni: ${product.dimensions}. Material: ${product.material}.`)

  const similarProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.categorySlug === product.categorySlug &&
        p.tags.some((t) => product.tags.includes(t)),
    )
    .slice(0, 4)

  const priceDisplay = new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: product.currency,
    minimumFractionDigits: 2,
  }).format(product.price)

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        {category && (
          <>
            <span>/</span>
            <Link to={`/categorie/${category.slug}`}>{category.name}</Link>
          </>
        )}
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-page">
        <div className="product-page-media">
          <div className="product-page-image-wrap">
            {product.image && productImages[product.image] ? (
              <img
                src={productImages[product.image]}
                alt=""
                className="product-page-image"
              />
            ) : (
              <div className="product-page-placeholder">
                {product.imageHint}
              </div>
            )}
          </div>
          <div className="product-page-tech-details">
            <div>
              <div className="detail-item-label">Tip produs</div>
              <div className="detail-item-value">
                {category ? category.name : 'Element de fixare'}
              </div>
            </div>
            {product.headType && (
              <div>
                <div className="detail-item-label">Tip cap</div>
                <div className="detail-item-value">{product.headType}</div>
              </div>
            )}
            {product.driveType && (
              <div>
                <div className="detail-item-label">Tip antrenare</div>
                <div className="detail-item-value">{product.driveType}</div>
              </div>
            )}
            <div>
              <div className="detail-item-label">Dimensiuni</div>
              <div className="detail-item-value">{product.dimensions}</div>
            </div>
            <div>
              <div className="detail-item-label">Material</div>
              <div className="detail-item-value">{product.material}</div>
            </div>
            <div>
              <div className="detail-item-label">Strat protector</div>
              <div className="detail-item-value">{product.coating}</div>
            </div>
            <div>
              <div className="detail-item-label">Aplicație principală</div>
              <div className="detail-item-value">{product.application}</div>
            </div>
          </div>
        </div>

        <div className="product-page-content">
          <h1 className="product-page-title">{product.name}</h1>
          <p className="page-subtitle">{product.technicalDescription}</p>

          <div className="product-page-price-row">
            <div className="product-page-price">{priceDisplay}</div>
            <div className="product-page-unit">/ {product.unit}</div>
          </div>
          <div className="page-meta">
            {product.piecesPerBox != null ? (
              <>{product.piecesPerBox.toLocaleString('ro-RO')} cuie per cutie. Cantitate minimă: {product.minQuantity} {product.unit}.</>
            ) : (
              <>Cantitate minimă recomandată: {product.minQuantity} {product.unit}.</>
            )}
          </div>

          {(product.categorySlug === 'dolii' || (product.colorOptions?.length ?? 0) > 0) && (
            <div className="form-field">
              <label htmlFor="product-color">
                {product.categorySlug === 'dolii' || product.categorySlug === 'parazapezi' || product.categorySlug === 'frontoane' || product.categorySlug === 'alte-accesorii-acoperis'
                  ? 'Culoare RAL (alte coduri la cerere — contactati-ne)'
                  : 'Culoare (alte coduri la cerere — contactati-ne)'}
              </label>
              <select
                id="product-color"
                value={selectedRal}
                onChange={(e) => setSelectedRal(e.target.value)}
                style={{ maxWidth: '220px' }}
              >
                {(product.categorySlug === 'dolii' ? DOLII_RAL_OPTIONS : product.colorOptions ?? []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="product-page-actions">
            <div className="quantity-selector">
              <button
                type="button"
                className="quantity-btn"
                onClick={() => setQuantity((n) => Math.max(product.minQuantity, n - 1))}
                aria-label="Scade cantitatea"
              >
                −
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                type="button"
                className="quantity-btn"
                onClick={() => setQuantity((n) => n + 1)}
                aria-label="Mărește cantitatea"
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="btn-primary btn-product-add"
              onClick={() => {
                const needsVariant = product.categorySlug === 'dolii' || (product.colorOptions?.length ?? 0) > 0
                if (needsVariant && !selectedRal) {
                  showToast(product.categorySlug === 'dolii' || product.categorySlug === 'parazapezi' || product.categorySlug === 'frontoane' || product.categorySlug === 'alte-accesorii-acoperis' ? 'Alege o culoare RAL.' : 'Alege o culoare.')
                  return
                }
                addToCart(product, quantity, needsVariant ? selectedRal : undefined)
                showToast('Produsul a fost adăugat în coș.')
              }}
            >
              Adaugă în coș
            </button>
          </div>

          <ul className="product-page-benefits">
            <li>Livrare rapidă din stoc</li>
            <li>Recomandat pentru proiecte de acoperiș și structură</li>
            <li>Prețuri avantajoase pentru firme și montatori</li>
          </ul>

          {((product.diameterMm != null) || (product.lengthMm != null)) && (
            <>
              <div className="divider" />
              <div className="detail-grid">
                {product.diameterMm != null && (
                  <div>
                    <div className="detail-item-label">Diametru nominal</div>
                    <div className="detail-item-value">{product.diameterMm} mm</div>
                  </div>
                )}
                {product.lengthMm != null && (
                  <div>
                    <div className="detail-item-label">Lungime nominală</div>
                    <div className="detail-item-value">{product.lengthMm} mm</div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {similarProducts.length > 0 && (
        <>
          <div className="divider" />
          <section className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">Produse similare</h2>
                <p className="section-subtitle">
                  Alte elemente de fixare folosite în aceleași aplicații.
                </p>
              </div>
            </div>
            <div className="product-grid">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

