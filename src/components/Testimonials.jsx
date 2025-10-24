import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "Absolutely stunning quality! My engagement ring exceeded all expectations. The craftsmanship is impeccable.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "London, UK",
      rating: 5,
      text: "The Swiss watch I purchased is a masterpiece. Excellent customer service and fast worldwide shipping.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emma Williams",
      location: "Sydney, Australia",
      rating: 5,
      text: "GemCart has the most beautiful collection. The pearl necklace I bought is my most treasured piece.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold mb-4 text-yellow-400">
            💎 What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 font-elegant">
            Trusted by jewelry lovers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
              {/* Stars */}
              <div className="flex justify-center mb-4">
                {Array.from({length: testimonial.rating}, (_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-200 text-lg mb-6 font-elegant italic text-center">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-serif font-semibold text-yellow-400">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center space-x-8 text-gray-300">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">50K+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">25+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">99%</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;