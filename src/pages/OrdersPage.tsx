import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { Order } from '../types'

export default function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h2 className="mt-4 text-xl font-bold text-stone-900 dark:text-stone-100">
          No orders yet
        </h2>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Start shopping to see your orders here.
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

  const statusColors: Record<Order['status'], string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    delivered: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">My Orders</h1>

      <div className="mt-8 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-800"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {order.id}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  statusColors[order.status]
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-4 border-t border-stone-200 pt-4 dark:border-stone-700">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4 dark:border-stone-700">
              <p className="text-sm text-stone-600 dark:text-stone-400">
                Shipping to: {order.shippingAddress.city},{' '}
                {order.shippingAddress.state}
              </p>
              <p className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
