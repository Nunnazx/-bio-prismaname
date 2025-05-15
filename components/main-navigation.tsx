"use client"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/lib/i18n/use-language"
import { MobileLanguageSwitcher } from "./mobile-language-switcher"

export function MainNavigation() {
  const { t, currentLanguage } = useLanguage()

  const navItems = [
    { key: "common.home", href: "/" },
    { key: "common.products", href: "/products" },
    { key: "common.certifications", href: "/certification" },
    { key: "common.tools", href: "/features" },
    { key: "common.blog", href: "/blog" },
    { key: "common.about", href: "/about" },
    { key: "common.contact", href: "/contact" },
  ]

  return (
    <nav className="hidden md:flex gap-6">
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={`/${currentLanguage.code}${item.href}`}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>
  )
}

export function MobileNavigation() {
  const { t, currentLanguage } = useLanguage()

  const navItems = [
    { key: "common.home", href: "/" },
    { key: "common.products", href: "/products" },
    { key: "common.certifications", href: "/certification" },
    { key: "common.tools", href: "/features" },
    { key: "common.blog", href: "/blog" },
    { key: "common.about", href: "/about" },
    { key: "common.contact", href: "/contact" },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">{t("common.menu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 py-6">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${currentLanguage.code}${item.href}`}
              className="text-lg font-medium transition-colors hover:text-primary"
            >
              {t(item.key)}
            </Link>
          ))}
          <MobileLanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  )
}
