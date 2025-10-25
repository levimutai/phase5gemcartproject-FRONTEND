import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-white via-blue-50 to-blue-100 text-blue-900">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              💎 GemCart
            </h2>
            <p className="text-blue-700 text-base mb-4 font-light leading-relaxed">
              Crafting timeless elegance since 1995. Each piece tells a story of luxury and sophistication.
            </p>

          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4 text-blue-600">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-blue-700 hover:text-blue-500 transition-colors font-light">New Arrivals</Link></li>
              <li><Link to="/products?category=Rings" className="text-blue-700 hover:text-blue-500 transition-colors font-light">💍 Rings</Link></li>
              <li><Link to="/products?category=Necklaces" className="text-blue-700 hover:text-blue-500 transition-colors font-light">📿 Necklaces</Link></li>
              <li><Link to="/products?category=Earrings" className="text-blue-700 hover:text-blue-500 transition-colors font-light">👂 Earrings</Link></li>
              <li><Link to="/products?category=Bracelets" className="text-blue-700 hover:text-blue-500 transition-colors font-light">💝 Bracelets</Link></li>
              <li><Link to="/products?category=Watches" className="text-blue-700 hover:text-blue-500 transition-colors font-light">⌚ Watches</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4 text-blue-600">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:mumtazmohamed453@gmail.com" className="text-blue-700 hover:text-blue-500 transition-colors font-light flex items-center">
                  📧 mumtazmohamed453@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+254729889585" className="text-blue-700 hover:text-blue-500 transition-colors font-light flex items-center">
                  📞 0729889585
                </a>
              </li>
            </ul>
          </div>


        </div>



        {/* Copyright */}
        <div className="border-t border-blue-200 pt-6 text-center">
          <p className="text-blue-600 font-light">
            © 2024 GemCart. All rights reserved. | Crafted with 💖 for jewelry lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;