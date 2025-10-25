import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedCollection from '../components/FeaturedCollection';

const Home = () => (
  <div className="min-h-screen">
    {/* Hero Section */}
    <div 
      className="relative h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop")'
      }}
    >
      <div className="text-center text-white px-4">
        <h1 className="text-7xl font-serif font-extrabold mb-6 drop-shadow-2xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          ✨ GemCart ✨
        </h1>
        <p className="text-3xl mb-8 font-elegant font-light drop-shadow-lg">
          Luxury Jewelry & Timepieces
        </p>

        <Link 
          to="/products" 
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl"
        >
          🛍️ Explore Collection
        </Link>
      </div>
    </div>



    {/* Featured Collection */}
    <FeaturedCollection />



    {/* CTA Section */}
    <div className="py-20 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-serif font-bold mb-6">Ready to Find Your Perfect Piece?</h2>
        <p className="text-xl mb-8 text-blue-700">Browse our exclusive collection of luxury jewelry and timepieces</p>
        <Link 
          to="/products" 
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-4 rounded-full text-xl font-serif font-bold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl"
        >
          🛍️ Start Shopping Now
        </Link>
      </div>
    </div>
  </div>
);

export default Home;