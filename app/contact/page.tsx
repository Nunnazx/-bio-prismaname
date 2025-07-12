import { Building, Mail, Phone } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            Get in touch with our team for inquiries, quotes, or more information
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your company" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Your phone number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">Inquiry Type</Label>
                  <Select>
                    <SelectTrigger id="inquiry-type">
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product Information</SelectItem>
                      <SelectItem value="quote">Request a Quote</SelectItem>
                      <SelectItem value="sample">Request a Sample</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message" className="min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out to us directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Corporate Office</h3>
                    <p className="text-sm text-gray-500">
                      Flat No 201, 2nd Floor, Basaveswara Nilayam, Plot No 05, Above Vijaya Diagnostics, Near ALEAP
                      Circle, Pragathi Nagar, Hyderabad, Telangana – 500 090
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Manufacturing Unit</h3>
                    <p className="text-sm text-gray-500">
                      Plot No 77/A, Kondapur Industrial Park, Kondapur Village, Manoharabad Mandal, Medak (Dist),
                      Telangana – 502102
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-gray-500">+91-7075500868 / +91-7358536074</p>
                    <p className="text-sm text-gray-500">WhatsApp: +91-7578007116</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-gray-500">info@aicmtinternational.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>When you can reach us</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Saturday</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manufacturing Facility</CardTitle>
                <CardDescription>Visit our production plant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md overflow-hidden mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="AICMT Manufacturing Facility"
                    width={400}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Our state-of-the-art manufacturing facility spans 10,000 Square Feet and is equipped with the latest
                  technology for producing high-quality compostable plastics.
                </p>
                <Button variant="outline" className="mt-4 w-full bg-transparent">
                  Schedule a Visit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
