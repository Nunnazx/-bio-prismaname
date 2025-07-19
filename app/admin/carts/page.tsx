import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCartStats, getRecentCarts } from "@/app/actions/cart"
import { formatDistanceToNow } from "date-fns"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function CartsPage() {
  const cartStats = await getCartStats()
  const recentCarts = await getRecentCarts(20)

  const getCartStatus = (cart: any) => {
    const lastUpdated = new Date(cart.updatedAt)
    const hoursAgo = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60)
    
    if (hoursAgo > 24) {
      return { status: 'Abandoned', color: 'bg-red-100 text-red-800' }
    } else if (hoursAgo > 1) {
      return { status: 'Inactive', color: 'bg-yellow-100 text-yellow-800' }
    } else {
      return { status: 'Active', color: 'bg-green-100 text-green-800' }
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Shopping Carts</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export Data</Button>
          <Button>Send Reminders</Button>
        </div>
      </div>

      {/* Cart Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Carts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cartStats.totalCarts}</div>
            <p className="text-xs text-muted-foreground">{cartStats.cartsToday} created today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abandoned Carts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cartStats.abandonedCarts}</div>
            <p className="text-xs text-muted-foreground">
              {cartStats.totalCarts > 0 ? Math.round((cartStats.abandonedCarts / cartStats.totalCarts) * 100) : 0}% abandonment rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cart Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{cartStats.totalCartValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{cartStats.totalCartItems} items total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Cart Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{Math.round(cartStats.averageCartValue).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per active cart</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Carts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Shopping Carts</CardTitle>
          <CardDescription>Latest cart activity and customer behavior</CardDescription>
        </CardHeader>
        <CardContent>
          {recentCarts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No active carts found</p>
              <p className="text-sm text-muted-foreground mt-2">Customer carts will appear here once they start shopping</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentCarts.map((cart) => {
                const cartStatus = getCartStatus(cart)
                return (
                  <div key={cart.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Cart #{cart.sessionId.slice(-8)}</p>
                        <Badge className={cartStatus.color}>
                          {cartStatus.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cart.items.length} items • Last updated {formatDistanceToNow(new Date(cart.updatedAt))} ago
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Items: {cart.items.map(item => `${item.quantity}x ${item.productName}`).join(', ')}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{cart.total.toLocaleString()}</p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {cartStatus.status === 'Abandoned' && (
                          <Button variant="default" size="sm">
                            Send Reminder
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}