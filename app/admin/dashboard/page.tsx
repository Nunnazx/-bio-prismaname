import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAnalyticsSummary } from "@/app/actions/analytics"
import { getInquiryStats } from "@/app/actions/inquiries"
import { getProductStats } from "@/app/actions/products"
import { getCartStats, getOrderStats } from "@/app/actions/cart"
import AnalyticsOverview from "@/components/admin/analytics-overview"
import RecentInquiries from "@/components/admin/recent-inquiries"
import RecentBlogPosts from "@/components/admin/recent-blog-posts"
import ProductsOverview from "@/components/admin/products-overview"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function DashboardPage() {
  // Fetch data for dashboard
  const analyticsSummary = await getAnalyticsSummary()
  const inquiryStats = await getInquiryStats()
  const productStats = await getProductStats()
  const cartStats = await getCartStats()
  const orderStats = await getOrderStats()

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="ecommerce">Ecommerce</TabsTrigger>
              <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Pageviews</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsSummary.totalPageviews?.toLocaleString() || '0'}</div>
                    <p className="text-xs text-muted-foreground">
                      +{analyticsSummary.pageviewsGrowth || 0}% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsSummary.totalVisitors?.toLocaleString() || '0'}</div>
                    <p className="text-xs text-muted-foreground">+{analyticsSummary.visitorsGrowth || 0}% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{inquiryStats.new}</div>
                    <p className="text-xs text-muted-foreground">{inquiryStats.total} total inquiries</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{productStats.active}</div>
                    <p className="text-xs text-muted-foreground">{productStats.total} total products</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Ecommerce Statistics */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Carts</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v6a2 2 0 002 2h2a2 2 0 002-2v-6m0 0V9a2 2 0 012-2h2a2 2 0 012 2v4.01" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{cartStats.totalCarts}</div>
                    <p className="text-xs text-muted-foreground">{cartStats.cartsToday} created today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4-2v4m0 0V2m0 2h2m-2 0H8" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orderStats.totalOrders}</div>
                    <p className="text-xs text-muted-foreground">{orderStats.ordersToday} orders today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Cart Value</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{cartStats.totalCartValue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Avg: ₹{Math.round(cartStats.averageCartValue)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{orderStats.totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Avg: ₹{Math.round(orderStats.averageOrderValue)}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Website Traffic</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Suspense
                      fallback={<div className="h-[350px] flex items-center justify-center">Loading chart...</div>}
                    >
                      <AnalyticsOverview />
                    </Suspense>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                    <CardDescription>{inquiryStats.new} new inquiries this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense
                      fallback={<div className="h-[350px] flex items-center justify-center">Loading inquiries...</div>}
                    >
                      <RecentInquiries />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Blog Posts</CardTitle>
                    <CardDescription>Latest content published on the site</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense
                      fallback={<div className="h-[350px] flex items-center justify-center">Loading blog posts...</div>}
                    >
                      <RecentBlogPosts />
                    </Suspense>
                  </CardContent>
                </Card>
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Product Overview</CardTitle>
                    <CardDescription>Product performance and inventory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense
                      fallback={<div className="h-[350px] flex items-center justify-center">Loading products...</div>}
                    >
                      <ProductsOverview />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="ecommerce" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Carts</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v6a2 2 0 002 2h2a2 2 0 002-2v-6m0 0V9a2 2 0 012-2h2a2 2 0 012 2v4.01" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{cartStats.totalCarts}</div>
                    <p className="text-xs text-muted-foreground">{cartStats.cartsToday} created today</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Abandoned Carts</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v6a2 2 0 002 2h2a2 2 0 002-2v-6m0 0V9a2 2 0 012-2h2a2 2 0 012 2v4.01" />
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
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
                    <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orderStats.pendingOrders}</div>
                    <p className="text-xs text-muted-foreground">{orderStats.confirmedOrders} confirmed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Shipped Orders</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 3h5v5M21 3l-7 7M8 3H3v5M3 3l7 7M16 21h5v-5M21 21l-7-7M8 21H3v-5M3 21l7-7" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orderStats.shippedOrders}</div>
                    <p className="text-xs text-muted-foreground">{orderStats.deliveredOrders} delivered</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Cart Value</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{cartStats.totalCartValue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">{cartStats.totalCartItems} items in carts</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Cart Value</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{Math.round(cartStats.averageCartValue).toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">per active cart</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{orderStats.totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">from {orderStats.totalOrders} orders</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{Math.round(orderStats.averageOrderValue).toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">per completed order</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Cart Activity</CardTitle>
                    <CardDescription>Latest shopping cart interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        Cart activity tracking will be displayed here once implemented.
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Order Status Breakdown</CardTitle>
                    <CardDescription>Current order pipeline</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending</span>
                        <span className="text-sm font-medium">{orderStats.pendingOrders}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Confirmed</span>
                        <span className="text-sm font-medium">{orderStats.confirmedOrders}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Shipped</span>
                        <span className="text-sm font-medium">{orderStats.shippedOrders}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Delivered</span>
                        <span className="text-sm font-medium">{orderStats.deliveredOrders}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
