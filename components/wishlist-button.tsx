"use client"

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface WishlistButtonProps {
  productId: string
  productName: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export function WishlistButton({
  productId,
  productName,
  variant = 'outline',
  size = 'md',
  showText = true,
  className = ''
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if product is in wishlist on mount
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('biodegradable-wishlist') || '[]')
      setIsInWishlist(wishlist.includes(productId))
    }
  }, [productId])

  const toggleWishlist = async () => {
    if (typeof window === 'undefined') return
    
    setIsLoading(true)
    
    try {
      // Get current wishlist
      const wishlist = JSON.parse(localStorage.getItem('biodegradable-wishlist') || '[]')
      
      // Toggle product in wishlist
      if (isInWishlist) {
        const updatedWishlist = wishlist.filter((id: string) => id !== productId)
        localStorage.setItem('biodegradable-wishlist', JSON.stringify(updatedWishlist))
        setIsInWishlist(false)
        
        toast({
          title: "Removed from Wishlist",
          description: `${productName} has been removed from your wishlist.`,
        })
      } else {
        const updatedWishlist = [...wishlist, productId]
        localStorage.setItem('biodegradable-wishlist', JSON.stringify(updatedWishlist))
        setIsInWishlist(true)
        
        toast({
          title: "Added to Wishlist",
          description: `${productName} has been added to your wishlist.`,
        })
      }
    } catch (error) {
      console.error('Error updating wishlist:', error)
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: showText ? 'h-8 px-3 text-sm' : 'h-8 w-8 p-0',
    md: showText ? 'h-10 px-4' : 'h-10 w-10 p-0',
    lg: showText ? 'h-12 px-6 text-lg' : 'h-12 w-12 p-0'
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`${sizeClasses[size]} ${className} ${
        isInWishlist ? 'text-red-500 hover:text-red-600' : ''
      }`}
      onClick={toggleWishlist}
      disabled={isLoading}
    >
      <Heart
        className={`${iconSizes[size]} ${showText ? 'mr-2' : ''} ${
          isInWishlist ? 'fill-current' : ''
        }`}
      />
      {showText && (isInWishlist ? 'Saved' : 'Save')}
    </Button>
  )
}