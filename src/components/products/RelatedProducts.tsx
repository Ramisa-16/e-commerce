import type { Product } from '../../types'
import { PRODUCTS } from '../../types'

interface RelatedProductsProps {
  currentProduct: Product
}

export default function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const related = PRODUCTS.filter(
    (p) => p.id !== currentProduct.id && p.category === currentProduct.category
  )

  if (related.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
        Related Products
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function RelatedProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <a
      href={`/product/${product.id}`}
      className="group card overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-stone-100 dark:bg-stone-700">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
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
    </a>
  )
}
