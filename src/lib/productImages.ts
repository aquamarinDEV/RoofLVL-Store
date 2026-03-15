/* eslint-disable @typescript-eslint/no-explicit-any */
import CuieInBandaHartieImg from '../assets/CuieInBandaHartie.jpg'
import CuieTipTImg from '../assets/CuieTipT.avif'
import AlubandImg from '../assets/Aluband.jpg'
import CuieDeBetonImg from '../assets/CuieDeBeton.jpeg'
import SortJgheabImg from '../assets/SortJgheab.jpg.webp'
import DoliiImg from '../assets/Dolii.jpeg'
import ParazapeziImg from '../assets/Parazapezi.jpg.webp'
import BorduraFrontonImg from '../assets/BorduraFronton.jpeg'
import BorduraPereteImg from '../assets/BorduraPerete.jpeg'
import PazieImg from '../assets/Pazie.jpg.jpg'

const coamaModules = import.meta.glob<{ default: string }>(
  [
    '../assets/Coama*.jpg.webp',
    '../assets/Coama*.webp',
    '../assets/cOAMA*.jpg.webp',
    '../assets/Coamamica*.webp',
  ],
  { eager: true },
)

function getCoamaImageKeys(): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [path, mod] of Object.entries(coamaModules)) {
    const name = path.split('/').pop()?.replace(/\.(jpg\.webp|webp)$/i, '') ?? ''
    if (name && mod?.default) out[name] = mod.default
  }
  return out
}

export const productImages: Record<string, string> = {
  CuieInBandaHartie: CuieInBandaHartieImg,
  CuieTipT: CuieTipTImg,
  Aluband: AlubandImg,
  CuieDeBeton: CuieDeBetonImg,
  SortJgheab: SortJgheabImg,
  Dolii: DoliiImg,
  Parazapezi: ParazapeziImg,
  BorduraFronton: BorduraFrontonImg,
  BorduraPerete: BorduraPereteImg,
  Pazie: PazieImg,
  ...getCoamaImageKeys(),
}
