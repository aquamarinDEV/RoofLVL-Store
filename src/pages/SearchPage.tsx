import { Link, useLocation } from 'react-router-dom'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { usePageTitle } from '../hooks/usePageTitle'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export function SearchPage() {
  const query = useQuery()
  const q = query.get('q')?.trim() ?? ''
  usePageTitle(q ? `Căutare: ${q}` : 'Căutare produse')

  const lower = q.toLowerCase()

  const results = q
    ? products.filter((p) => {
        const inName = p.name.toLowerCase().includes(lower)
        const inDesc =
          p.shortDescription.toLowerCase().includes(lower) ||
          p.technicalDescription.toLowerCase().includes(lower)
        const inDims = p.dimensions.toLowerCase().includes(lower)
        const inTags = p.tags.some((t) => t.toLowerCase().includes(lower))
        return inName || inDesc || inDims || inTags
      })
    : []

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        <span>/</span>
        <span>Căutare</span>
      </div>

      <header className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Căutare produse</h1>
            <p className="page-subtitle">
              Caută rapid după tip, dimensiune sau aplicație (ex. &quot;autoforant 4.8x35&quot;,
              &quot;cuie beton&quot;, &quot;ancoră chimică&quot;).
            </p>
          </div>
        </div>
      </header>

      {!q && (
        <p className="page-meta">
          Introdu un termen de căutare în bara de sus pentru a vedea rezultate.
        </p>
      )}

      {q && (
        <p className="page-meta" style={{ marginBottom: '0.8rem' }}>
          Rezultate pentru &quot;{q}&quot;: {results.length} produse găsite.
        </p>
      )}

      {results.length > 0 && (
        <div className="product-grid">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

