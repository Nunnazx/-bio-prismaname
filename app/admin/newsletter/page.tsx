import { AdminHeader } from "@/components/admin/admin-header"
import { NewsletterSubscriptionsTable } from "@/components/admin/newsletter-subscriptions-table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

async function getNewsletterSubscriptions() {
  try {
    const subscriptions = await prisma.newsletterSubscription.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return subscriptions
  } catch (error) {
    console.error("Error fetching newsletter subscriptions:", error)
    return []
  }
}

export default async function AdminNewsletterPage() {
  const subscriptions = await getNewsletterSubscriptions()

  // TODO: Implement CSV export functionality
  const exportAction = async () => {
    "use server"
    console.log("Exporting CSV...")
    // In a real scenario, you'd fetch data and format it as CSV.
  }

  return (
    <div className="space-y-6">
      <AdminHeader title="Newsletter Subscriptions" description="Manage your newsletter subscribers.">
        <form action={exportAction}>
          <Button variant="outline" disabled>
            <Download className="mr-2 h-4 w-4" />
            Export CSV (Coming Soon)
          </Button>
        </form>
      </AdminHeader>

      <NewsletterSubscriptionsTable subscriptions={subscriptions || []} />
    </div>
  )
}