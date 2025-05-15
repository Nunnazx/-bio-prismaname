"use client"

import { ArrowLeft, CheckCircle, Download, FileText, Shield } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/lib/i18n/use-language"
import { LanguageMeta } from "@/components/language-meta"
import { OptimizedImage } from "@/components/optimized-image"

export default function CertificationPage() {
  const { t } = useLanguage()

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <LanguageMeta pageName="certification" />

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
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("certification.title")}</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl">{t("certification.subtitle")}</p>
        </div>

        <Tabs defaultValue="cpcb" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cpcb">CPCB Certification</TabsTrigger>
            <TabsTrigger value="testing">Testing Reports</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="cpcb" className="pt-6">
            <div className="grid gap-6 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Central Pollution Control Board Certification</h2>
                <p className="text-gray-600 mb-4">
                  Our products are certified by the Central Pollution Control Board (CPCB) of India, confirming that
                  they meet the stringent standards for compostable plastics as per IS/ISO 17088:2021.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <p>Certified as 100% compostable</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <p>Compliant with Plastic Waste Management Rules</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <p>Authorized for manufacturing and distribution</p>
                  </div>
                </div>
                <Button className="flex gap-2">
                  <Download className="h-4 w-4" />
                  Download Certificate
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden border">
                <OptimizedImage
                  src="/green-leaf-certificate.png"
                  alt="CPCB Certificate"
                  width={500}
                  height={700}
                  className="w-full"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testing" className="pt-6">
            <div className="grid gap-6 md:grid-cols-2 items-start">
              <div>
                <h2 className="text-2xl font-bold mb-4">Laboratory Testing Reports</h2>
                <p className="text-gray-600 mb-4">
                  Our products undergo rigorous testing at CIPET (Central Institute of Petrochemicals Engineering &
                  Technology) to verify their biodegradability, compostability, and safety.
                </p>
                <div className="space-y-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        Biodegradation Test
                      </CardTitle>
                      <CardDescription>IS/ISO 17088:2021 Standard</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Confirms that our products biodegrade by more than 90% within 180 days in a composting
                        environment.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        Ecotoxicity Test
                      </CardTitle>
                      <CardDescription>Plant Growth & Earthworm Survival</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Verifies that the compost produced from our products is safe for plant growth and soil
                        organisms.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-600" />
                        Heavy Metals Analysis
                      </CardTitle>
                      <CardDescription>Safety Verification</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">
                        Confirms that our products do not contain harmful levels of heavy metals or toxic substances.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Button className="flex gap-2">
                  <Download className="h-4 w-4" />
                  Download Test Reports
                </Button>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden border">
                  <OptimizedImage
                    src="/biodegradable-testing.png"
                    alt="Laboratory Testing of Biodegradable Plastics"
                    width={500}
                    height={300}
                    className="w-full"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border">
                  <OptimizedImage
                    src="/biodegradation-progress.png"
                    alt="Biodegradation Progress Chart"
                    width={500}
                    height={300}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="verification" className="pt-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Verify Product Authenticity</h2>
                <p className="text-gray-600">
                  Enter the unique code from your AICMT product to verify its authenticity and certification status.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="verification-code" className="text-sm font-medium">
                        Verification Code
                      </label>
                      <input
                        id="verification-code"
                        placeholder="Enter the code (e.g., AICMT-2023-12345)"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Verify Product
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <h3 className="font-bold mb-2">Can't find your verification code?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  The verification code is printed on the product packaging or included in your purchase documentation.
                  If you're having trouble locating it, please contact our customer support.
                </p>
                <Link href="/contact">
                  <Button variant="outline">Contact Support</Button>
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
