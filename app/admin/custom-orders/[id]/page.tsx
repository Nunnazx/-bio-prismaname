import { notFound } from "next/navigation"
import { getCustomOrderById } from "@/app/actions/custom-orders"
import { CustomOrderDetail } from "@/components/admin/custom-order-detail"
import { QuotationForm } from "@/components/admin/quotation-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function CustomOrderDetailPage({ params }: { params: { id: string } }) {
  const order = await getCustomOrderById(params.id)

  if (!order) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/custom-orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Custom Order Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/custom-orders/${params.id}/edit`}>Edit Order</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="quotation">Quotation</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4 pt-4">
          <CustomOrderDetail order={order} />
        </TabsContent>
        <TabsContent value="quotation" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quotation Management</CardTitle>
              <CardDescription>
                {order.status === "quoted"
                  ? `Quotation ${order.quote_reference} was sent on ${new Date(
                      order.quote_sent_at,
                    ).toLocaleDateString()}`
                  : "Create a quotation for this custom order"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {order.status === "quoted" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-sm">Quote Reference</h3>
                      <p>{order.quote_reference}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Amount</h3>
                      <p>${order.quote_amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Sent Date</h3>
                      <p>{new Date(order.quote_sent_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Valid Until</h3>
                      <p>{new Date(order.quote_valid_until).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium text-sm">Notes</h3>
                    <p className="whitespace-pre-wrap">{order.quote_notes}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Send Reminder</Button>
                    <Button>Generate PDF</Button>
                  </div>
                </div>
              ) : (
                <QuotationForm orderId={order.id} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="communication" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
              <CardDescription>Record of all communications with the customer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Communication history will be implemented in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
