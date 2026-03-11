import { Link } from 'react-router-dom'
import type { Category } from '../data/categories'
import cuieInBandaImg from '../assets/cuieInBanda.svg'
import cuieBetonImg from '../assets/CuieBeton.svg'
import alubandImg from '../assets/Aluband.svg'
import accesoriiImg from '../assets/Accesorii.svg'

const categoryImages: Record<string, string> = {
  'cuie-in-banda': cuieInBandaImg,
  'cuie-finisaj': cuieInBandaImg,
  'cuie-beton': cuieBetonImg,
  aluband: alubandImg,
  'accesorii-tigla-metalica': accesoriiImg,
}

interface Props {
  category: Category
}

export function CategoryCard({ category }: Props) {
  const image = categoryImages[category.slug]

  return (
    <Link to={`/categorie/${category.slug}`} className="category-card">
      <div className="category-image-wrap">
        {image ? (
          <img src={image} alt="" className="category-image" />
        ) : (
          <span className="category-icon" aria-hidden>
            {category.icon}
          </span>
        )}
      </div>
      <div className="category-name">{category.name}</div>
      <div className="category-meta">{category.description}</div>
    </Link>
  )
}
