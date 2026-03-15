export type CategorySlug =
  | 'cuie-in-banda'
  | 'cuie-beton'
  | 'cuie-finisaj'
  | 'aluband'
  | 'accesorii-tigla-metalica'
  | 'coame'
  | 'dolii'
  | 'sorturi'
  | 'parazapezi'
  | 'frontoane'
  | 'alte-accesorii-acoperis'

export interface Category {
  id: string
  name: string
  slug: CategorySlug
  description: string
  icon: string
  highlights: string[]
  /** Slug-ul categoriei părinte (dacă e subcategorie) */
  parentSlug?: CategorySlug
}

export const categories: Category[] = [
  {
    id: 'cuie-in-banda',
    name: 'Cuie în bandă',
    slug: 'cuie-in-banda',
    description: 'Cuie în bandă pentru fixări rapide în construcții.',
    icon: '📎',
    highlights: ['Cuie în bandă', 'Fixări rapide'],
  },
  {
    id: 'cuie-beton',
    name: 'Cuie beton',
    slug: 'cuie-beton',
    description: 'Cuie întărite pentru beton și zidărie.',
    icon: '🔩',
    highlights: ['Cuie beton', 'Zidărie'],
  },
  {
    id: 'cuie-finisaj',
    name: 'Cuie finisaj',
    slug: 'cuie-finisaj',
    description: 'Cuie pentru finisaje și montaje delicate.',
    icon: '📌',
    highlights: ['Finisaj', 'Montaje delicate'],
  },
  {
    id: 'aluband',
    name: 'Aluband',
    slug: 'aluband',
    description: 'Produse Aluband pentru acoperișuri și construcții.',
    icon: '🏗️',
    highlights: ['Aluband', 'Acoperișuri'],
  },
  {
    id: 'accesorii-tigla-metalica',
    name: 'Accesorii acoperiș',
    slug: 'accesorii-tigla-metalica',
    description: 'Accesorii și profile pentru țiglă metalică și acoperișuri.',
    icon: '🔧',
    highlights: ['Accesorii montaj', 'Acoperișuri'],
  },
  {
    id: 'coame',
    name: 'Coame',
    slug: 'coame',
    description: 'Coame și profile pentru coamă.',
    icon: '🏠',
    highlights: ['Coamă', 'Ridicare'],
    parentSlug: 'accesorii-tigla-metalica',
  },
  {
    id: 'dolii',
    name: 'Dolii',
    slug: 'dolii',
    description: 'Dolii pentru scurgerea apei de ploaie.',
    icon: '🏠',
    highlights: ['Dolii', 'Scurgere'],
    parentSlug: 'accesorii-tigla-metalica',
  },
  {
    id: 'sorturi',
    name: 'Șorțuri',
    slug: 'sorturi',
    description: 'Șorțuri de acoperiș.',
    icon: '🏠',
    highlights: ['Șorțuri'],
    parentSlug: 'accesorii-tigla-metalica',
  },
  {
    id: 'parazapezi',
    name: 'Parazapezi',
    slug: 'parazapezi',
    description: 'Opritoare de zăpadă pentru acoperișuri.',
    icon: '❄️',
    highlights: ['Opritor de zăpadă', 'Siguranță acoperiș'],
    parentSlug: 'accesorii-tigla-metalica',
  },
  {
    id: 'frontoane',
    name: 'Frontoane',
    slug: 'frontoane',
    description: 'Borduri și profile pentru fronton.',
    icon: '🏠',
    highlights: ['Bordură fronton', 'Fronton'],
    parentSlug: 'accesorii-tigla-metalica',
  },
  {
    id: 'alte-accesorii-acoperis',
    name: 'Alte accesorii acoperiș',
    slug: 'alte-accesorii-acoperis',
    description: 'Alte accesorii pentru acoperiș și finisaj.',
    icon: '🔧',
    highlights: ['Bordură perete', 'Pazie acoperis', 'Accesorii'],
    parentSlug: 'accesorii-tigla-metalica',
  },
]

export function getTopLevelCategories(): Category[] {
  return categories.filter((c) => !c.parentSlug)
}

export function getSubcategories(parentSlug: CategorySlug): Category[] {
  return categories.filter((c) => c.parentSlug === parentSlug)
}

