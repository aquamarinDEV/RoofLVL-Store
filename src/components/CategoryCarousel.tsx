import { useRef } from 'react'
import type { Category } from '../data/categories'
import { CategoryCard } from './CategoryCard'

interface Props {
  categories: Category[]
}

export function CategoryCarousel({ categories }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(dir: 'prev' | 'next') {
    const el = scrollRef.current
    if (!el) return
    const step = el.clientWidth * 0.6
    el.scrollBy({ left: dir === 'prev' ? -step : step, behavior: 'smooth' })
  }

  return (
    <div className="category-carousel">
      <button
        type="button"
        className="carousel-btn carousel-btn-prev"
        onClick={() => scroll('prev')}
        aria-label="Categorii anterioare"
      >
        ‹
      </button>
      <div className="category-carousel-track" ref={scrollRef}>
        {categories.map((category) => (
          <div key={category.id} className="category-carousel-slide">
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="carousel-btn carousel-btn-next"
        onClick={() => scroll('next')}
        aria-label="Categorii următoare"
      >
        ›
      </button>
    </div>
  )
}
