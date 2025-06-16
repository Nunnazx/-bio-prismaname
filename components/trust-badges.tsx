import { Shield, Award, CheckCircle, FileCheck, Leaf } from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"

export function TrustBadges() {
  return (
    <div className="w-full py-8 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Trusted & Certified</h2>
          <p className="text-gray-600">Our products meet the highest standards for quality and sustainability</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 items-center justify-items-center">
          {/* CPCB Certification */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-3 rounded-full shadow-sm mb-2">
              <OptimizedImage
                src="/images/logos/cpcb-logo.png"
                alt="CPCB Certification"
                width={60}
                height={60}
                className="h-12 w-12 object-contain"
                fallback={<Shield className="h-12 w-12 text-green-600" />}
              />
            </div>
            <span className="text-sm font-medium">CPCB Certified</span>
          </div>

          {/* ISO Certification */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-3 rounded-full shadow-sm mb-2">
              <OptimizedImage
                src="/images/logos/iso-logo.png"
                alt="ISO 17088:2021"
                width={60}
                height={60}
                className="h-12 w-12 object-contain"
                fallback={<FileCheck className="h-12 w-12 text-green-600" />}
              />
            </div>
            <span className="text-sm font-medium">ISO 17088:2021</span>
          </div>

          {/* CIPET Tested */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-3 rounded-full shadow-sm mb-2">
              <OptimizedImage
                src="/images/logos/cipet-logo.png"
                alt="CIPET Tested"
                width={60}
                height={60}
                className="h-12 w-12 object-contain"
                fallback={<CheckCircle className="h-12 w-12 text-green-600" />}
              />
            </div>
            <span className="text-sm font-medium">CIPET Tested</span>
          </div>

          {/* MSME ZED */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-3 rounded-full shadow-sm mb-2">
              <OptimizedImage
                src="/images/logos/msme-logo.png"
                alt="MSME ZED Bronze"
                width={60}
                height={60}
                className="h-12 w-12 object-contain"
                fallback={<Award className="h-12 w-12 text-green-600" />}
              />
            </div>
            <span className="text-sm font-medium">MSME ZED Bronze</span>
          </div>

          {/* PWM Compliant */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-white p-3 rounded-full shadow-sm mb-2">
              <OptimizedImage
                src="/images/logos/pwm-logo.png"
                alt="PWM Compliant"
                width={60}
                height={60}
                className="h-12 w-12 object-contain"
                fallback={<Leaf className="h-12 w-12 text-green-600" />}
              />
            </div>
            <span className="text-sm font-medium">PWM Compliant</span>
          </div>
        </div>
      </div>
    </div>
  )
}
