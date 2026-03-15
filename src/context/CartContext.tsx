import { createContext, useContext, useMemo, useReducer } from 'react'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  quantity: number
  /** Variant ales (ex. RAL pentru dolii) */
  selectedRal?: string
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number; selectedRal?: string }
  | { type: 'REMOVE_ITEM'; productId: string; selectedRal?: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number; selectedRal?: string }
  | { type: 'CLEAR' }

interface CartContextValue {
  state: CartState
  addToCart: (product: Product, quantity?: number, selectedRal?: string) => void
  removeFromCart: (productId: string, selectedRal?: string) => void
  setQuantity: (productId: string, quantity: number, selectedRal?: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

function matchItem(i: CartItem, productId: string, selectedRal?: string) {
  if (i.product.id !== productId) return false
  const a = i.selectedRal ?? ''
  const b = selectedRal ?? ''
  return a === b
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const qty = action.quantity ?? 1
      const selectedRal = action.selectedRal
      const existing = state.items.find((i) => matchItem(i, action.product.id, selectedRal))
      if (existing) {
        return {
          items: state.items.map((i) =>
            matchItem(i, action.product.id, selectedRal)
              ? { ...i, quantity: i.quantity + qty }
              : i,
          ),
        }
      }
      return {
        items: [...state.items, { product: action.product, quantity: qty, selectedRal }],
      }
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((i) => !matchItem(i, action.productId, action.selectedRal)),
      }
    case 'SET_QUANTITY': {
      const nextItems = state.items
        .map((i) =>
          matchItem(i, action.productId, action.selectedRal)
            ? { ...i, quantity: action.quantity }
            : i,
        )
        .filter((i) => i.quantity > 0)
      return { items: nextItems }
    }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      addToCart(product, quantity, selectedRal) {
        dispatch({ type: 'ADD_ITEM', product, quantity, selectedRal })
      },
      removeFromCart(productId, selectedRal) {
        dispatch({ type: 'REMOVE_ITEM', productId, selectedRal })
      },
      setQuantity(productId, quantity, selectedRal) {
        dispatch({ type: 'SET_QUANTITY', productId, quantity, selectedRal })
      },
      clearCart() {
        dispatch({ type: 'CLEAR' })
      },
    }),
    [state],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider')
  }
  return ctx
}

