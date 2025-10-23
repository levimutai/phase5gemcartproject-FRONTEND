import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ 
        type: 'ADD_ITEM', 
        payload: { 
          id: product.id, 
          title: product.title, 
          price: parseFloat(product.price), 
          quantity: quantity 
        } 
      });
      alert(`${quantity} x ${product.title} added to cart!`);
    }
  };

  if (loading) return <div className="text-center py-10">Loading product details...</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  const isLowStock = product.inventory_count <= 10;
  const isExpensive = parseFloat(product.price) >= 2000;
  const stockStatus = product.inventory_count > 50 ? '🟢 In Stock' : 
                     product.inventory_count > 10 ? '🟡 Limited Stock' : 
                     product.inventory_count > 0 ? '🔴 Low Stock' : '❌ Out of Stock';

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2">
          <div className="relative">
            <img 
              src={product.image_url || 'https://via.placeholder.com/800x600?text=GemCart+Image'} 
              alt={product.title} 
              className="w-full h-auto object-cover rounded-xl shadow-2xl"
            />
            {isExpensive && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-2 rounded-full font-bold">
                👑 LUXURY ITEM
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.categories.map(cat => (
                <span key={cat.id} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                  {cat.name}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{product.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-teal-600">💰 ${parseFloat(product.price).toFixed(2)}</div>
            <div className="text-lg text-gray-600">USD</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="border-t pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">{stockStatus}</span>
              <span className="text-gray-600">{product.inventory_count} units available</span>
            </div>
            
            <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="font-semibold text-lg">🔢 Quantity:</label>
                <input 
                    type="number" 
                    id="quantity"
                    min="1"
                    max={product.inventory_count}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-24 p-3 border-2 rounded-lg text-center text-lg font-semibold focus:ring-2 focus:ring-teal-500"
                />
            </div>
            
            <button
                onClick={handleAddToCart}
                disabled={product.inventory_count <= 0}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold py-4 px-6 rounded-xl text-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
            >
                {product.inventory_count > 0 ? "🛍️ Add to Cart" : "❌ Out of Stock"}
            </button>
          </div>
          
          <div className="bg-white border rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-semibold mb-4">📝 Product Specifications</h3>
            <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">🏷️ SKU:</span>
                  <span className="text-gray-600">{product.sku}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">📊 Category:</span>
                  <span className="text-gray-600">{product.categories.map(c => c.name).join(', ')}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">👤 Seller:</span>
                  <span className="text-gray-600">{product.seller.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">🚚 Shipping:</span>
                  <span className="text-green-600 font-semibold">✨ Free Worldwide</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;