import type { Product } from '../../types'

interface VariantSelectorProps {
  product: Product
  selectedAttributes: Record<string, string>
  onAttributeChange: (name: string, value: string) => void
}

export default function VariantSelector({
  product,
  selectedAttributes,
  onAttributeChange,
}: VariantSelectorProps) {
  if (!product.variantTypes || product.variantTypes.length === 0) return null

  return (
    <div className="space-y-4">
      {product.variantTypes.map((vt) => (
        <div key={vt.name}>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
            {vt.name}
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {vt.options.map((option) => {
              const isSelected = selectedAttributes[vt.name] === option
              const hasVariant = product.variants?.some(
                (v) => v.attributes[vt.name] === option,
              )
              return (
                <button
                  key={option}
                  disabled={!hasVariant && !isSelected}
                  onClick={() =>
                    onAttributeChange(
                      vt.name,
                      isSelected ? '' : option,
                    )
                  }
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-300'
                      : !hasVariant && !isSelected
                        ? 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-600'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400 hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export function getVariantFromAttributes(
  product: Product,
  attributes: Record<string, string>,
) {
  if (!product.variants) return null
  return (
    product.variants.find(
      (v) =>
        Object.entries(attributes).every(
          ([key, value]) => v.attributes[key] === value,
        ),
    ) ?? null
  )
}

export function getVariantPrice(product: Product, attributes: Record<string, string>): number {
  const variant = getVariantFromAttributes(product, attributes)
  return variant?.price ?? product.price
}
