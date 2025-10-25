import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCollection = () => {
  const featuredItems = [
    {
      id: 1,
      title: "Diamond Eternity Ring",
      price: 2850,
      originalPrice: 3200,
      image: "https://i.pinimg.com/736x/6e/0d/dd/6e0ddd9590f6d49a68e5b7b097c222cf.jpg",
      badge: "BESTSELLER",
      rating: 4.9
    },
    {
      id: 2,
      title: "Pearl Elegance Necklace",
      price: 1250,
      originalPrice: 1450,
      image: "https://i.pinimg.com/1200x/d9/3f/10/d93f107c2415cdf0595e54d05b36a5ed.jpg",
      badge: "NEW",
      rating: 4.8
    },
    {
      id: 3,
      title: "Swiss Luxury Watch",
      price: 3500,
      originalPrice: 4000,
      image: "https://i.pinimg.com/736x/70/a3/97/70a39735cff667be25113d6becab4bda.jpg",
      badge: "LIMITED",
      rating: 5.0
    },
    {
      id: 4,
      title: "Silver Bracelet",
      price: 850,
      originalPrice: 950,
      image: "https://i.pinimg.com/1200x/66/31/94/663194433984d1c9a6e62b2005194949.jpg",
      badge: "TRENDING",
      rating: 4.7
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold mb-4 text-gray-800">
            ✨ Featured Collection
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-elegant">
            Handpicked luxury pieces that define elegance
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredItems.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">


              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">


                {/* Title */}
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                  {item.title}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                </div>

                {/* Quick Actions */}
                <Link 
                  to={`/products/${item.id}`}
                  className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-2 px-4 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all font-serif font-semibold text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link 
            to="/products"
            className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 text-white px-12 py-4 rounded-full text-lg font-serif font-semibold hover:from-gray-900 hover:to-black transition-all transform hover:scale-105 shadow-xl"
          >
            View Full Collection →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;