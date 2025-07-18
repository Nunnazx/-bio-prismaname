"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

type Subscription = {
  id: string
  email: string
  isSubscribed: boolean
  source?: string
  subscribedAt: Date
  unsubscribedAt?: Date
}

interface NewsletterSubscriptionsTableProps {
  subscriptions: Subscription[]
}

export function NewsletterSubscriptionsTable({
  subscriptions: initialSubscriptions,
}: NewsletterSubscriptionsTableProps) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions)

  const handleDelete = async (id: string) => {
    // For now, simulate deletion and show a toast.
    // In a real app, you'd call a server action.
    console.warn(`deleteSubscription action not yet implemented. Simulating delete for ID: ${id}`)

    // Optimistic update (remove from UI)
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id))

    toast({
      title: "Subscription Deletion (Simulated)",
      description: `Subscription with ID ${id} would be deleted. Implement server action.`,
    })
  }

  if (!subscriptions.length) {
    return <p>No newsletter subscriptions yet.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Subscribed At</TableHead>
          <TableHead>Unsubscribed At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((subscription) => (
          <TableRow key={subscription.id}>
            <TableCell className="font-medium">{subscription.email}</TableCell>
            <TableCell>
              <Badge variant={subscription.isSubscribed ? "default" : "secondary"}>
                {subscription.isSubscribed ? "Subscribed" : "Unsubscribed"}
              </Badge>
            </TableCell>
            <TableCell>{subscription.source || "N/A"}</TableCell>
            <TableCell>{new Date(subscription.subscribedAt).toLocaleDateString()}</TableCell>
            <TableCell>
              {subscription.unsubscribedAt ? new Date(subscription.unsubscribedAt).toLocaleDateString() : "N/A"}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleDelete(subscription.id)} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete (Simulated)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}