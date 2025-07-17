import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { PopularContent } from "@/components/admin/popular-content"
import { getAnalyticsSummary, getTrafficData, getPopularPages } from "@/app/actions/analytics"
import { Eye, Users, Clock, TrendingUp, Globe, Smartphone, Monitor, Tablet } from "lucide-react"

export const metadata = {
  title: "Analytics | Admin Dashboard",
  description: "Website analytics and performance metrics",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AnalyticsPage() {
  const summary = await getAnalyticsSummary()
  const trafficData = await getTrafficData()
  const popularPages = await getPopularPages()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pageviews</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalPageviews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className={summary.pageviewsGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                {summary.pageviewsGrowth >= 0 ? "+" : ""}{summary.pageviewsGrowth}%
              </span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className={summary.visitorsGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                {summary.visitorsGrowth >= 0 ? "+" : ""}{summary.visitorsGrowth}%
              </span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.avgSessionDuration}</div>
            <p className="text-xs text-muted-foreground">
              <span className={summary.sessionGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                {summary.sessionGrowth >= 0 ? "+" : ""}{summary.sessionGrowth}%
              </span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.bounceRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className={summary.bounceRateChange <= 0 ? "text-green-600" : "text-red-600"}>
                {summary.bounceRateChange <= 0 ? "" : "+"}{summary.bounceRateChange}%
              </span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Website traffic over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading chart...</div>}>
                  <AnalyticsDashboard data={trafficData} />
                </Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Content</CardTitle>
                <CardDescription>Most visited pages and posts</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading content...</div>}>
                  <PopularContent pages={popularPages} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Organic Search</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.organicTraffic}%</div>
                <p className="text-xs text-muted-foreground">
                  {summary.organicVisitors.toLocaleString()} visitors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Direct Traffic</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.directTraffic}%</div>
                <p className="text-xs text-muted-foreground">
                  {summary.directVisitors.toLocaleString()} visitors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Referral Traffic</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.referralTraffic}%</div>
                <p className="text-xs text-muted-foreground">
                  {summary.referralVisitors.toLocaleString()} visitors
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Desktop</CardTitle>
                <Monitor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.desktopTraffic}%</div>
                <p className="text-xs text-muted-foreground">
                  {summary.desktopVisitors.toLocaleString()} visitors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mobile</CardTitle>
                <Smartphone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.mobileTraffic}%</div>
                <p className="text-xs text-muted-foreground">
                  {summary.mobileVisitors.toLocaleString()} visitors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tablet</CardTitle>
                <Tablet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summary.tabletTraffic}%</div>
                <p className="text-xs text-muted-foreground">
                  {summary.tabletVisitors.toLocaleString()} visitors
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
              <CardDescription>Visitors by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {summary.topCountries.map((country, index) => (
                  <div key={country.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{index + 1}.</span>
                      <span>{country.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {country.visitors.toLocaleString()} ({country.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Most popular pages and blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Loading content performance...</div>}>
                <PopularContent pages={popularPages} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}