import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { CartItem, Order, Product } from '../types'
import { PRODUCTS } from '../types'

interface CartContextType {
  items: CartItem[]
  addItem: (product: (typeof PRODUCTS)[number]) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  orders: Order[]
  placeOrder: (shippingAddress: Order['shippingAddress']) => void
  wishlist: Product[]
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const WISHLIST_STORAGE_KEY = 'shopwave-wishlist'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch {
      // ignore parse errors
    }
    return []
  })

  const addItem = useCallback((product: (typeof PRODUCTS)[number]) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const placeOrder = useCallback(
    (shippingAddress: Order['shippingAddress']) => {
      const order: Order = {
        id: `ORD-${Date.now()}`,
        items: [...items],
        total: totalPrice,
        status: 'pending',
        date: new Date().toISOString(),
        shippingAddress,
      }
      setOrders((prev) => [order, ...prev])
      setItems([])
    },
    [items, totalPrice]
  )

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      const next = exists ? prev.filter((p) => p.id !== product.id) : [...prev, product]
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignore storage errors
      }
      return next
    })
  }, [])

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.some((p) => p.id === productId)
    },
    [wishlist]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        orders,
        placeOrder,
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
