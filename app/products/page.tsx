"use client"

import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/i18n/use-language"

export default function ProductsPage() {
  const { t } = useLanguage()

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("common.backToHome")}
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("products.title")}</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl">{t("products.subtitle")}</p>
        </div>

        <Tabs defaultValue="granules" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="granules">{t("products.tabs.granules")}</TabsTrigger>
            <TabsTrigger value="films">{t("products.tabs.films")}</TabsTrigger>
            <TabsTrigger value="custom">{t("products.tabs.custom")}</TabsTrigger>
          </TabsList>

          <TabsContent value="granules" className="pt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>{t("products.granules.fmb.title")}</CardTitle>
                  <CardDescription>{t("products.granules.fmb.code")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square overflow-hidden rounded-md mb-4 bg-gray-100 flex items-center justify-center">
                    <Image
                      src="/biodegradable-plastic-granules.png"
                      alt={t("products.granules.fmb.title")}
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">{t("products.properties")}:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>{t("products.granules.fmb.properties.mechanical")}</li>
                      <li>{t("products.granules.fmb.properties.strength")}</li>
                      <li>{t("products.granules.fmb.properties.process")}</li>
                      <li>{t("products.granules.fmb.properties.sealing")}</li>
                      <li>{t("products.granules.fmb.properties.cost")}</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{t("products.requestSample")}</Button>
                </CardFooter>
              </Card>

              {/* Additional cards would be updated similarly */}
            </div>
          </TabsContent>

          {/* Other tab contents would be updated similarly */}
        </Tabs>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold">{t("products.catalog.title")}</h2>
              <p className="text-gray-500">{t("products.catalog.description")}</p>
            </div>
            <Button className="w-full md:w-auto">
              <Download className="mr-2 h-4 w-4" />
              {t("products.catalog.download")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
