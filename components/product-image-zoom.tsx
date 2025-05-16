"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ProductImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
  magnification?: number
  className?: string
}

export function ProductImageZoom({
  src,
  alt,
  width = 500,
  height = 500,
  magnification = 2.5,
  className,
}: ProductImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)

  // Update container size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [imageLoaded])

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPosition({ x, y })
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden cursor-zoom-in", className)}
      style={{ width, height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Regular image */}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-contain"
        onLoad={handleImageLoad}
      />

      {/* Zoomed image */}
      {isZoomed && imageLoaded && (
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${magnification * 100}%`,
            zIndex: 1,
          }}
        />
      )}
    </div>
  )
}
