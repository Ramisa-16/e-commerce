import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
          />
        </svg>
        <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-stone-100">
          Your cart is empty
        </h2>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="mt-6 btn-primary inline-flex"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Shopping Cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-800"
            >
              <Link
                to={`/product/${item.product.id}`}
                className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100 dark:bg-stone-700"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-sm font-medium text-stone-900 hover:text-blue-600 dark:text-stone-100 dark:hover:text-blue-400"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      {item.product.category}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-stone-300 dark:border-stone-600">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-stone-700"
                      disabled={item.quantity <= 1}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-10 text-center text-sm font-medium dark:text-stone-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-2 transition-colors hover:bg-gray-100 dark:hover:bg-stone-700"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-sm text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-800">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">Order Summary</h2>
          <div className="mt-4 space-y-3 border-t border-stone-200 pt-4 dark:border-stone-700">
            <div className="flex justify-between text-sm">
              <span className="text-stone-600 dark:text-stone-400">Subtotal</span>
              <span className="font-medium text-stone-900 dark:text-stone-100">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-600 dark:text-stone-400">Shipping</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {totalPrice >= 50 ? 'Free' : '$9.99'}
              </span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-3 dark:border-stone-700">
              <span className="font-bold text-stone-900 dark:text-stone-100">Total</span>
              <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                ${(totalPrice + (totalPrice >= 50 ? 0 : 9.99)).toFixed(2)}
              </span>
            </div>
          </div>
          {totalPrice < 50 && (
            <p className="mt-3 text-xs text-blue-600 dark:text-blue-400">
              Add ${(50 - totalPrice).toFixed(2)} more for free shipping
            </p>
          )}
          <Link
            to="/checkout"
            className="mt-6 block w-full btn-primary text-base"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
