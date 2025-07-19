"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  code: string
  imageUrl?: string
  specifications?: any
  productId: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  loading: boolean
  error: string | null
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CART'; payload: any }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_CART': {
      const cart = action.payload
      const items = cart.items?.map((item: any) => ({
        id: item.id,
        productId: item.productId,
        name: item.productName,
        price: item.unitPrice,
        quantity: item.quantity,
        code: item.productCode,
        imageUrl: item.productImage,
        specifications: item.specifications
      })) || []
      
      return {
        ...state,
        items,
        total: cart.total || 0,
        itemCount: items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
        loading: false,
        error: null
      }
    }
    
    case 'CLEAR_CART':
      return { ...initialState }
    
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addToCart: (item: any, quantity?: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => void
  fetchCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Fetch cart from API
  const fetchCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/cart')
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart')
      }
      
      const cart = await response.json()
      dispatch({ type: 'SET_CART', payload: cart })
    } catch (error) {
      console.error('Error fetching cart:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' })
    }
  }

  // Load cart on mount
  useEffect(() => {
    fetchCart()
  }, [])

  const addToCart = async (product: any, quantity = 1) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity
        })
      })

      if (!response.ok) {
        throw new Error('Failed to add item to cart')
      }

      const cart = await response.json()
      dispatch({ type: 'SET_CART', payload: cart })
    } catch (error) {
      console.error('Error adding to cart:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' })
      throw error // Re-throw so components can handle it
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to remove item from cart')
      }

      const cart = await response.json()
      dispatch({ type: 'SET_CART', payload: cart })
    } catch (error) {
      console.error('Error removing from cart:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' })
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })
      
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity })
      })

      if (!response.ok) {
        throw new Error('Failed to update cart item')
      }

      const cart = await response.json()
      dispatch({ type: 'SET_CART', payload: cart })
    } catch (error) {
      console.error('Error updating cart:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update cart item' })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      fetchCart
    }}>
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