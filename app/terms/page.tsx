import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms of Service</h1>
          <p className="text-gray-500 md:text-xl">Last updated: May 16, 2025</p>
        </div>

        <div className="prose prose-green max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Biodegradable Innovations. These Terms of Service govern your use of our website, products, and
            services. By accessing or using our services, you agree to be bound by these Terms.
          </p>

          <h2>2. Use of Services</h2>
          <p>
            Our biodegradable products are designed to be environmentally friendly alternatives to traditional plastic
            products. You agree to use our products as intended and in accordance with any provided instructions.
          </p>

          <h2>3. Product Information</h2>
          <p>
            We strive to provide accurate information about our products, including their biodegradability, composition,
            and environmental impact. However, actual biodegradation times may vary based on environmental conditions.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, and images, is the property of Biodegradable
            Innovations and is protected by intellectual property laws. You may not reproduce, distribute, or create
            derivative works without our permission.
          </p>

          <h2>5. User Accounts</h2>
          <p>
            When you create an account with us, you are responsible for maintaining the confidentiality of your account
            information and for all activities that occur under your account. You agree to notify us immediately of any
            unauthorized use of your account.
          </p>

          <h2>6. Privacy</h2>
          <p>
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal
            information. By using our services, you consent to our collection and use of your information as described
            in our Privacy Policy.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Biodegradable Innovations shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
            posting the new Terms on our website. Your continued use of our services after such modifications
            constitutes your acceptance of the revised Terms.
          </p>

          <h2>9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at legal@biodegradableinnovations.com.</p>
        </div>
      </div>
    </div>
  )
}
