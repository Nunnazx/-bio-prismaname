'use server'

import { prisma } from '@/lib/prisma'

export async function getCartStats() {
  try {
    // Get total active carts
    const totalCarts = await prisma.cart.count({
      where: {
        status: 'ACTIVE',
        items: {
          some: {}
        }
      }
    })

    // Get total cart items
    const totalCartItems = await prisma.cartItem.count()

    // Get carts created today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const cartsToday = await prisma.cart.count({
      where: {
        createdAt: {
          gte: today
        },
        status: 'ACTIVE'
      }
    })

    // Get abandoned carts (older than 24 hours with no activity)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    const abandonedCarts = await prisma.cart.count({
      where: {
        updatedAt: {
          lt: yesterday
        },
        status: 'ACTIVE',
        items: {
          some: {}
        }
      }
    })

    // Get total cart value
    const cartValues = await prisma.cart.findMany({
      where: {
        status: 'ACTIVE',
        items: {
          some: {}
        }
      },
      select: {
        total: true
      }
    })

    const totalCartValue = cartValues.reduce((sum, cart) => sum + cart.total, 0)

    // Get average cart value
    const averageCartValue = totalCarts > 0 ? totalCartValue / totalCarts : 0

    return {
      totalCarts,
      totalCartItems,
      cartsToday,
      abandonedCarts,
      totalCartValue,
      averageCartValue
    }
  } catch (error) {
    console.error('Error fetching cart stats:', error)
    return {
      totalCarts: 0,
      totalCartItems: 0,
      cartsToday: 0,
      abandonedCarts: 0,
      totalCartValue: 0,
      averageCartValue: 0
    }
  }
}

export async function getOrderStats() {
  try {
    // Get total orders
    const totalOrders = await prisma.order.count()

    // Get orders by status
    const pendingOrders = await prisma.order.count({
      where: { status: 'PENDING' }
    })

    const confirmedOrders = await prisma.order.count({
      where: { status: 'CONFIRMED' }
    })

    const shippedOrders = await prisma.order.count({
      where: { status: 'SHIPPED' }
    })

    const deliveredOrders = await prisma.order.count({
      where: { status: 'DELIVERED' }
    })

    // Get orders created today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const ordersToday = await prisma.order.count({
      where: {
        createdAt: {
          gte: today
        }
      }
    })

    // Get total revenue
    const orders = await prisma.order.findMany({
      where: {
        paymentStatus: 'PAID'
      },
      select: {
        total: true
      }
    })

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

    // Get average order value
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    return {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      ordersToday,
      totalRevenue,
      averageOrderValue
    }
  } catch (error) {
    console.error('Error fetching order stats:', error)
    return {
      totalOrders: 0,
      pendingOrders: 0,
      confirmedOrders: 0,
      shippedOrders: 0,
      deliveredOrders: 0,
      ordersToday: 0,
      totalRevenue: 0,
      averageOrderValue: 0
    }
  }
}

export async function getRecentCarts(limit = 10) {
  try {
    const recentCarts = await prisma.cart.findMany({
      where: {
        status: 'ACTIVE',
        items: {
          some: {}
        }
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                code: true
              }
            }
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: limit
    })

    return recentCarts
  } catch (error) {
    console.error('Error fetching recent carts:', error)
    return []
  }
}