import { Link } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { productImages } from '../lib/productImages'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const productImage = product.image ? productImages[product.image] : null

  const priceDisplay = new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: product.currency,
    minimumFractionDigits: 2,
  }).format(product.price)

  const dimLabel = product.dimensions || [product.diameterMm, product.lengthMm].filter(Boolean).join(' × ')

  return (
    <article className="product-card">
      <Link to={`/produs/${product.slug}`} className="product-media">
        {productImage ? (
          <img
            src={productImage}
            alt=""
            className="product-image"
            loading="lazy"
          />
        ) : (
          <div className="product-placeholder">
            Vizualizare tehnică: {product.imageHint}
          </div>
        )}
        <span className="product-meta-pill">{dimLabel}</span>
      </Link>
      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-specs">
          {product.material} · {product.application}
          {product.piecesPerBox != null && (
            <> · {product.piecesPerBox.toLocaleString('ro-RO')} buc/cutie</>
          )}
        </div>
        <div className="product-footer">
          <div>
            <div className="product-price">{priceDisplay}</div>
            <div className="product-unit">/ {product.unit}</div>
          </div>
          <button
            type="button"
            className="btn-primary btn-add-cart"
            onClick={() => {
              addToCart(product, product.minQuantity)
              showToast('Produsul a fost adăugat în coș.')
            }}
          >
            Adaugă în coș
          </button>
        </div>
      </div>
    </article>
  )
}

