import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { HelmetProviderWrapper } from './components/layout/SEO'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import WishlistPage from './pages/WishlistPage'

function App() {
  return (
    <HelmetProviderWrapper>
      <ThemeProvider>
        <CartProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="product/:id" element={<ProductPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="wishlist" element={<WishlistPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </CartProvider>
      </ThemeProvider>
    </HelmetProviderWrapper>
  )
}

export default App
