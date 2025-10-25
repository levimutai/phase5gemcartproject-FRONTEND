import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';

function AddProduct() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    inventory_count: '',
    images: []
  });

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (images) => {
    setProduct({
      ...product,
      images: Array.isArray(images) ? images : [{ url: images }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...product,
          image_url: product.images[0]?.url
        })
      });
      
      if (response.ok) {
        alert('Product added successfully!');
        setProduct({ title: '', description: '', price: '', inventory_count: '', images: [] });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Product Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              step="0.01"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Inventory</label>
            <input
              type="number"
              name="inventory_count"
              value={product.inventory_count}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Product Images</label>
          <ImageUpload onUpload={handleImageUpload} multiple={true} />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg font-serif font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;