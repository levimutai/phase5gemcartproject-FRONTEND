import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/sampleProducts';

function Products() {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const [filters, setFilters] = useState({
        search: urlParams.get('search') || '',
        category: urlParams.get('category') || ''
    });

    useEffect(() => {
        const newUrlParams = new URLSearchParams(location.search);
        const urlCategory = newUrlParams.get('category') || '';
        const urlSearch = newUrlParams.get('search') || '';
        
        setFilters(prev => ({
            ...prev,
            category: urlCategory,
            search: urlSearch
        }));
    }, [location.search]);

    useEffect(() => {
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
        
        setProducts(filteredProducts);
        setLoading(false);
    }, [filters]);



    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setLoading(true);
    };

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin text-6xl mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Luxury Collection</h2>
                <p className="text-gray-600">Discovering exquisite pieces for you...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4"> Luxury Jewelry Collection</h1>
                    <p className="text-xl text-gray-300 mb-8"> Discover Exquisite Pieces Crafted to Perfection</p>
                    <div className="flex justify-center gap-8 text-sm">
                        <div className="flex items-center gap-2">
                            <span>🎆</span>
                            <span>Free Worldwide Shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span></span>
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span></span>
                            <span>Lifetime Warranty</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto p-6">
                {/* Quick Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {['All', 'Rings', 'Necklaces', 'Watches', 'Bracelets'].map((cat, index) => {
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
                            onClick={() => {
                                if (cat === 'All') {
                                    handleFilterChange('search', 'new');
                                } else {
                                    handleFilterChange('category', cat);
                                }
                            }}
                            className={`px-6 py-3 rounded-full font-serif font-semibold transition-all duration-300 ${
                                (cat === 'All' && filters.search === 'new') || filters.category === cat
                                    ? `bg-gradient-to-r ${colors[index]} text-white shadow-lg transform scale-105`
                                    : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 hover:text-purple-600 shadow-md'
                            }`}
                        >
                            {cat === 'All' ? '🆕 New Arrivals' : 
                             cat === 'Rings' ? '💍 Rings' :
                             cat === 'Necklaces' ? '💿 Necklaces' :
                             cat === 'Watches' ? '⌚ Watches' :
                             '📝 Bracelets'}
                        </button>
                    )})}
                </div>
                

                
                {/* Products Grid */}
                {filters.category === '' && filters.search !== 'new' && filters.search === '' ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">💎</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Our Collection</h3>
                        <p className="text-gray-500 mb-6">Click on "New Arrivals" above to browse our latest jewelry</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
                
                {products.length === 0 && (filters.search || filters.category) && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your search or category</p>
                        <button 
                            onClick={() => setFilters({search: '', category: ''})}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-serif font-semibold"
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