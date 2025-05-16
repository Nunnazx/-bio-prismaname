"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"

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
  const [isError, setIsError] = useState(false)

  // Handle errors and provide fallbacks
  const handleError = () => {
    setIsError(true)
  }

  // Use fallback image if original source fails
  const imageSrc = isError ? "/abstract-colorful-swirls.png" : src || "/abstract-colorful-swirls.png"

  // Ensure alt text is always provided
  const imageAlt = alt || "Image"

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
          onError={handleError}
          unoptimized={imageSrc.includes("placeholder.svg")}
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
          onError={handleError}
          unoptimized={imageSrc.includes("placeholder.svg")}
        />
      )}
    </div>
  )
}
