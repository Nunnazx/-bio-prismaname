import type React from "react"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { MainNavigation, MobileNavigation } from "@/components/main-navigation"
import { LanguageSelector } from "@/components/language-selector"
import { ShoppingCartDrawer } from "@/components/shopping-cart"
import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"
import "../globals.css"
import { Footer } from "@/components/footer"
import { IntroExperienceWrapper } from "@/components/intro-experience-wrapper"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { PageTransitionWrapper } from "@/components/page-transition-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AICMT International - Compostable Plastics",
  description: "CPCB Certified Manufacturer of Compostable Plastics",
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <html lang={locale} dir={locale === "ur" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" suppressHydrationWarning>
          <LanguageProvider initialLocale={locale}>
            <CartProvider>
              <Suspense fallback={null}>
                <IntroExperienceWrapper>
                <div className="flex min-h-screen flex-col">
                  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-16 items-center">
                      <Link href={`/${locale}`} className="flex items-center gap-2">
                        <Leaf className="h-6 w-6 text-primary" />
                        <span className="font-bold">AICMT</span>
                      </Link>
                      <MainNavigation />
                      <div className="ml-auto flex items-center gap-2">
                        <ShoppingCartDrawer />
                        <LanguageSelector />
                        <MobileNavigation />
                        <Link href={`/${locale}/contact`}>
                          <Button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent">
                            Request a Quote
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </header>
                  <main className="flex-1">
                    <PageTransitionWrapper>{children}</PageTransitionWrapper>
                  </main>
                  <Footer locale={locale} />
                </div>
              </IntroExperienceWrapper>
            </Suspense>
            <Toaster />
            <Analytics />
            <SpeedInsights />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
