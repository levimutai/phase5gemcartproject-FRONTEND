import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h2 className="text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              💎 GemCart
            </h2>
            <p className="text-gray-300 text-lg mb-6 font-light leading-relaxed">
              Crafting timeless elegance since 1995. Each piece tells a story of luxury and sophistication.
            </p>

          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6 text-yellow-400">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-gray-300 hover:text-yellow-400 transition-colors font-light">New Arrivals</Link></li>
              <li><Link to="/products?category=Rings" className="text-gray-300 hover:text-yellow-400 transition-colors font-light">💍 Rings</Link></li>
              <li><Link to="/products?category=Necklaces" className="text-gray-300 hover:text-yellow-400 transition-colors font-light">📿 Necklaces</Link></li>
              <li><Link to="/products?category=Earrings" className="text-gray-300 hover:text-yellow-400 transition-colors font-light">👂 Earrings</Link></li>
              <li><Link to="/products?category=Bracelets" className="text-gray-300 hover:text-yellow-400 transition-colors font-light">💝 Bracelets</Link></li>
              <li><Link to="/products?category=Watches" className="text-gray-300 hover:text-yellow-400 transition-colors font-light">⌚ Watches</Link></li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6 text-yellow-400">Connect</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com/gemcart" className="text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on Facebook" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://instagram.com/gemcart" className="text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on Instagram" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.01 7.102.048 6.273.088 5.718.222 5.238.42a5.893 5.893 0 0 0-2.126 1.384 5.893 5.893 0 0 0-1.384 2.126C1.53 4.41 1.396 4.961 1.356 5.79.318 6.617.308 7.084.308 10.705s.01 4.088.048 4.915c.04.829.174 1.38.372 1.86.204.48.478.89.923 1.325.444.445.845.719 1.325.923.48.198 1.031.332 1.86.372.827.04 1.294.05 4.915.05s4.088-.01 4.915-.05c.829-.04 1.38-.174 1.86-.372a5.893 5.893 0 0 0 2.126-1.384 5.893 5.893 0 0 0 1.384-2.126c.198-.48.332-1.031.372-1.86.04-.827.05-1.294.05-4.915s-.01-4.088-.05-4.915c-.04-.829-.174-1.38-.372-1.86a5.893 5.893 0 0 0-1.384-2.126A5.893 5.893 0 0 0 19.78.42c-.48-.198-1.031-.332-1.86-.372C17.085.01 16.618 0 12.017 0zm0 2.16c3.557 0 3.98.015 5.38.078.297.007.546.014.773.025.454.023.696.053.858.087.216.084.37.184.532.346.162.162.262.316.346.532.034.162.064.404.087.858.011.227.018.476.025.773.063 1.4.078 1.823.078 5.38s-.015 3.98-.078 5.38c-.007.297-.014.546-.025.773-.023.454-.053.696-.087.858-.084.216-.184.37-.346.532-.162.162-.316.262-.532.346-.162.034-.404.064-.858.087-.227.011-.476.018-.773.025-1.4.063-1.823.078-5.38.078s-3.98-.015-5.38-.078a9.065 9.065 0 0 1-.773-.025 2.066 2.066 0 0 1-.858-.087 1.44 1.44 0 0 1-.532-.346 1.44 1.44 0 0 1-.346-.532c-.034-.162-.064-.404-.087-.858a9.065 9.065 0 0 1-.025-.773c-.063-1.4-.078-1.823-.078-5.38s.015-3.98.078-5.38c.007-.297.014-.546.025-.773.023-.454.053-.696.087-.858.084-.216.184-.37.346-.532.162-.162.316-.262.532-.346.162-.034.404-.064.858-.087.227-.011.476-.018.773-.025 1.4-.063 1.823-.078 5.38-.078z" clipRule="evenodd" />
                  <path d="M12.017 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12.017 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a href="https://twitter.com/gemcart" className="text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110" aria-label="Follow us on Twitter" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="mailto:hello@gemcart.com" className="text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:scale-110" aria-label="Send us an email">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </a>
            </div>
          </div>


        </div>



        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 font-light">
            © 2024 GemCart. All rights reserved. | Crafted with 💖 for jewelry lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;