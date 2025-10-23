import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, CartProvider } from './context';
import { Navbar, Footer } from './components';
import { Home, Products, ProductDetail, Login, Cart, Checkout } from './pages';

function App() {
  return (
    <div className="App" lang="en">
      <Router>
        <AuthProvider>
          <CartProvider>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-500 text-black px-4 py-2 rounded z-50">
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content" role="main" tabIndex="-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;