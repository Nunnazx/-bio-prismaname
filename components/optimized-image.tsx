import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: OptimizedImageProps) {
  // Handle placeholder images
  const isPlaceholder = src.startsWith("/placeholder.svg")

  // Handle missing images by providing a fallback
  const imageSrc = src || "/colorful-abstract-flow.png"

  // Ensure alt text is always provided
  const imageAlt = alt || "Product image"

  return (
    <div className={cn("relative overflow-hidden", fill ? "w-full h-full" : "", className)}>
      {fill ? (
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", className)}
        />
      ) : (
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={imageAlt}
          width={width || 400}
          height={height || 400}
          priority={priority}
          sizes={sizes}
          className={cn(className)}
        />
      )}
    </div>
  )
}
