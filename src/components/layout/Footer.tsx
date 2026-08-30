import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">ShopWave</h3>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Shop</h3>
            <ul className="mt-2 space-y-1 text-sm text-stone-500 dark:text-stone-400">
              <li>
                <Link to="/" className="hover:text-stone-700 dark:hover:text-stone-200">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-stone-700 dark:hover:text-stone-200">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-stone-700 dark:hover:text-stone-200">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-stone-700 dark:hover:text-stone-200">
                  Home & Kitchen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Support</h3>
            <ul className="mt-2 space-y-1 text-sm text-stone-500 dark:text-stone-400">
              <li>Contact Us</li>
              <li>FAQ</li>
              <li>Shipping Info</li>
              <li>Returns</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Company</h3>
            <ul className="mt-2 space-y-1 text-sm text-stone-500 dark:text-stone-400">
              <li>About</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-stone-200 pt-6 text-center text-sm text-stone-400 dark:border-stone-700 dark:text-stone-500">
          &copy; {new Date().getFullYear()} ShopWave. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
