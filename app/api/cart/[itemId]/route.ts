import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

// Update cart item quantity
export async function PATCH(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const { quantity } = await request.json()
    const { itemId } = params

    if (!quantity || quantity < 0) {
      return NextResponse.json({ error: 'Valid quantity is required' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const sessionId = cookieStore.get('cart-session')?.value

    if (!sessionId) {
      return NextResponse.json({ error: 'No cart session found' }, { status: 404 })
    }

    // Get cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: {
        cart: true,
        product: true
      }
    })

    if (!cartItem || cartItem.cart.sessionId !== sessionId) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 })
    }

    // Update cart item
    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: {
        quantity,
        totalPrice: quantity * cartItem.unitPrice
      }
    })

    // Update cart totals
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cartItem.cartId }
    })

    const subtotal = cartItems.reduce((sum, item) => 
      item.id === itemId ? sum + (quantity * item.unitPrice) : sum + item.totalPrice, 0
    )

    await prisma.cart.update({
      where: { id: cartItem.cartId },
      data: {
        subtotal,
        total: subtotal,
        updatedAt: new Date()
      }
    })

    // Get updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cartItem.cartId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(updatedCart)
  } catch (error) {
    console.error('Error updating cart item:', error)
    return NextResponse.json({ error: 'Failed to update cart item' }, { status: 500 })
  }
}

// Remove cart item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const { itemId } = params

    const cookieStore = await cookies()
    const sessionId = cookieStore.get('cart-session')?.value

    if (!sessionId) {
      return NextResponse.json({ error: 'No cart session found' }, { status: 404 })
    }

    // Get cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: {
        cart: true
      }
    })

    if (!cartItem || cartItem.cart.sessionId !== sessionId) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 })
    }

    // Delete cart item
    await prisma.cartItem.delete({
      where: { id: itemId }
    })

    // Update cart totals
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cartItem.cartId }
    })

    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0)

    await prisma.cart.update({
      where: { id: cartItem.cartId },
      data: {
        subtotal,
        total: subtotal,
        updatedAt: new Date()
      }
    })

    // Get updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cartItem.cartId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(updatedCart)
  } catch (error) {
    console.error('Error removing cart item:', error)
    return NextResponse.json({ error: 'Failed to remove cart item' }, { status: 500 })
  }
}