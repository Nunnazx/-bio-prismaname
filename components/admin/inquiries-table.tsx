"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MoreHorizontal, Search, Trash, Eye, MessageSquare } from "lucide-react"

// Mock data - this would come from Supabase in the real implementation
const initialInquiries = [
  {
    id: "INQ-001",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    subject: "Bulk Order Inquiry",
    message:
      "I'm interested in placing a bulk order for biodegradable food containers for our restaurant chain. Could you please provide pricing for orders of 10,000+ units?",
    status: "new",
    date: "2023-06-15T10:30:00Z",
  },
  {
    id: "INQ-002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    subject: "Custom Packaging Request",
    message:
      "We're looking for custom printed biodegradable bags with our company logo. Can you provide information about minimum order quantities and customization options?",
    status: "in-progress",
    date: "2023-06-14T14:45:00Z",
  },
  {
    id: "INQ-003",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    subject: "Product Specifications",
    message:
      "Could you please send me the detailed specifications for your biodegradable garbage bags? I need information about thickness, dimensions, and load capacity.",
    status: "completed",
    date: "2023-06-13T09:15:00Z",
  },
  {
    id: "INQ-004",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    subject: "Wholesale Partnership",
    message:
      "I represent a chain of eco-friendly stores across South India. We're interested in becoming a wholesale distributor for your products. Please share your partnership terms.",
    status: "new",
    date: "2023-06-12T16:20:00Z",
  },
  {
    id: "INQ-005",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    subject: "Certification Verification",
    message:
      "I'd like to verify the certifications for your biodegradable products. Can you share the testing reports and certification documents?",
    status: "in-progress",
    date: "2023-06-11T11:10:00Z",
  },
]

export function InquiriesTable() {
  const [inquiries, setInquiries] = useState(initialInquiries)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInquiries, setSelectedInquiries] = useState<string[]>([])
  const [viewInquiry, setViewInquiry] = useState<(typeof initialInquiries)[0] | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleInquirySelection = (inquiryId: string) => {
    setSelectedInquiries((prev) =>
      prev.includes(inquiryId) ? prev.filter((id) => id !== inquiryId) : [...prev, inquiryId],
    )
  }

  const toggleAllInquiries = () => {
    if (selectedInquiries.length === filteredInquiries.length) {
      setSelectedInquiries([])
    } else {
      setSelectedInquiries(filteredInquiries.map((inquiry) => inquiry.id))
    }
  }

  const deleteInquiry = (inquiryId: string) => {
    setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== inquiryId))
    setSelectedInquiries((prev) => prev.filter((id) => id !== inquiryId))
  }

  const bulkDeleteInquiries = () => {
    setInquiries((prev) => prev.filter((inquiry) => !selectedInquiries.includes(inquiry.id)))
    setSelectedInquiries([])
  }

  const changeInquiryStatus = (inquiryId: string, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((inquiry) => (inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry)),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>
      case "in-progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search inquiries..."
              className="pl-8 w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {selectedInquiries.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{selectedInquiries.length} selected</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newStatus = "completed"
                selectedInquiries.forEach((inquiryId) => {
                  changeInquiryStatus(inquiryId, newStatus)
                })
                setSelectedInquiries([])
              }}
            >
              Mark as Completed
            </Button>
            <Button variant="destructive" size="sm" onClick={bulkDeleteInquiries}>
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={filteredInquiries.length > 0 && selectedInquiries.length === filteredInquiries.length}
                  onCheckedChange={toggleAllInquiries}
                  aria-label="Select all inquiries"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No inquiries found.
                </TableCell>
              </TableRow>
            ) : (
              filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedInquiries.includes(inquiry.id)}
                      onCheckedChange={() => toggleInquirySelection(inquiry.id)}
                      aria-label={`Select ${inquiry.name}'s inquiry`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell>{inquiry.email}</TableCell>
                  <TableCell>{inquiry.subject}</TableCell>
                  <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                  <TableCell>{formatDate(inquiry.date)}</TableCell>
                  <TableCell className="text-right">
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
                        <DropdownMenuItem onClick={() => setViewInquiry(inquiry)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => changeInquiryStatus(inquiry.id, "new")}>
                          Mark as New
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeInquiryStatus(inquiry.id, "in-progress")}>
                          Mark as In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeInquiryStatus(inquiry.id, "completed")}>
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => deleteInquiry(inquiry.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {viewInquiry && (
        <Dialog open={!!viewInquiry} onOpenChange={() => setViewInquiry(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{viewInquiry.subject}</DialogTitle>
              <DialogDescription>
                From {viewInquiry.name} ({viewInquiry.email})
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <Badge>{viewInquiry.id}</Badge>
                {getStatusBadge(viewInquiry.status)}
              </div>
              <div className="rounded-md border p-4">
                <p className="whitespace-pre-wrap">{viewInquiry.message}</p>
              </div>
              <div className="text-sm text-muted-foreground">Received on {formatDate(viewInquiry.date)}</div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewInquiry(null)}>
                Close
              </Button>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
