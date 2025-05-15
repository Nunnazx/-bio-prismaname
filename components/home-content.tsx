"use client"

import { ArrowRight, Leaf, ShieldCheck, Recycle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { OptimizedImage } from "@/components/optimized-image"

export function HomeContent() {
  const { t, currentLanguage } = useLanguage()

  // Animation variants
  const prefersReducedMotion =
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false

  const animationSettings = prefersReducedMotion
    ? {
        initial: {},
        animate: {},
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Nature Focus */}
      <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-green-100 -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <OptimizedImage
            src="/lush-tropical-foliage.png"
            alt="Decorative leaf pattern"
            width={600}
            height={600}
            className="absolute -top-20 -left-20 opacity-10"
          />
          <OptimizedImage
            src="/lush-tropical-foliage.png"
            alt="Decorative leaf pattern"
            width={600}
            height={600}
            className="absolute -bottom-20 -right-20 opacity-10 rotate-180"
          />
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <motion.div
              className="flex flex-col space-y-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-sm text-green-700"
              >
                <Leaf className="mr-1 h-3 w-3" />
                <span>CPCB Certified</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {t("home.hero.title")}
              </motion.h1>

              <motion.p variants={itemVariants} className="max-w-[600px] text-gray-600 md:text-xl lg:text-2xl">
                {t("home.hero.subtitle")}
              </motion.p>

              <motion.p variants={itemVariants} className="max-w-[600px] text-green-700 font-medium">
                Safe for you. Safe for the planet. Safe for future generations.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href={`/${currentLanguage.code}/products`}>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    {t("common.products")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${currentLanguage.code}/contact`}>
                  <Button size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                    {t("common.contact")}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto aspect-video md:aspect-square max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-xl"
            >
              <OptimizedImage
                src="/planting-for-the-future.png"
                alt="Sustainable future visualization: A person planting a tree, symbolizing our commitment to environmental sustainability"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-lg font-medium">From Nature, to Nature</p>
                <p className="text-sm opacity-90">Creating a sustainable future together</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="w-full py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t("home.features.title")}</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("home.features.subtitle")}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{t("home.features.ecoFriendly")}</CardTitle>
                <Leaf className="w-4 h-4 text-green-600" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <CardDescription>{t("home.features.ecoFriendlyDesc")}</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{t("home.features.certified")}</CardTitle>
                <ShieldCheck className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <CardDescription>{t("home.features.certifiedDesc")}</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{t("home.features.versatile")}</CardTitle>
                <Recycle className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <CardDescription>{t("home.features.versatileDesc")}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
