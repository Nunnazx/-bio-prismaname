"use client"

import { useState } from "react"
import { createInquiry } from "../actions/inquiries"
import { InquiryType } from "@prisma/client"

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    inquiryType: InquiryType.PRODUCT_INFO,
    productInterest: ""
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const result = await createInquiry(formData)
      
      if (result.success) {
        setSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          inquiryType: InquiryType.PRODUCT_INFO,
          productInterest: ""
        })
      } else {
        setError(result.error || "Failed to submit inquiry")
      }
    } catch (err) {
      console.error("Error submitting inquiry:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">Thank you for your inquiry!</p>
          <p>We have received your message and will get back to you soon.</p>
          <button 
            className="mt-4 text-green-700 underline"
            onClick={() => setSuccess(false)}
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                placeholder="Your email"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Your phone number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Your company"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Inquiry Type *</label>
            <select
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value={InquiryType.PRODUCT_INFO}>Product Information</option>
              <option value={InquiryType.QUOTE_REQUEST}>Request a Quote</option>
              <option value={InquiryType.SAMPLE_REQUEST}>Request a Sample</option>
              <option value={InquiryType.PARTNERSHIP}>Partnership Opportunity</option>
              <option value={InquiryType.SUPPORT}>Support</option>
              <option value={InquiryType.OTHER}>Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Product Interest</label>
            <input
              type="text"
              name="productInterest"
              value={formData.productInterest}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Which product are you interested in?"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded min-h-[120px]"
              placeholder="Your message"
            ></textarea>
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}