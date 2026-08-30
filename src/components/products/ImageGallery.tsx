import { useState, useEffect, useRef, useCallback } from 'react'

interface ImageGalleryProps {
  mainImage: string
  images?: string[]
  alt: string
}

export default function ImageGallery({
  mainImage,
  images = [],
  alt,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
  const [loading, setLoading] = useState(true)
  const thumbnailsRef = useRef<HTMLDivElement>(null)
  const mainImgRef = useRef<HTMLDivElement>(null)

  const allImages = [mainImage, ...images]
  const currentSrc = allImages[currentIndex] ?? mainImage

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImgRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  const scrollThumbnails = useCallback(
    (direction: 'left' | 'right') => {
      if (!thumbnailsRef.current) return
      const scrollAmount = 120
      thumbnailsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    },
    [],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setCurrentIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight')
        setCurrentIndex((i) => Math.min(allImages.length - 1, i + 1))
      if (e.key === 'Escape') setZoomed(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [allImages.length])

  const handleImageLoad = () => setLoading(false)

  // Touch swipe support
  const touchStartX = useRef<number | null>(null)
  const SWIPE_THRESHOLD = 50

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) setCurrentIndex((i) => Math.min(allImages.length - 1, i + 1))
      else setCurrentIndex((i) => Math.max(0, i - 1))
    }
    touchStartX.current = null
  }

  if (allImages.length <= 1) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-700">
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-700 dark:via-stone-600 dark:to-stone-700" />
        )}
        <img
          ref={mainImgRef}
          src={currentSrc}
          alt={alt}
          onLoad={handleImageLoad}
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  return (
    <div>
      {/* Main image */}
      <div
        className="group relative overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-700"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label="Product image gallery"
        tabIndex={0}
      >
        {loading && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-700 dark:via-stone-600 dark:to-stone-700" />
        )}
        <img
          ref={mainImgRef}
          src={currentSrc}
          alt={alt}
          onLoad={handleImageLoad}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-100"
          style={{
            transform: zoomed ? 'scale(2)' : 'scale(1)',
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
          }}
        />
        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <button
            onClick={() => setCurrentIndex((i) => i - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous image"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        {currentIndex < allImages.length - 1 && (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
            aria-label="Next image"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {/* Image counter */}
        <span className="absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white">
          {currentIndex + 1} / {allImages.length}
        </span>
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => scrollThumbnails('left')}
          className="flex-shrink-0 rounded-md bg-white p-1 shadow-sm transition-colors hover:bg-stone-50 dark:bg-stone-800 dark:hover:bg-stone-700"
          aria-label="Scroll thumbnails left"
        >
          <svg className="h-4 w-4 text-stone-600 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          ref={thumbnailsRef}
          className="flex gap-2 overflow-x-auto px-1 scrollbar-hide"
        >
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                idx === currentIndex
                  ? 'border-blue-600 dark:border-blue-400'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${alt} ${idx + 1}`}
                className="h-14 w-14 object-cover"
              />
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollThumbnails('right')}
          className="flex-shrink-0 rounded-md bg-white p-1 shadow-sm transition-colors hover:bg-stone-50 dark:bg-stone-800 dark:hover:bg-stone-700"
          aria-label="Scroll thumbnails right"
        >
          <svg className="h-4 w-4 text-stone-600 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
