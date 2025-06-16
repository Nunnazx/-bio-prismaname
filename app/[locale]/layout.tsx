import type React from "react"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNavigation, MobileNavigation } from "@/components/main-navigation"
import { LanguageSelector } from "@/components/language-selector"
import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "../globals.css"
import { NewsletterForm } from "@/components/newsletter-form"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AICMT International - Compostable Plastics",
  description: "CPCB Certified Manufacturer of Compostable Plastics",
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={params.locale} dir={params.locale === "ur" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider initialLocale={params.locale}>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                  <Link href={`/${params.locale}`} className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-green-600" />
                    <span className="font-bold">AICMT</span>
                  </Link>
                  <MainNavigation />
                  <div className="ml-auto flex items-center gap-2">
                    <LanguageSelector />
                    <MobileNavigation />
                    <Link href={`/${params.locale}/contact`}>
                      <Button variant="outline" size="sm" className="hidden md:inline-flex">
                        Request a Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
              <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-12">
                <div className="container mx-auto px-4">
                  <div className="mt-8 md:mt-0 md:col-span-2">
                    <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Subscribe to our newsletter for the latest updates and offers.
                    </p>
                    <NewsletterForm source="footer" className="max-w-md" />
                  </div>
                  <Footer locale={params.locale} />
                </div>
              </footer>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

// Footer component
function Footer({ locale }: { locale: string }) {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2023 AICMT International Pvt. Ltd. All rights reserved.
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
    </footer>
  )
}
