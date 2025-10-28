import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { state, dispatch } = useAuth();
  const { state: cartState, cartTotal } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-white via-blue-50 to-blue-100 text-blue-900 p-4 shadow-2xl" role="banner">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-serif font-bold hover:text-blue-600 transition-colors bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white rounded" aria-label="GemCart - Home">
          💎 GemCart
        </Link>
        <nav className="space-x-8 flex items-center" role="navigation" aria-label="Main navigation">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jewelry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
              className="w-64 px-4 py-2 pl-10 border border-blue-200 rounded-full focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/90"
            />
            <span className="absolute left-3 top-2.5 text-blue-400">🔍</span>
          </div>
          <Link to="/products" className="hover:text-blue-600 transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white rounded px-2 py-1" aria-label="Shop products">
            🛍️ Shop
          </Link>
          <Link to="/cart" className="relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white rounded" aria-label={`Shopping cart with ${cartState.items.length} items, total $${cartTotal}`}>
            <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 px-4 py-2 rounded-full text-sm font-bold hover:from-blue-600 hover:via-blue-500 hover:to-blue-700 transition-all cursor-pointer text-white">
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
              <Link to="/profile" className="text-blue-600 font-medium hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white rounded px-2 py-1" role="status" aria-live="polite">👤 Hello, {state.user.username}</Link>
              {state.user.is_seller && (
                <span className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold" role="status">
                  👑 SELLER
                </span>
              )}
              <button onClick={handleLogout} className="hover:text-red-500 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white rounded px-2 py-1" aria-label="Logout from account">
                🚪 Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-full transition-all font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white" aria-label="Login to your account">
              🔑 Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;