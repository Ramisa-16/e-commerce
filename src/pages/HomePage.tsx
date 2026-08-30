import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/products/ProductGrid'
import ProductGridSkeleton from '../components/products/LoadingSkeletons'
import Pagination from '../components/products/Pagination'
import { PRODUCTS, CATEGORIES } from '../types'
import SEO from '../components/layout/SEO'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'

const ITEMS_PER_PAGE = 8

interface HomePageProps {
  loading?: boolean
}

export default function HomePage({ loading = false }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesStock = inStockOnly ? product.inStock : true
      return matchesCategory && matchesSearch && matchesPrice && matchesStock
    })

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => (b.tags?.includes('new') ? 1 : 0) - (a.tags?.includes('new') ? 1 : 0))
        break
    }

    return result
  }, [selectedCategory, searchQuery, sortBy, priceRange, inStockOnly])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, sortBy, priceRange, inStockOnly])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const featuredProducts = useMemo(
    () => PRODUCTS.filter((p) => p.tags?.includes('bestseller') || p.tags?.includes('sale')),
    []
  )

  return (
    <>
      <SEO
        title="Shop Wave - E-Commerce Store"
        description="Shop the latest deals on electronics, clothing, home goods, and more. Free shipping on orders over $50."
        type="website"
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-16 text-center text-white sm:px-12 sm:py-24">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hero-bg/1200/400')] bg-cover bg-center opacity-10" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Discover Amazing Products
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Shop the latest deals on electronics, clothing, home goods, and more.
              Free shipping on orders over $50.
            </p>
            <Link
              to="/#products"
              className="mt-8 inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-medium text-blue-600 transition-colors hover:bg-blue-50"
            >
              Shop Now
            </Link>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="mt-10 space-y-4" id="products">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-stone-300 bg-white py-3 pl-10 pr-4 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-200 dark:hover:bg-stone-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sorting & Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-stone-200 bg-white p-3 dark:border-stone-700 dark:bg-stone-800">
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="price-min" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Price:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="price-min"
                  min={0}
                  max={priceRange[1]}
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value))
                    setPriceRange([val, priceRange[1]])
                  }}
                  className="w-20 rounded-md border border-stone-300 bg-white px-2 py-1.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100"
                />
                <span className="text-stone-400">-</span>
                <input
                  type="number"
                  id="price-max"
                  min={priceRange[0]}
                  max={1000}
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const val = Math.min(1000, Number(e.target.value))
                    setPriceRange([priceRange[0], val])
                  }}
                  className="w-20 rounded-md border border-stone-300 bg-white px-2 py-1.5 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-stone-300 text-blue-600 focus:ring-blue-500 dark:border-stone-600"
                />
                In stock only
              </label>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {selectedCategory === 'All' && searchQuery === '' && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Featured Products</h2>
            <div className="mt-6">
              <ProductGrid products={featuredProducts.slice(0, 4)} />
            </div>
          </section>
        )}

        {/* All Products */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>
            <span className="text-sm text-stone-500 dark:text-stone-400">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="mt-6">
            {loading ? (
              <ProductGridSkeleton count={ITEMS_PER_PAGE} />
            ) : (
              <ProductGrid products={paginatedProducts} />
            )}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </section>
      </div>
    </>
  )
}
