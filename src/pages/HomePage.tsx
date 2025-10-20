import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import CafeList from '../components/organisms/CafeList';
import Button from '../components/atoms/Button';
import { getCafes } from '../services/api';

interface Cafe {
  _id: string;
  name: string;
  location: string;
  rating: number;
  isOpen: boolean;
  image?: string;
}

const HomePage: React.FC = () => {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async () => {
    try {
      setLoading(true);
      const data = await getCafes();
      setCafes(data);
    } catch (error) {
      console.error('Error fetching cafes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/cafes/${id}`);
  };

  return (
    <MainLayout>
      {/* Hero Section - Cafe Image with Overlay */}
      <section className="relative -mt-20 mb-0">
        <div className="w-full h-[600px] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=600&fit=crop"
            alt="Cafe exterior"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
          
          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                Welcome to CafeConnect
              </h1>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                Discover the perfect blend of ambiance and flavor
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/cafes')}
                  className="bg-amber-600 hover:bg-amber-700 shadow-2xl"
                >
                  Explore Cafes
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white/20 backdrop-blur-md border-2 border-white/50 hover:bg-white/30 text-white shadow-2xl"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section - Dark Background with Glassmorphism */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image with Glassmorphism Frame */}
            <div className="relative">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '1rem',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop"
                  alt="Cappuccino Latte"
                  className="w-full h-[400px] object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Product Description with Glassmorphism Card */}
            <div 
              className="space-y-6 p-8 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
              }}
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                CAPPUCCINO LATTE
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                Experience the perfect harmony of rich espresso and velvety steamed milk, 
                topped with a delicate layer of microfoam. Our signature Cappuccino Latte 
                is crafted by expert baristas using premium Arabica beans, ensuring every 
                sip delivers an unforgettable coffee experience.
              </p>

              <p className="text-gray-300 leading-relaxed">
                Whether you're starting your day or taking a well-deserved break, our 
                Cappuccino Latte offers the perfect balance of bold flavor and smooth 
                texture. Customize it with your choice of milk alternatives and flavor shots 
                to make it uniquely yours.
              </p>

              <div className="pt-4 flex gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/cafes')}
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-xl"
                >
                  Explore Our Menu
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white"
                >
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section - Coffee Varieties */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Our Signature Menu
            </h2>
            <p className="text-gray-400 text-lg">
              Discover our premium coffee selection
            </p>
          </div>

          {/* Coffee Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Arabic Coffee */}
            <div 
              className="group rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=300&fit=crop"
                  alt="Arabic Coffee"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  ARABIC COFFEE
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  Traditional Middle Eastern coffee with aromatic spices including cardamom. 
                  Rich, bold flavor that awakens your senses with every sip.
                </p>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-2xl font-bold text-amber-500">Rp 35.000</span>
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Luwak Coffee */}
            <div 
              className="group rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop"
                  alt="Luwak Coffee"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Premium
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  LUWAK COFFEE
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  Indonesia's finest and rarest coffee. Smooth, earthy flavor with hints of 
                  chocolate and caramel. A truly luxurious coffee experience.
                </p>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-2xl font-bold text-amber-500">Rp 75.000</span>
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </div>

            {/* Milk Coffee */}
            <div 
              className="group rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop"
                  alt="Milk Coffee"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  MILK COFFEE
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  Perfect blend of espresso and steamed milk. Smooth, creamy texture with 
                  balanced sweetness. Ideal for those who love a milder coffee taste.
                </p>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-2xl font-bold text-amber-500">Rp 28.000</span>
                  <Button 
                    variant="primary" 
                    size="sm"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/cafes')}
              className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white"
            >
              View Full Menu
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
