"use client"

import { useState } from 'react'
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/components/ui/use-toast'

interface AddToCartButtonProps {
  product: any
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  showQuantitySelector?: boolean
  className?: string
}

export function AddToCartButton({ 
  product, 
  variant = 'default',
  size = 'md',
  showQuantitySelector = true,
  className = ''
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    if (!product.price || product.price === 'Contact for pricing') {
      toast({
        title: "Contact Required",
        description: "Please contact us for pricing and availability of this product.",
        variant: "default"
      })
      return
    }

    setIsAdding(true)
    
    try {
      addToCart(product, quantity)
      
      setJustAdded(true)
      toast({
        title: "Added to Cart",
        description: `${quantity} x ${product.name} added to your cart.`,
      })
      
      // Reset the "just added" state after 2 seconds
      setTimeout(() => {
        setJustAdded(false)
      }, 2000)
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsAdding(false)
    }
  }

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99))
  }

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1))
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    setQuantity(Math.max(1, Math.min(value, 99)))
  }

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg'
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  // Check if product has valid pricing
  const hasValidPrice = product.price && 
    product.price !== 'Contact for pricing' && 
    product.price !== '0' &&
    product.price !== 0

  if (!hasValidPrice) {
    return (
      <Button 
        variant="outline" 
        className={`${sizeClasses[size]} ${className}`}
        onClick={handleAddToCart}
      >
        <ShoppingCart className={`${iconSizes[size]} mr-2`} />
        Request Quote
      </Button>
    )
  }

  return (
    <div className="space-y-3">
      {showQuantitySelector && (
        <div className="flex items-center gap-2">
          <Label htmlFor="quantity" className="text-sm font-medium">
            Quantity:
          </Label>
          <div className="flex items-center border rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              id="quantity"
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 w-16 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={incrementQuantity}
              disabled={quantity >= 99}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      <Button
        variant={variant}
        className={`${sizeClasses[size]} ${className} ${
          justAdded ? 'bg-green-600 hover:bg-green-700' : ''
        }`}
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Adding...
          </>
        ) : justAdded ? (
          <>
            <Check className={`${iconSizes[size]} mr-2`} />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className={`${iconSizes[size]} mr-2`} />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  )
}