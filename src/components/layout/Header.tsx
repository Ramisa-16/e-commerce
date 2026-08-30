import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'

export default function Header() {
  const { totalItems, wishlist, totalPrice } = useCart()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100'

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-md dark:border-stone-700 dark:bg-stone-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          ShopWave
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            to="/wishlist"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive('/wishlist')}`}
          >
            <span className="flex items-center gap-1">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </span>
          </Link>

          <Link
            to="/orders"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive('/orders')}`}
          >
            Orders
          </Link>

          <Link
            to="/cart"
            className="group relative rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 hover:text-blue-600 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-blue-400"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <>
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white dark:bg-blue-500">
                  {totalItems}
                </span>
                <span className="whitespace-nowrap text-xs font-medium text-blue-600 dark:text-blue-400">
                  ${(totalPrice?.toFixed(2) ?? 0)}
                </span>
              </>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
