import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/sampleProducts';

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const [filters, setFilters] = useState({
        search: '',
        category: urlParams.get('category') || '',
        sort: '',
        minPrice: '',
        maxPrice: ''
    });

    useEffect(() => {
        const urlCategory = urlParams.get('category');
        if (urlCategory && urlCategory !== filters.category) {
            setFilters(prev => ({ ...prev, category: urlCategory }));
        }
    }, [location.search]);

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [filters]);

    const fetchProducts = () => {
        // Use sample data for demonstration
        let filteredProducts = [...sampleProducts];
        
        // Apply filters
        if (filters.search) {
            filteredProducts = filteredProducts.filter(product => 
                product.title.toLowerCase().includes(filters.search.toLowerCase())
            );
        }
        
        if (filters.category) {
            filteredProducts = filteredProducts.filter(product => 
                product.categories[0].name === filters.category
            );
        }
        
        if (filters.minPrice) {
            filteredProducts = filteredProducts.filter(product => 
                parseFloat(product.price) >= parseFloat(filters.minPrice)
            );
        }
        
        if (filters.maxPrice) {
            filteredProducts = filteredProducts.filter(product => 
                parseFloat(product.price) <= parseFloat(filters.maxPrice)
            );
        }
        
        // Apply sorting
        if (filters.sort === 'price_asc') {
            filteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (filters.sort === 'price_desc') {
            filteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (filters.sort === 'name_asc') {
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        }
        
        setProducts(filteredProducts);
        setLoading(false);
    };

    const fetchCategories = () => {
        // Extract unique categories from sample data
        const uniqueCategories = [...new Set(sampleProducts.map(product => product.categories[0].name))];
        setCategories(uniqueCategories.map(name => ({ name })));
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setLoading(true);
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin text-6xl mb-4">💎</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Luxury Collection</h2>
                <p className="text-gray-600">Discovering exquisite pieces for you...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">💎 Luxury Jewelry Collection</h1>
                    <p className="text-xl text-gray-300 mb-8">🌟 Discover Exquisite Pieces Crafted to Perfection</p>
                    <div className="flex justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2">
                            <span>🎆</span>
  
                          <span>Free Worldwide Shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>🔒</span>
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✨</span>
                            <span>Lifetime Warranty</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto p-6">
                {/* Quick Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {['All', 'Rings', 'Necklaces', 'Watches', 'Earrings', 'Bracelets', 'Chains'].map((cat, index) => {
                        const colors = [
                            'from-purple-500 to-pink-500',
                            'from-blue-500 to-cyan-500', 
                            'from-green-500 to-emerald-500',
                            'from-yellow-500 to-orange-500',
                            'from-red-500 to-pink-500',
                            'from-indigo-500 to-purple-500',
                            'from-teal-500 to-blue-500'
                        ];
                        return (
                        <button
                            key={cat}
                            onClick={() => handleFilterChange('category', cat === 'All' ? '' : cat)}
                            className={`px-6 py-3 rounded-full font-serif font-semibold transition-all duration-300 ${
                                (cat === 'All' && !filters.category) || filters.category === cat
                                    ? `bg-gradient-to-r ${colors[index]} text-white shadow-lg transform scale-105`
                                    : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-purple-600 shadow-md'
                            }`}
                        >
                            {cat === 'All' ? '🏷️ All' : 
                             cat === 'Rings' ? '💍 Rings' :
                             cat === 'Necklaces' ? '💿 Necklaces' :
                             cat === 'Watches' ? '⌚ Watches' :
                             cat === 'Earrings' ? '👂 Earrings' :
                             cat === 'Bracelets' ? '📝 Bracelets' :
                             '🔗 Chains'}
                        </button>
                    )})}
                </div>
                
                {/* Advanced Filters */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search jewelry..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                            <span className="absolute left-4 top-4 text-gray-400">🔍</span>
                        </div>
                        
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min $"
                                value={filters.minPrice}
                                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                className="flex-1 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                            <input
                                type="number"
                                placeholder="Max $"
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                className="flex-1 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>
                        
                        <select
                            value={filters.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                            <option value="">Sort By</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="name_asc">Name: A to Z</option>
                        </select>
                        
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                            <span className="text-gray-600 font-medium">{products.length} Products</span>
                            <button className="text-teal-600 hover:text-teal-700 font-semibold">
                                📋 View Grid
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                
                {products.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                        <button 
                            onClick={() => setFilters({search: '', category: '', sort: '', minPrice: '', maxPrice: ''})}
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all font-serif font-semibold"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;