"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { CartItem, Product } from "@/types"

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; selectedSize?: string; selectedColor: string } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, selectedSize, selectedColor } = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor,
      )

      let newItems: CartItem[]
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        newItems = [...state.items, { product, quantity: 1, selectedSize, selectedColor }]
      }

      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.product.id !== action.payload)
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      return { items: newItems, total, itemCount }
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload
      const newItems =
        quantity === 0
          ? state.items.filter((item) => item.product.id !== id)
          : state.items.map((item) => (item.product.id === id ? { ...item, quantity } : item))
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
      return { items: newItems, total, itemCount }
    }
    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0 }
    case "LOAD_CART": {
      const items = action.payload
      const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
      return { items, total, itemCount }
    }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  })

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
