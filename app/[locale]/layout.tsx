import type React from "react"
import { Inter } from "next/font/google"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNavigation, MobileNavigation } from "@/components/main-navigation"
import { LanguageSelector } from "@/components/language-selector"
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
            <Suspense fallback={null}>
              <IntroExperienceWrapper>
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
                          <Button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent">
                            Request a Quote
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </header>
                  <main className="flex-1">{children}</main>
                  <Footer locale={params.locale} />
                </div>
              </IntroExperienceWrapper>
            </Suspense>
            <Toaster />
            <Analytics />
            <SpeedInsights />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
