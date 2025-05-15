import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12 px-4 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
          <p className="text-gray-500 md:text-xl">Last updated: May 16, 2025</p>
        </div>

        <div className="prose prose-green max-w-none">
          <h2>1. Introduction</h2>
          <p>
            At Biodegradable Innovations, we respect your privacy and are committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website
            or use our services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect several types of information from and about users of our website, including:</p>
          <ul>
            <li>
              Personal information such as name, email address, and contact details when you register, place an order,
              or contact us
            </li>
            <li>Usage data about how you interact with our website</li>
            <li>Technical data such as IP address, browser type, and device information</li>
            <li>Marketing preferences and communication preferences</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing and improving our products and services</li>
            <li>Processing transactions and fulfilling orders</li>
            <li>Communicating with you about products, services, and promotions</li>
            <li>Analyzing website usage to enhance user experience</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access,
            alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>5. Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to outside parties without your
            consent, except as necessary to provide our services (such as shipping companies for order fulfillment) or
            as required by law.
          </p>

          <h2>6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic,
            and personalize content. You can control cookies through your browser settings.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate information</li>
            <li>The right to request deletion of your data</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
          </ul>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at
            privacy@biodegradableinnovations.com.
          </p>
        </div>
      </div>
    </div>
  )
}
