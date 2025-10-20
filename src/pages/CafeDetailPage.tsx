import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import Button from '../components/atoms/Button';

interface Menu {
  _id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image?: string;
  rating: number;
  isAvailable: boolean;
  isPremium: boolean;
  ingredients?: string[];
  calories?: number;
  preparationTime?: number;
}

const CafeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Dummy data
  const dummyMenus: Menu[] = [
    {
      _id: '1',
      name: 'Arabic Coffee',
      category: 'coffee',
      description: 'Traditional Middle Eastern coffee with aromatic spices including cardamom. Rich, bold flavor that awakens your senses with every sip. Made from premium Arabica beans sourced from the finest plantations.',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&h=600&fit=crop',
      rating: 4.8,
      isAvailable: true,
      isPremium: false,
      ingredients: ['Arabica Coffee', 'Cardamom', 'Water', 'Sugar (optional)'],
      calories: 5,
      preparationTime: 5
    },
    {
      _id: '2',
      name: 'Luwak Coffee',
      category: 'coffee',
      description: "Indonesia's finest and rarest coffee. Smooth, earthy flavor with hints of chocolate and caramel. A truly luxurious coffee experience that coffee connoisseurs around the world seek.",
      price: 75000,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop',
      rating: 5.0,
      isAvailable: true,
      isPremium: true,
      ingredients: ['Premium Luwak Coffee Beans', 'Hot Water'],
      calories: 2,
      preparationTime: 7
    },
    {
      _id: '3',
      name: 'Milk Coffee',
      category: 'coffee',
      description: 'Perfect blend of espresso and steamed milk. Smooth, creamy texture with balanced sweetness. Ideal for those who love a milder coffee taste with a velvety finish.',
      price: 28000,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop',
      rating: 4.5,
      isAvailable: true,
      isPremium: false,
      ingredients: ['Espresso', 'Fresh Milk', 'Sugar'],
      calories: 120,
      preparationTime: 4
    },
    {
      _id: '4',
      name: 'Cappuccino Latte',
      category: 'coffee',
      description: 'Rich espresso with velvety steamed milk and delicate microfoam. The perfect harmony of bold coffee flavor and smooth, creamy texture.',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
      rating: 4.7,
      isAvailable: true,
      isPremium: false,
      ingredients: ['Espresso', 'Steamed Milk', 'Milk Foam'],
      calories: 150,
      preparationTime: 5
    },
    {
      _id: '5',
      name: 'Espresso',
      category: 'coffee',
      description: 'Strong and bold Italian coffee shot. Pure, concentrated coffee flavor for true coffee enthusiasts.',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&h=600&fit=crop',
      rating: 4.6,
      isAvailable: true,
      isPremium: false,
      ingredients: ['Premium Espresso Beans', 'Hot Water'],
      calories: 3,
      preparationTime: 3
    },
    {
      _id: '6',
      name: 'Americano',
      category: 'coffee',
      description: 'Espresso with hot water for a smooth, rich taste. Perfect balance of strength and smoothness.',
      price: 27000,
      image: 'https://images.unsplash.com/photo-1532004491497-ba35c367d634?w=800&h=600&fit=crop',
      rating: 4.4,
      isAvailable: true,
      isPremium: false,
      ingredients: ['Espresso', 'Hot Water'],
      calories: 5,
      preparationTime: 4
    }
  ];

  useEffect(() => {
    if (id) {
      fetchMenu(id);
    }
  }, [id]);

  const fetchMenu = (menuId: string) => {
    setLoading(true);
    const foundMenu = dummyMenus.find(m => m._id === menuId);
    setMenu(foundMenu || null);
    setLoading(false);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse container mx-auto px-4">
          <div className="bg-gray-200 h-96 rounded-lg mb-6"></div>
          <div className="bg-gray-200 h-8 w-1/2 rounded mb-4"></div>
          <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
        </div>
      </MainLayout>
    );
  }

  if (!menu) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu not found</h2>
          <Button onClick={() => navigate('/cafes')}>Back to Menu</Button>
        </div>
      </MainLayout>
    );
  }

  const totalPrice = menu.price * quantity;

  return (
    <MainLayout>
      {/* Hero Section with Background */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 -mx-4 px-4 mb-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/cafes')} 
            className="mb-6 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white"
          >
            ← Back to Menu
          </Button>
        </div>
      </section>

      {/* Menu Detail Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            {menu.isPremium && (
              <div className="absolute top-6 right-6 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Premium
              </div>
            )}
          </div>

          {/* Info Section with Glassmorphism */}
          <div 
            className="rounded-2xl p-8 space-y-6"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Title and Badge */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{menu.name}</h1>
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                {menu.category}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-2xl">⭐</span>
              <span className="text-2xl font-bold text-gray-800">{menu.rating.toFixed(1)}</span>
              <span className="text-gray-500">(128 reviews)</span>
            </div>

            {/* Price */}
            <div className="border-t border-b py-4">
              <span className="text-4xl font-bold text-amber-600">
                Rp {menu.price.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{menu.description}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {menu.preparationTime && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Prep Time</p>
                  <p className="font-semibold text-gray-800">⏱️ {menu.preparationTime} mins</p>
                </div>
              )}
              {menu.calories && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="font-semibold text-gray-800">🔥 {menu.calories} kcal</p>
                </div>
              )}
            </div>

            {/* Ingredients */}
            {menu.ingredients && menu.ingredients.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {menu.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-gray-800 w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total and Order Button */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-600">Total:</span>
                <span className="text-3xl font-bold text-amber-600">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-xl"
                onClick={() => console.log('Order:', menu.name, 'Qty:', quantity)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CafeDetailPage;
