import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useCart()
  const { addToast } = useToast()
  const [hovered, setHovered] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const onWishlist = isInWishlist(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    addToast(
      onWishlist ? `Removed ${product.name} from wishlist` : `Added ${product.name} to wishlist`,
      onWishlist ? 'info' : 'success'
    )
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group card overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-700">
        <img
          src={product.images?.[0] ?? product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute right-3 top-3 rounded-full bg-white/80 p-2 shadow-sm transition-all hover:bg-white dark:bg-stone-800/80 dark:hover:bg-stone-800"
          aria-label={onWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            className={`h-5 w-5 transition-colors ${
              onWishlist
                ? 'fill-red-500 text-red-500'
                : 'text-stone-500 group-hover:text-red-400 dark:text-stone-400'
            }`}
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
        {product.tags?.includes('sale') && discount > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}
        {product.tags?.includes('new') && (
          <span className="absolute left-3 top-3 rounded-md bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
            New
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-stone-900 dark:bg-stone-800 dark:text-stone-100">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-stone-500 dark:text-stone-400">{product.category}</p>
        <h3 className="mt-1 text-sm font-medium text-stone-900 line-clamp-2 group-hover:text-blue-600 dark:text-stone-100 dark:group-hover:text-blue-400">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center gap-1">
          <span className="text-sm font-medium text-yellow-500">&#9733;</span>
          <span className="text-xs text-stone-600 dark:text-stone-400">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-stone-900 dark:text-stone-100">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-stone-400 line-through dark:text-stone-500">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
