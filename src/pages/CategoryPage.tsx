import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categories, getSubcategories, getTopLevelCategories, type CategorySlug } from '../data/categories'
import { findProductsByCategory, findProductsByCategorySlugs, products } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { FilterSidebar } from '../components/FilterSidebar'
import { usePageTitle } from '../hooks/usePageTitle'

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: CategorySlug }>()

  const category = categories.find((c) => c.slug === categorySlug)
  const subcategories = category ? getSubcategories(category.slug) : []
  const allCategoryProducts =
    categorySlug && category
      ? subcategories.length > 0
        ? findProductsByCategorySlugs([
            categorySlug as CategorySlug,
            ...subcategories.map((s) => s.slug),
          ])
        : findProductsByCategory(categorySlug as CategorySlug)
      : products

  usePageTitle(category ? category.name : 'Categorie produse')

  const [priceMin, setPriceMin] = useState<number | ''>('')
  const [priceMax, setPriceMax] = useState<number | ''>('')
  const [dimensions, setDimensions] = useState<string[]>([])
  const [materials, setMaterials] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  const filtered = useMemo(() => {
    return allCategoryProducts.filter((p) => {
      if (priceMin !== '' && p.price < priceMin) return false
      if (priceMax !== '' && p.price > priceMax) return false
      if (dimensions.length && !dimensions.includes(p.dimensions)) return false
      if (materials.length && !materials.includes(p.material)) return false
      const typeValues = [p.headType, p.driveType].filter(Boolean) as string[]
      if (types.length && !typeValues.some((t) => types.includes(t))) return false
      return true
    })
  }, [allCategoryProducts, priceMin, priceMax, dimensions, materials, types])

  if (!category) {
    return (
      <div>
        <div className="breadcrumbs">
          <Link to="/">Acasă</Link>
          <span>/</span>
          <span>Categorie necunoscută</span>
        </div>
        <h1 className="page-title">Categoria nu a fost găsită</h1>
        <p className="page-subtitle">
          Verifică adresa sau alege una dintre categoriile principale de pe homepage.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Acasă</Link>
        <span>/</span>
        {category.parentSlug ? (
          <>
            <Link to={`/categorie/${category.parentSlug}`}>
              {categories.find((c) => c.slug === category.parentSlug)?.name ?? category.parentSlug}
            </Link>
            <span>/</span>
          </>
        ) : null}
        <span>{category.name}</span>
      </div>

      <header className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">{category.name}</h1>
            <p className="page-subtitle">{category.description}</p>
            <div className="category-nav-chips" style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <Link to="/produse" className="filter-chip" style={{ textDecoration: 'none' }}>
                Toate produsele
              </Link>
              {getTopLevelCategories().map((c) => {
                const isActive = c.slug === categorySlug || c.slug === category?.parentSlug
                return (
                  <Link
                    key={c.slug}
                    to={`/categorie/${c.slug}`}
                    className={`filter-chip${isActive ? ' active' : ''}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {c.name}
                  </Link>
                )
              })}
            </div>
            {subcategories.length > 0 && (
              <div className="subcategory-chips" style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    to={`/categorie/${sub.slug}`}
                    className="filter-chip"
                    style={{ textDecoration: 'none' }}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="page-meta page-meta-filter-hint">
            Filtrează după preț, dimensiune, material și tip pentru a găsi exact produsul potrivit.
          </div>
        </div>
      </header>

      <div className="layout-grid">
        <FilterSidebar
          allProducts={allCategoryProducts}
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
          priceMin={priceMin}
          priceMax={priceMax}
          onPriceMinChange={setPriceMin}
          onPriceMaxChange={setPriceMax}
        />

        <div>
          <div className="page-meta" style={{ marginBottom: '0.8rem' }}>
            {filtered.length} rezultate
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

