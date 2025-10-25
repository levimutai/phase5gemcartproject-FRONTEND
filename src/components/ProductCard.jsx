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
        'https://i.pinimg.com/736x/6e/0d/dd/6e0ddd9590f6d49a68e5b7b097c222cf.jpg',
        'https://i.pinimg.com/736x/59/38/bd/5938bd06b009d904002b5c27f50d9482.jpg',
        'https://i.pinimg.com/736x/93/e0/44/93e04420005de989328f04bff698c237.jpg',
        'https://i.pinimg.com/736x/d0/ea/fa/d0eafad1dc3eadc1bd9405e56f1c7b70.jpg'
      ],
      'Necklaces': [
        'https://i.pinimg.com/1200x/d9/3f/10/d93f107c2415cdf0595e54d05b36a5ed.jpg',
        'https://i.pinimg.com/736x/8d/f8/7b/8df87bab3251409450178d2c10b766b4.jpg',
        'https://i.pinimg.com/1200x/b8/21/70/b821709eabdd8339759a4638f73abc89.jpg',
        'https://i.pinimg.com/736x/00/02/1b/00021bf83e1babbed73c1c52744e807d.jpg'
      ],
      'Watches': [
        'https://i.pinimg.com/736x/70/a3/97/70a39735cff667be25113d6becab4bda.jpg',
        'https://i.pinimg.com/736x/b8/8b/72/b88b72997a214eaca116e60913da4d5d.jpg',
        'https://i.pinimg.com/1200x/90/f3/3d/90f33db7d190e102b3bf704f8ba221eb.jpg',
        'https://i.pinimg.com/1200x/fb/2b/16/fb2b167077a623d20a59f36e11610552.jpg'
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
          className="w-full bg-white text-black border-2 border-black py-3 rounded-xl hover:bg-black hover:text-white transition-all duration-300 font-serif font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
        >
          {product.inventory_count > 0 ? '🛍️ Add to Cart' : '❌ Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;