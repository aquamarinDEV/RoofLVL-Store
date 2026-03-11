import type { CategorySlug } from '../data/categories'
import type { Product } from '../data/products'

interface Category {
  id: string
  name: string
  slug: string
}

interface Props {
  allProducts: Product[]
  activeDimensions: string[]
  activeMaterials: string[]
  activeTypes: string[]
  onToggleDimension: (value: string) => void
  onToggleMaterial: (value: string) => void
  onToggleType: (value: string) => void
  /** Optional: filtru categorie (doar pe pagina Toate produsele) */
  categories?: Category[]
  activeCategories?: string[]
  onToggleCategory?: (slug: string) => void
  /** Optional: filtru preț */
  priceMin?: number | ''
  priceMax?: number | ''
  onPriceMinChange?: (value: number | '') => void
  onPriceMaxChange?: (value: number | '') => void
}

export function FilterSidebar({
  allProducts,
  activeDimensions,
  activeMaterials,
  activeTypes,
  onToggleDimension,
  onToggleMaterial,
  onToggleType,
  categories,
  activeCategories = [],
  onToggleCategory,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
}: Props) {
  const dimensions = Array.from(new Set(allProducts.map((p) => p.dimensions).filter(Boolean))).slice(
    0,
    10,
  )
  const materials = Array.from(new Set(allProducts.map((p) => p.material))).slice(0, 8)
  const types = Array.from(
    new Set(
      allProducts
        .flatMap((p) => [p.headType, p.driveType].filter(Boolean) as string[])
        .filter(Boolean),
    ),
  ).slice(0, 10)

  const categorySlugsInProducts = new Set(allProducts.map((p) => p.categorySlug))
  const shownCategories =
    categories?.filter((c) => categorySlugsInProducts.has(c.slug as CategorySlug)) ?? []

  return (
    <aside className="filter-panel">
      <div className="filter-header">
        <div className="filter-title">Filtre</div>
        <div className="filter-badge">{allProducts.length} produse</div>
      </div>

      {onToggleCategory && shownCategories.length > 0 && (
        <div className="filter-group">
          <div className="filter-group-label">Categorie</div>
          <div className="filter-options">
            {shownCategories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                className={`filter-chip ${activeCategories.includes(cat.slug) ? 'active' : ''}`}
                onClick={() => onToggleCategory(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {onPriceMinChange != null && onPriceMaxChange != null && (
        <div className="filter-group">
          <div className="filter-group-label">Preț (RON)</div>
          <div className="filter-price-row">
            <input
              type="number"
              min={0}
              step={1}
              placeholder="Min"
              className="filter-price-input"
              value={priceMin ?? ''}
              onChange={(e) => {
                const v = e.target.value
                onPriceMinChange(v === '' ? '' : Number(v))
              }}
            />
            <span className="filter-price-sep">–</span>
            <input
              type="number"
              min={0}
              step={1}
              placeholder="Max"
              className="filter-price-input"
              value={priceMax ?? ''}
              onChange={(e) => {
                const v = e.target.value
                onPriceMaxChange(v === '' ? '' : Number(v))
              }}
            />
          </div>
        </div>
      )}

      {dimensions.length > 0 && (
        <div className="filter-group">
          <div className="filter-group-label">Dimensiune</div>
          <div className="filter-options">
            {dimensions.map((dim) => (
              <button
                key={dim}
                type="button"
                className={`filter-chip ${activeDimensions.includes(dim) ? 'active' : ''}`}
                onClick={() => onToggleDimension(dim)}
              >
                {dim}
              </button>
            ))}
          </div>
        </div>
      )}

      {materials.length > 0 && (
        <div className="filter-group">
          <div className="filter-group-label">Material</div>
          <div className="filter-options">
            {materials.map((mat) => (
              <button
                key={mat}
                type="button"
                className={`filter-chip ${activeMaterials.includes(mat) ? 'active' : ''}`}
                onClick={() => onToggleMaterial(mat)}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>
      )}

      {types.length > 0 && (
        <div className="filter-group">
          <div className="filter-group-label">Tip / Cap</div>
          <div className="filter-options">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                className={`filter-chip ${activeTypes.includes(t) ? 'active' : ''}`}
                onClick={() => onToggleType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}

