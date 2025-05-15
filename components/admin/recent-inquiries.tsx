"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

// Mock data - this would come from Supabase in the real implementation
const inquiries = [
  {
    id: "INQ-001",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    subject: "Bulk Order Inquiry",
    status: "new",
    date: "2023-06-15T10:30:00Z",
  },
  {
    id: "INQ-002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    subject: "Custom Packaging Request",
    status: "in-progress",
    date: "2023-06-14T14:45:00Z",
  },
  {
    id: "INQ-003",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    subject: "Product Specifications",
    status: "completed",
    date: "2023-06-13T09:15:00Z",
  },
  {
    id: "INQ-004",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    subject: "Wholesale Partnership",
    status: "new",
    date: "2023-06-12T16:20:00Z",
  },
]

export function RecentInquiries() {
  const [localInquiries, setLocalInquiries] = useState(inquiries)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "in-progress":
        return "bg-yellow-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleStatusChange = (id: string, newStatus: string) => {
    setLocalInquiries(
      localInquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry)),
    )
  }

  return (
    <div className="space-y-4">
      {localInquiries.map((inquiry) => (
        <div key={inquiry.id} className="flex items-start justify-between space-x-4 rounded-md border p-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{inquiry.name}</span>
              <Badge variant="outline" className={getStatusColor(inquiry.status)}>
                {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{inquiry.subject}</p>
            <p className="text-xs text-muted-foreground">{formatDate(inquiry.date)}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleStatusChange(inquiry.id, "new")}>Mark as New</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(inquiry.id, "in-progress")}>
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange(inquiry.id, "completed")}>
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}
