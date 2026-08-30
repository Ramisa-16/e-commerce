import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/products/ProductGrid'
import { PRODUCTS, CATEGORIES } from '../types'

export default function WishlistPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const wishlistProducts = PRODUCTS.filter((product) => {
    if (searchQuery === '') return true
    return product.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">My Wishlist</h1>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          {wishlistProducts.length} saved
        </span>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="mt-12 text-center">
          <svg
            className="mx-auto h-16 w-16 text-stone-300 dark:text-stone-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-stone-100">
            Your wishlist is empty
          </h2>
          <p className="mt-2 text-stone-500 dark:text-stone-400">
            Tap the heart icon on any product to save it here.
          </p>
          <Link
            to="/"
            className="mt-6 btn-primary inline-flex"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <ProductGrid products={wishlistProducts} />
      )}
    </div>
  )
}
