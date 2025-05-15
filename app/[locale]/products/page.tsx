import { ArrowLeft, Download, Leaf, Shield, Recycle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LanguageMeta } from "@/components/language-meta"
import { OptimizedImage } from "@/components/optimized-image"

export default function ProductsPage({ params }: { params: { locale: string } }) {
  return (
    <>
      <LanguageMeta pageName="products" />
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <Link href={`/${params.locale}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Products</h1>
            <p className="max-w-[700px] text-gray-500 md:text-xl">
              Explore our range of compostable plastic alternatives that are safe for you and the planet
            </p>
          </div>

          {/* Safety Banner */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">Safety Certified</h3>
              <p className="text-sm text-green-700">
                All our products are CPCB certified and tested for safety and compostability
              </p>
            </div>
          </div>

          <Tabs defaultValue="granules" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="granules">Granules</TabsTrigger>
              <TabsTrigger value="films">Films & Bags</TabsTrigger>
              <TabsTrigger value="custom">Custom Solutions</TabsTrigger>
            </TabsList>

            <TabsContent value="granules" className="pt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Compostable Filler Master Batch</CardTitle>
                        <CardDescription>CODE: ABP-FMB</CardDescription>
                      </div>
                      <Badge className="bg-green-600">CPCB Certified</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square overflow-hidden rounded-md mb-4 bg-gray-100 flex items-center justify-center">
                      <OptimizedImage
                        src="/biodegradable-plastic-granules.png"
                        alt="Compostable Filler Master Batch - biodegradable plastic granules"
                        width={300}
                        height={300}
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Properties:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Excellent Mechanical Properties</li>
                        <li>High Strength</li>
                        <li>Easy to Process</li>
                        <li>Very good sealing Properties</li>
                        <li>Cost Competitive</li>
                      </ul>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-green-700 text-sm">
                      <Leaf className="h-4 w-4" />
                      <span>100% Biodegradable & Non-toxic</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="w-full">Request Sample</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Natural Filler Master Batch</CardTitle>
                        <CardDescription>CODE: ABP-NFMB</CardDescription>
                      </div>
                      <Badge className="bg-green-600">CPCB Certified</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square overflow-hidden rounded-md mb-4 bg-gray-100 flex items-center justify-center">
                      <OptimizedImage
                        src="/clear-eco-pellets.png"
                        alt="Natural Filler Master Batch - clear eco-friendly plastic pellets"
                        width={300}
                        height={300}
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Properties:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Enhanced Natural Content</li>
                        <li>Improved Biodegradability</li>
                        <li>Excellent Processability</li>
                        <li>Good Mechanical Properties</li>
                        <li>Eco-friendly Formulation</li>
                      </ul>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-green-700 text-sm">
                      <Leaf className="h-4 w-4" />
                      <span>100% Biodegradable & Non-toxic</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="w-full">Request Sample</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Pre-Mix Granules</CardTitle>
                        <CardDescription>CODE: ABP-PMG</CardDescription>
                      </div>
                      <Badge className="bg-green-600">CPCB Certified</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square overflow-hidden rounded-md mb-4 bg-gray-100 flex items-center justify-center">
                      <OptimizedImage
                        src="/clear-biodegradable-pellets.png"
                        alt="Pre-Mix Granules - clear biodegradable plastic pellets"
                        width={300}
                        height={300}
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Properties:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Ready-to-Use Formulation</li>
                        <li>Consistent Quality</li>
                        <li>Optimized Processing</li>
                        <li>Balanced Properties</li>
                        <li>Custom Formulations Available</li>
                      </ul>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-green-700 text-sm">
                      <Leaf className="h-4 w-4" />
                      <span>100% Biodegradable & Non-toxic</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="w-full">Request Sample</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="films" className="pt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Compostable Carry Bags</CardTitle>
                        <CardDescription>Multiple sizes available</CardDescription>
                      </div>
                      <Badge className="bg-green-600">CPCB Certified</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square overflow-hidden rounded-md mb-4 bg-gray-100 flex items-center justify-center">
                      <OptimizedImage
                        src="/earth-friendly-shopping.png"
                        alt="Compostable Carry Bags - eco-friendly shopping bags"
                        width={300}
                        height={300}
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Features:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Strong & Durable</li>
                        <li>Water Resistant</li>
                        <li>Customizable Printing</li>
                        <li>Various Sizes Available</li>
                        <li>Complies with Plastic Ban Regulations</li>
                      </ul>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-green-700 text-sm">
                      <Recycle className="h-4 w-4" />
                      <span>Fully Compostable within 180 days</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="w-full">Request Sample</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Compostable Garbage Bags</CardTitle>
                        <CardDescription>Eco-friendly waste management</CardDescription>
                      </div>
                      <Badge className="bg-green-600">CPCB Certified</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square overflow-hidden rounded-md mb-4 bg-gray-100 flex items-center justify-center">
                      <OptimizedImage
                        src="/images/shop/garbage-bags.jpg"
                        alt="Compostable Garbage Bags - eco-friendly waste management bags"
                        width={300}
                        height={300}
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Features:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Tear Resistant</li>
                        <li>Leak Proof</li>
                        <li>Odor Control</li>
                        <li>Multiple Sizes</li>
                        <li>Perfect for Organic Waste</li>
                      </ul>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-green-700 text-sm">
                      <Recycle className="h-4 w-4" />
                      <span>Fully Compostable within 180 days</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="w-full">Request Sample</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Food Packaging Films</CardTitle>
                        <CardDescription>Safe for food contact</CardDescription>
                      </div>
                      <Badge className="bg-green-600">CPCB Certified</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square overflow-hidden rounded-md mb-4 bg-gray-100 flex items-center justify-center">
                      <OptimizedImage
                        src="/earth-friendly-takeout.png"
                        alt="Food Packaging Films - eco-friendly food containers"
                        width={300}
                        height={300}
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium">Features:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Food-Safe Certified</li>
                        <li>Oil & Grease Resistant</li>
                        <li>Heat Resistant up to 85°C</li>
                        <li>Transparent Options Available</li>
                        <li>Suitable for Hot & Cold Foods</li>
                      </ul>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-green-700 text-sm">
                      <Shield className="h-4 w-4" />
                      <span>Non-toxic & Food Contact Safe</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="w-full">Request Sample</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="pt-6">
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Custom Solutions</h2>
                <p className="text-green-700 mb-4">
                  We specialize in developing custom compostable plastic solutions tailored to your specific
                  requirements. Our team of experts works closely with you to create products that meet your exact
                  specifications while maintaining our commitment to environmental sustainability.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-green-700 mb-2">Custom Formulations</h3>
                    <p className="text-sm text-gray-600">
                      We can adjust our formulations to meet specific requirements for strength, flexibility,
                      transparency, and other properties.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-green-700 mb-2">Specialized Applications</h3>
                    <p className="text-sm text-gray-600">
                      From agricultural films to specialized packaging, we can develop solutions for unique
                      applications.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-green-700 mb-2">Branded Products</h3>
                    <p className="text-sm text-gray-600">
                      Custom printing and branding options available for all our compostable products.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-bold text-green-700 mb-2">Regulatory Compliance</h3>
                    <p className="text-sm text-gray-600">
                      We ensure all custom solutions meet relevant regulatory standards and certifications.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Contact Us for Custom Solutions
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold">Download Product Catalog</h2>
                <p className="text-gray-500">
                  Get detailed specifications and information about our complete product range
                </p>
              </div>
              <Button className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download Catalog
              </Button>
            </div>
          </div>

          {/* Safety and Certification Section */}
          <div className="mt-8 bg-white border rounded-lg overflow-hidden">
            <div className="bg-green-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Safety & Certifications</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">CPCB Certified</h3>
                  <p className="text-sm text-gray-600">
                    All our products are certified by the Central Pollution Control Board
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">100% Biodegradable</h3>
                  <p className="text-sm text-gray-600">
                    Our products completely break down into natural elements within 180 days
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold mb-2">Non-Toxic</h3>
                  <p className="text-sm text-gray-600">
                    Safe for humans, animals, and the environment with no harmful chemicals
                  </p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link href={`/${params.locale}/certification`}>
                  <Button variant="outline">View All Certifications</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
