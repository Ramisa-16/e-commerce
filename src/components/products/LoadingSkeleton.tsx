import type { Product } from '../../types'

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="card animate-pulse overflow-hidden"
        >
          <div className="aspect-square bg-stone-200 dark:bg-stone-700" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-16 rounded-full bg-stone-200 dark:bg-stone-700" />
            <div className="h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-700" />
            <div className="h-3 w-24 rounded-full bg-stone-200 dark:bg-stone-700" />
            <div className="h-5 w-20 rounded bg-stone-200 dark:bg-stone-700" />
          </div>
        </div>
      ))}
    </div>
  )
}
