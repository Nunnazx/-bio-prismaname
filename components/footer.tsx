import Link from "next/link"
import { NewsletterForm } from "@/components/newsletter-form" // Assuming NewsletterForm is in this path

export function Footer({ locale }: { locale: string }) {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-auto">
      {" "}
      {/* Changed mt-12 to mt-auto */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {" "}
          {/* Added gap and items-start */}
          <div className="md:col-span-1">
            {" "}
            {/* Company Info */}
            <h3 className="text-lg font-semibold mb-2">AICMT International</h3>
            <p className="text-sm text-muted-foreground">
              Leading CPCB Certified Manufacturer of Compostable Plastics.
            </p>
            {/* Add more company info or links here if needed */}
          </div>
          <div className="md:col-span-1">
            {" "}
            {/* Quick Links */}
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link href={`/${locale}/products`} className="text-sm text-muted-foreground hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-sm text-muted-foreground hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-sm text-muted-foreground hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-sm text-muted-foreground hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            {" "}
            {/* Newsletter */}
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <NewsletterForm source="footer" className="max-w-md" />
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} AICMT International Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href={`/${locale}/terms`} className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href={`/${locale}/privacy`} className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href={`/${locale}/language-preferences`} className="text-sm text-muted-foreground hover:underline">
              Language Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
