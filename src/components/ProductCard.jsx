import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { dispatch } = useCart();
  const handleAddToCart = () => {
    dispatch({ 
        type: 'ADD_ITEM', 
        payload: { 
            id: product.id, 
            title: product.title, 
            price: parseFloat(product.price), 
            quantity: 1 
        } 
    });
    alert(`✨ ${product.title} added to cart! 🛍️`);
  };

  const isLowStock = product.inventory_count <= 10;
  const isExpensive = parseFloat(product.price) >= 2000;
  const getJewelryImage = () => {
    const jewelryImages = {
      'Rings': [
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1603561596112-db1d9d1c95d0?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1584302179602-e4819bb92daa?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=400&h=400&fit=crop&auto=format'
      ],
      'Necklaces': [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop&auto=format'
      ],
      'Watches': [
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=400&fit=crop&auto=format'
      ],
      'Earrings': [
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format'
      ],
      'Bracelets': [
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop&auto=format'
      ],
      'Chains': [
        'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&auto=format'
      ]
    };
    
    if (product.image_url) return product.image_url;
    
    const categoryName = product.categories?.[0]?.name || 'Rings';
    const categoryImages = jewelryImages[categoryName] || jewelryImages['Rings'];
    const imageIndex = product.id ? (product.id % categoryImages.length) : 0;
    return categoryImages[imageIndex];
  };

  return (
    <div className="jewelry-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img 
            src={getJewelryImage()} 
            alt={product.title} 
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {parseFloat(product.price) >= 5000 && (
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              💎 PREMIUM
            </span>
          )}
          {isExpensive && parseFloat(product.price) < 5000 && (
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              👑 LUXURY
            </span>
          )}
          {parseFloat(product.price) < 500 && (
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              💚 AFFORDABLE
            </span>
          )}
          {isLowStock && (
            <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
              ⚡ ONLY {product.inventory_count} LEFT
            </span>
          )}
        </div>
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
            ${parseFloat(product.price).toFixed(0)}
          </span>
        </div>
        

      </div>
      
      <div className="p-5">

        
        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-serif font-bold text-gray-900 hover:text-yellow-600 transition-colors mb-2 line-clamp-2 group-hover:text-yellow-600">
            {product.title}
          </h3>
        </Link>
        

        
        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">${parseFloat(product.price).toFixed(2)}</p>
            <p className="text-sm text-gray-500">Free shipping worldwide</p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">In stock: {product.inventory_count}</span>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.inventory_count === 0}
          className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 font-serif font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
        >
          {product.inventory_count > 0 ? '🛍️ Add to Cart' : '❌ Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;