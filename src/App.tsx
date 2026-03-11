import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { AccountPage } from './pages/AccountPage'
import { SearchPage } from './pages/SearchPage'
import { ProductsPage } from './pages/ProductsPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { AdminPage } from './pages/AdminPage'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CartProvider } from './context/CartContext'
import { ScrollToTop } from './components/ScrollToTop'
import { ToastProvider } from './context/ToastContext'

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <div className="app-shell">
          <Header />
          <ScrollToTop />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categorie/:categorySlug" element={<CategoryPage />} />
              <Route path="/produs/:productSlug" element={<ProductPage />} />
              <Route path="/cos" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/cont" element={<AccountPage />} />
              <Route path="/cautare" element={<SearchPage />} />
              <Route path="/produse" element={<ProductsPage />} />
              <Route path="/despre-noi" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </CartProvider>
  )
}

export default App
