import { VideoPlayer } from "@/components/video-player"
import { RawMaterialsShowcase } from "@/components/raw-materials-showcase"
import { PrintingCapabilities } from "@/components/printing-capabilities"
import { RecyclingProcess } from "@/components/recycling-process"
import { ImageGallery } from "@/components/image-gallery"
import { EcommerceLinks } from "@/components/ecommerce-links"
import { OurStories } from "@/components/our-stories"
import { CustomSolutions } from "@/components/custom-solutions"
import { FeaturedProducts } from "@/components/featured-products"
import { TrustBadges } from "@/components/trust-badges"
import { CertificateShowcase } from "@/components/certificate-showcase"
import { HomeContent } from "@/components/home-content"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      {/* Hero Section with Nature Background */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/lush-tropical-foliage.png)" }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">From Nature to Nature</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Breaking the cycle of plastic pollution with biodegradable & compostable solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Explore Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                Be Our Marketing Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <HomeContent />
      <TrustBadges />
      <FeaturedProducts />
      <VideoPlayer
        src="/videos/factory-tour.mp4"
        title="AICMT International Factory Tour - From Nature to Nature"
        poster="/sustainable-factory-exterior.png"
        className="max-w-4xl mx-auto my-12 rounded-xl overflow-hidden"
      />
      <RawMaterialsShowcase />
      <PrintingCapabilities />
      <RecyclingProcess />
      <CustomSolutions />
      <CertificateShowcase />
      <OurStories />
      <EcommerceLinks />
      <ImageGallery />
    </main>
  )
}
