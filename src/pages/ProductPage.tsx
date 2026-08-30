import { useParams, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../types'
import ProductDetail from '../components/products/ProductDetail'

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()!
  const navigate = useNavigate()
  const product = PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <svg
          className="mx-auto h-12 w-12 text-stone-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-stone-100">
          Product Not Found
        </h2>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          The product you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 btn-primary"
        >
          Back to Shop
        </button>
      </div>
    )
  }

  return (
    <ProductDetail
      product={product}
      onBack={() => navigate(-1)}
    />
  )
}
