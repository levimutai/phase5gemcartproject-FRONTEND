import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Footer from './components/Footer';

const Navbar = () => {
  const { state, dispatch } = useAuth();
  const { state: cartState, cartTotal } = useCart();
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header className="bg-gradient-to-r from-purple-900 via-pink-800 to-indigo-900 text-white p-4 shadow-2xl" role="banner">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-serif font-bold hover:text-pink-300 transition-colors bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-purple-900 rounded" aria-label="GemCart - Home">
          💎 GemCart
        </Link>
        <nav className="space-x-8 flex items-center" role="navigation" aria-label="Main navigation">
          <Link to="/products" className="hover:text-pink-300 transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-purple-900 rounded px-2 py-1" aria-label="Shop products">
            🛍️ Shop
          </Link>
          <Link to="/cart" className="relative focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-purple-900 rounded" aria-label={`Shopping cart with ${cartState.items.length} items, total $${cartTotal}`}>
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 px-4 py-2 rounded-full text-sm font-bold hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 transition-all cursor-pointer text-white">
              🛍️ Cart ({cartState.items.length}) - ${cartTotal}
            </span>
            {cartState.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse" aria-hidden="true">
                {cartState.items.length}
              </span>
            )}
          </Link>
          {state.isAuthenticated ? (
            <>
              <span className="text-pink-300 font-medium" role="status" aria-live="polite">👤 Hello, {state.user.username}</span>
              {state.user.is_seller && (
                <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold" role="status">
                  👑 SELLER
                </span>
              )}
              <button onClick={handleLogout} className="hover:text-red-400 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 py-1" aria-label="Logout from account">
                🚪 Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-2 rounded-full transition-all font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-purple-900" aria-label="Login to your account">
              🔑 Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};



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