import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { FilterSidebar } from '../components/FilterSidebar'
import { usePageTitle } from '../hooks/usePageTitle'

export function ProductsPage() {
  usePageTitle('Toate produsele')

  const [categoriesActive, setCategoriesActive] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState<number | ''>('')
  const [priceMax, setPriceMax] = useState<number | ''>('')
  const [dimensions, setDimensions] = useState<string[]>([])
  const [materials, setMaterials] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categoriesActive.length && !categoriesActive.includes(p.categorySlug)) return false
      if (priceMin !== '' && p.price < priceMin) return false
      if (priceMax !== '' && p.price > priceMax) return false
      if (dimensions.length && !dimensions.includes(p.dimensions)) return false
      if (materials.length && !materials.includes(p.material)) return false
      const typeValues = [p.headType, p.driveType].filter(Boolean) as string[]
      if (types.length && !typeValues.some((t) => types.includes(t))) return false
      return true
    })
  }, [categoriesActive, priceMin, priceMax, dimensions, materials, types])

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        <span>/</span>
        <span>Produse</span>
      </div>

      <header className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Toate produsele</h1>
          </div>
        </div>
      </header>

      <div className="layout-grid">
        <FilterSidebar
          allProducts={products}
          activeDimensions={dimensions}
          activeMaterials={materials}
          activeTypes={types}
          onToggleDimension={(value) =>
            setDimensions((prev) =>
              prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
            )
          }
          onToggleMaterial={(value) =>
            setMaterials((prev) =>
              prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
            )
          }
          onToggleType={(value) =>
            setTypes((prev) =>
              prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
            )
          }
          categories={categories}
          activeCategories={categoriesActive}
          onToggleCategory={(slug) =>
            setCategoriesActive((prev) =>
              prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
            )
          }
          priceMin={priceMin}
          priceMax={priceMax}
          onPriceMinChange={setPriceMin}
          onPriceMaxChange={setPriceMax}
        />

        <div>
          <div className="page-meta" style={{ marginBottom: '0.8rem' }}>
            {filtered.length} produse
          </div>
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
