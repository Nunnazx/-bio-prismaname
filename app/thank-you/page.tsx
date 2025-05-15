import Link from "next/link"
import { CheckCircle, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ThankYouPage() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-12">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Thank You!</CardTitle>
          <CardDescription>Your inquiry has been submitted successfully</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            We appreciate your interest in AICMT International's compostable plastic products. Our team will review your
            inquiry and get back to you shortly.
          </p>
          <p className="text-sm text-gray-500">
            Please check your email for a confirmation of your submission. If you don't see it, please check your spam
            folder.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Link href="/" className="w-full">
            <Button className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
          <Link href="/products" className="w-full">
            <Button variant="outline" className="w-full">
              Browse Products
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
