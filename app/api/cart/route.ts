import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'

// Get cart
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('cart-session')?.value || uuidv4()

    let cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          sessionId,
          status: 'ACTIVE',
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })
    }

    const response = NextResponse.json(cart)
    response.cookies.set('cart-session', sessionId, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })

    return response
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

// Add item to cart
export async function POST(request: NextRequest) {
  try {
    const { productId, quantity = 1 } = await request.json()
    
    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const sessionId = cookieStore.get('cart-session')?.value || uuidv4()

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { sessionId }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          sessionId,
          status: 'ACTIVE',
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      })
    }

    // Get product details
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: productId
      }
    })

    let cartItem
    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
          totalPrice: (existingItem.quantity + quantity) * (product.price || 0)
        }
      })
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
          unitPrice: product.price || 0,
          totalPrice: quantity * (product.price || 0),
          productName: product.name,
          productCode: product.code,
          productImage: product.primaryImage,
          specifications: product.specifications
        }
      })
    }

    // Update cart totals
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId: cart.id }
    })

    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
    
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        subtotal,
        total: subtotal,
        updatedAt: new Date()
      }
    })

    // Get updated cart with items
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    const response = NextResponse.json(updatedCart)
    response.cookies.set('cart-session', sessionId, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })

    return response
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 })
  }
}