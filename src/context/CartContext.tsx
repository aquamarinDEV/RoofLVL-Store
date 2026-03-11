import { createContext, useContext, useMemo, useReducer } from 'react'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR' }

interface CartContextValue {
  state: CartState
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const qty = action.quantity ?? 1
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + qty }
              : i,
          ),
        }
      }
      return {
        items: [...state.items, { product: action.product, quantity: qty }],
      }
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter((i) => i.product.id !== action.productId),
      }
    case 'SET_QUANTITY': {
      const nextItems = state.items
        .map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i,
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
      addToCart(product, quantity) {
        dispatch({ type: 'ADD_ITEM', product, quantity })
      },
      removeFromCart(productId) {
        dispatch({ type: 'REMOVE_ITEM', productId })
      },
      setQuantity(productId, quantity) {
        dispatch({ type: 'SET_QUANTITY', productId, quantity })
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

