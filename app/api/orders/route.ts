import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

// Create a new order from cart
export async function POST(request: NextRequest) {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      company,
      billingAddress,
      shippingAddress,
      sameAsBilling = true,
      paymentMethod,
      customerNotes
    } = await request.json()

    // Validate required fields
    if (!customerName || !customerEmail || !billingAddress) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      )
    }

    const cookieStore = cookies()
    const sessionId = cookieStore.get('cart-session')?.value

    if (!sessionId) {
      return NextResponse.json(
        { error: 'No cart session found' },
        { status: 404 }
      )
    }

    // Get the cart with items
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty or not found' },
        { status: 404 }
      )
    }

    // Generate order number
    const orderCount = await prisma.order.count()
    const orderNumber = `ORD-${Date.now()}-${String(orderCount + 1).padStart(4, '0')}`

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0)
    const tax = subtotal * 0.18 // 18% GST
    const shipping = subtotal > 1000 ? 0 : 100 // Free shipping over ₹1000
    const total = subtotal + tax + shipping

    // Create the order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        sessionId,
        customerName,
        customerEmail,
        customerPhone,
        company,
        billingAddress,
        shippingAddress: sameAsBilling ? billingAddress : shippingAddress,
        sameAsBilling,
        subtotal,
        tax,
        shipping,
        total,
        paymentMethod,
        customerNotes,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        fulfillmentStatus: 'UNFULFILLED',
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            productName: item.productName,
            productCode: item.productCode,
            productImage: item.productImage,
            specifications: item.specifications
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    // Mark cart as converted
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        status: 'CONVERTED'
      }
    })

    // Clear cart items (optional - you might want to keep for order history)
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    })

    return NextResponse.json({
      success: true,
      order,
      message: 'Order created successfully'
    })

  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// Get orders (for admin or customer)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const customerEmail = searchParams.get('customerEmail')
    const orderNumber = searchParams.get('orderNumber')
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = {}
    
    if (customerEmail) {
      where.customerEmail = customerEmail
    }
    
    if (orderNumber) {
      where.orderNumber = orderNumber
    }
    
    if (status) {
      where.status = status
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                code: true,
                primaryImage: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    return NextResponse.json(orders)

  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}