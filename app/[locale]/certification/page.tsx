"use client"

import { ArrowLeft, CheckCircle, ExternalLink, Shield } from "lucide-react"
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

        <Tabs defaultValue="certifications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="certifications" className="pt-6">
            <div className="grid gap-8">
              {/* CPCB Certification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-green-600" />
                    CPCB Certification
                  </CardTitle>
                  <CardDescription>Central Pollution Control Board of India</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <p className="text-gray-600 mb-4">
                        Our products are certified by the Central Pollution Control Board (CPCB) of India, confirming
                        that they meet the stringent standards for compostable plastics as per IS/ISO 17088:2021.
                      </p>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <p>Certified as 100% biodegradable & compostable</p>
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
                    </div>
                    <div className="rounded-lg overflow-hidden border">
                      <OptimizedImage
                        src="/cpcb-logo.png"
                        alt="CPCB Certificate"
                        width={400}
                        height={300}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CIPET Certification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-blue-600" />
                    CIPET Testing & Certification
                  </CardTitle>
                  <CardDescription>Central Institute of Petrochemicals Engineering & Technology</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <p className="text-gray-600 mb-4">
                        Our products undergo rigorous testing at CIPET (Central Institute of Petrochemicals Engineering
                        & Technology) to verify their biodegradability, compostability, and safety.
                      </p>
                      <div className="space-y-2 mb-6">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <p>Biodegradation testing as per IS/ISO 17088:2021</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <p>Ecotoxicity testing for plant and soil safety</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                          <p>Heavy metals analysis for safety verification</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg overflow-hidden border">
                      <OptimizedImage
                        src="/cipet-logo.png"
                        alt="CIPET Certificate"
                        width={400}
                        height={300}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="verification" className="pt-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Verify Product Authenticity</h2>
                <p className="text-gray-600">
                  Use the official CPCB verification portal to verify the authenticity of our compostable plastic
                  products.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-2">Official CPCB Verification Portal</h3>
                      <p className="text-gray-600 mb-4">
                        Click the link below to access the Central Pollution Control Board's official verification
                        dashboard where you can verify our product certifications.
                      </p>
                      <Button asChild className="gap-2">
                        <a
                          href="https://plastic.cpcb.gov.in/compostable/viewdashboardlist"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Verify on CPCB Portal
                        </a>
                      </Button>
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-2">How to verify:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                        <li>Click on the CPCB verification link above</li>
                        <li>Search for "AICMT International" in the company list</li>
                        <li>View our certified product details and validity</li>
                        <li>Check the certification status and compliance information</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <h3 className="font-bold mb-2">Need Help with Verification?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you need assistance with product verification or have questions about our certifications, please
                  contact our customer support team.
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
