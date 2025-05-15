"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createQuotation } from "@/app/actions/custom-orders"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function QuotationForm({ orderId }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    notes: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form data
      if (!formData.amount || isNaN(Number.parseFloat(formData.amount)) || Number.parseFloat(formData.amount) <= 0) {
        throw new Error("Please enter a valid amount")
      }

      // Submit the quotation
      const result = await createQuotation(orderId, {
        amount: Number.parseFloat(formData.amount),
        notes: formData.notes,
      })

      if (result.success) {
        toast({
          title: "Quotation Created",
          description: `Quotation ${result.quoteReference} has been created successfully.`,
        })
        router.refresh()
      } else {
        throw new Error(result.error || "Failed to create quotation")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while creating the quotation.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="amount">Quotation Amount ($)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
          <p className="text-sm text-muted-foreground">Enter the total amount for this custom order</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Quotation Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Enter any additional information, terms, or conditions for this quotation..."
          value={formData.notes}
          onChange={handleInputChange}
          rows={5}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Quotation"
          )}
        </Button>
      </div>
    </form>
  )
}
