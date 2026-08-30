export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="card overflow-hidden"
        >
          <div className="aspect-square bg-stone-200 dark:bg-stone-700 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-16 rounded-full bg-stone-200 dark:bg-stone-700 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
            <div className="h-3 w-24 rounded-full bg-stone-200 dark:bg-stone-700 animate-pulse" />
            <div className="h-5 w-20 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <button
        disabled
        className="mb-6 flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 cursor-not-allowed"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to products
      </button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image gallery skeleton */}
        <div className="aspect-square rounded-xl bg-stone-200 dark:bg-stone-700 animate-pulse" />

        {/* Info skeleton */}
        <div className="space-y-6">
          <div className="h-4 w-24 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
          <div className="h-8 w-3/4 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="h-4 w-32 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
            <div className="h-4 w-20 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-3">
            <div className="h-8 w-28 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
            <div className="h-5 w-24 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
            <div className="h-3 w-5/6 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
            <div className="h-3 w-4/6 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-32 rounded-lg border border-stone-300 dark:border-stone-600 animate-pulse" />
            <div className="h-10 flex-1 rounded-lg bg-stone-200 dark:bg-stone-700 animate-pulse" />
            <div className="h-10 w-10 rounded-lg border border-stone-300 dark:border-stone-600 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Related products skeleton */}
      <div className="mt-12">
        <div className="h-7 w-48 rounded bg-stone-200 dark:bg-stone-700 animate-pulse mb-6" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-stone-200 dark:bg-stone-700 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Hero skeleton */}
      <div className="rounded-2xl bg-stone-200 dark:bg-stone-700 h-64 sm:h-80 animate-pulse" />

      {/* Filters skeleton */}
      <div className="mt-10 space-y-4">
        <div className="h-12 w-full rounded-lg bg-stone-200 dark:bg-stone-700 animate-pulse" />
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-stone-200 dark:bg-stone-700 animate-pulse" />
          ))}
        </div>
        <div className="h-14 w-full rounded-lg bg-stone-200 dark:bg-stone-700 animate-pulse" />
      </div>

      {/* Grid skeleton */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <div className="h-7 w-40 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
          <div className="h-4 w-16 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card overflow-hidden">
              <div className="aspect-square bg-stone-200 dark:bg-stone-700 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-16 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
                <div className="h-5 w-20 rounded bg-stone-200 dark:bg-stone-700 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductGridSkeleton
