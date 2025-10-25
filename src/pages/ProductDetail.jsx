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
    // Use sample data instead of API call
    import('../data/sampleProducts').then(({ sampleProducts }) => {
      const foundProduct = sampleProducts.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
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
      'Bracelets': [
        'https://i.pinimg.com/1200x/f8/24/e9/f824e9e970fbc6f11595b51f9bfde3c3.jpg',
        'https://i.pinimg.com/736x/d6/b6/9f/d6b69f5318eb42d58e3812b16ff50a01.jpg',
        'https://i.pinimg.com/1200x/d1/3d/12/d13d1243d6cdb6607832fc3123f63fe9.jpg',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop&auto=format'
      ]
    };
    
    if (product.image_url) return product.image_url;
    
    const categoryName = product.categories?.[0]?.name || 'Rings';
    const categoryImages = jewelryImages[categoryName] || jewelryImages['Rings'];
    const imageIndex = product.id ? (product.id % categoryImages.length) : 0;
    return categoryImages[imageIndex];
  };

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
              src={getJewelryImage()} 
              alt={product.title} 
              className="w-full h-auto object-cover rounded-xl shadow-2xl"
            />
            {isExpensive && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-2 rounded-full font-bold">
                 LUXURY ITEM
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
            <div className="text-4xl font-bold text-teal-600"> ${parseFloat(product.price).toFixed(2)}</div>
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
                <label htmlFor="quantity" className="font-semibold text-lg"> Quantity:</label>
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
                {product.inventory_count > 0 ? " Add to Cart" : "❌ Out of Stock"}
            </button>
          </div>
          
          <div className="bg-white border rounded-xl p-6 shadow-md">
            <h3 className="text-2xl font-semibold mb-4"> Product Specifications</h3>
            <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium"> SKU:</span>
                  <span className="text-gray-600">{product.id}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium"> Category:</span>
                  <span className="text-gray-600">{product.categories.map(c => c.name).join(', ')}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium"> Seller:</span>
                  <span className="text-gray-600">GemCart</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium"> Shipping:</span>
                  <span className="text-green-600 font-semibold"> Free Worldwide</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;