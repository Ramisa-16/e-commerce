import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import ImageGallery from './ImageGallery'
import RelatedProducts from './RelatedProducts'
import VariantSelector, {
  getVariantFromAttributes,
  getVariantPrice,
} from './VariantSelector'
import SEO from '../layout/SEO'

interface ProductDetailProps {
  product: Product
  onBack: () => void
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const { addItem, toggleWishlist, isInWishlist } = useCart()
  const { addToast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})

  const galleryImages = product.images?.filter((img) => img) ?? []
  const currentVariant = getVariantFromAttributes(product, selectedAttributes)
  const currentPrice = currentVariant?.price ?? getVariantPrice(product, selectedAttributes)
  const currentImage = currentVariant?.image ?? (galleryImages[0] ?? product.images?.[0])

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : 0

  const onWishlist = isInWishlist(product.id)

  const handleAttributeChange = (name: string, value: string) => {
    setSelectedAttributes((prev) => {
      const next = { ...prev }
      if (value) {
        next[name] = value
      } else {
        delete next[name]
      }
      return next
    })
  }

  const handleWishlistToggle = () => {
    toggleWishlist(product)
    addToast(
      onWishlist ? `Removed from wishlist` : `Added to wishlist`,
      onWishlist ? 'info' : 'success'
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setAdded(true)
    addToast(`Added ${quantity} ${product.name} to cart`, 'success')
    setTimeout(() => setAdded(false), 1500)
  }

  const hasVariants = product.variantTypes && product.variantTypes.length > 0

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        image={currentImage}
        canonical={`/product/${product.id}`}
        type="product"
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to products
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div ref={galleryRef}>
            <ImageGallery
              mainImage={currentImage}
              images={galleryImages.filter((img) => img !== currentImage)}
              alt={product.name}
            />
          </div>

          <div>
            <span className="text-sm text-stone-500 dark:text-stone-400">{product.category}</span>
            <h1 className="mt-2 text-3xl font-bold text-stone-900 dark:text-stone-100">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-lg text-yellow-500">&#9733;</span>
                <span className="font-medium dark:text-stone-200">{product.rating}</span>
                <span className="text-stone-500 dark:text-stone-400">({product.reviews} reviews)</span>
              </div>
              <span className={`text-sm font-medium ${product.inStock ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {hasVariants && (
              <VariantSelector
                product={product}
                selectedAttributes={selectedAttributes}
                onAttributeChange={handleAttributeChange}
              />
            )}

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-stone-900 dark:text-stone-100">
                ${currentPrice.toFixed(2)}
              </span>
              {product.originalPrice && currentPrice < product.originalPrice && (
                <>
                  <span className="text-xl text-stone-400 line-through dark:text-stone-500">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-semibold text-red-600 dark:bg-red-900 dark:text-red-200">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-base text-stone-600 leading-relaxed dark:text-stone-400">
              {product.description}
            </p>

            {product.tags && product.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600 dark:bg-stone-700 dark:text-stone-300"
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </span>
                ))}
              </div>
            )}

            {product.inStock && (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center rounded-lg border border-stone-300 dark:border-stone-600">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 transition-colors hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-stone-700"
                    disabled={quantity <= 1}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-medium dark:text-stone-200">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 transition-colors hover:bg-stone-100 dark:hover:bg-stone-700"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`btn-primary flex-1 text-base transition-all ${added ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                >
                  {added ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Added!
                    </span>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`btn-secondary flex-shrink-0 p-3 ${onWishlist ? '!border-red-500 !text-red-600 dark:!border-red-400 dark:!text-red-400' : ''}`}
                  aria-label={onWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg
                    className={`h-5 w-5 ${onWishlist ? 'fill-red-500' : ''}`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <RelatedProducts currentProduct={product} />
      </div>
    </>
  )
}
