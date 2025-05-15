import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InquiriesTable } from "@/components/admin/inquiries-table"
import { InquiriesChart } from "@/components/admin/inquiries-chart"

export const metadata = {
  title: "Inquiries | Admin Dashboard",
  description: "Manage customer inquiries and contact form submissions",
}

export default function InquiriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Inquiries</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inquiry Trends</CardTitle>
          <CardDescription>Monthly inquiry volume over time</CardDescription>
        </CardHeader>
        <CardContent>
          <InquiriesChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Inquiries</CardTitle>
          <CardDescription>Manage and respond to customer inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <InquiriesTable />
        </CardContent>
      </Card>
    </div>
  )
}
