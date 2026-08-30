import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import type { ShippingAddress } from '../types'

const COUPONS: Record<string, { type: 'percent' | 'fixed'; value: number }> = {
  SAVE10: { type: 'percent', value: 10 },
  FLAT20: { type: 'fixed', value: 20 },
  WELCOME15: { type: 'percent', value: 15 },
}

export default function CheckoutPage() {
  const { items, totalPrice, placeOrder } = useCart()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ type: 'percent' | 'fixed'; value: number } | null>(null)
  const [couponError, setCouponError] = useState('')

  const shippingCost = totalPrice >= 50 ? 0 : 9.99

  const [formData, setFormData] = useState<ShippingAddress>({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase()
    if (appliedCoupon) {
      setAppliedCoupon(null)
      setCouponCode('')
      setCouponError('')
      return
    }
    const coupon = COUPONS[code]
    if (coupon) {
      setAppliedCoupon(coupon)
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code')
      setAppliedCoupon(null)
    }
  }

  const discountAmount = appliedCoupon
    ? appliedCoupon.type === 'percent'
      ? (totalPrice * appliedCoupon.value) / 100
      : appliedCoupon.value
    : 0

  const subtotalAfterDiscount = Math.max(0, totalPrice - discountAmount)
  const grandTotal = subtotalAfterDiscount + shippingCost

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    placeOrder(formData)
    setIsSubmitting(false)
    navigate('/orders')
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
          Your cart is empty
        </h2>
        <p className="mt-2 text-stone-500 dark:text-stone-400">
          Add some products to your cart before checking out.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 btn-primary inline-flex"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-800">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Shipping Address
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Country
                </label>
                <select
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Coupon Code */}
          <div className="rounded-xl border border-stone-200 bg-white p-6 dark:border-stone-700 dark:bg-stone-800">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Order Summary
            </h2>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-stone-900 line-clamp-1 dark:text-stone-100">
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
            <div className="mt-4 space-y-2 border-t border-stone-200 pt-4 dark:border-stone-700">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600 dark:text-stone-400">Subtotal</span>
                <span className="dark:text-stone-100">${totalPrice.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-sm text-blue-600 dark:text-blue-400">
                  <span className="flex items-center gap-1">
                    Discount
                    <button
                      type="button"
                      onClick={() => { setAppliedCoupon(null); setCouponCode(''); setCouponError(''); }}
                      className="text-xs underline opacity-70 hover:opacity-100"
                    >
                      (remove)
                    </button>
                  </span>
                  <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-stone-600 dark:text-stone-400">Shipping</span>
                <span
                  className={
                    shippingCost === 0
                      ? 'font-medium text-blue-600 dark:text-blue-400'
                      : 'font-medium text-stone-900 dark:text-stone-100'
                  }
                >
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-3 dark:border-stone-700">
                <span className="font-bold text-stone-900 dark:text-stone-100">Total</span>
                <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-4">
              {appliedCoupon ? (
                <div className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {couponCode.toUpperCase()} applied
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="btn-secondary whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{couponError}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary text-base"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
