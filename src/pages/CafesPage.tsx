import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/templates/MainLayout';
import SearchBar from '../components/molecules/SearchBar';
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
}

const CafesPage: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Dummy data untuk menu
  const dummyMenus: Menu[] = [
    {
      _id: '1',
      name: 'Arabic Coffee',
      category: 'coffee',
      description: 'Traditional Middle Eastern coffee with aromatic spices including cardamom.',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=300&fit=crop',
      rating: 4.8,
      isAvailable: true,
      isPremium: false
    },
    {
      _id: '2',
      name: 'Luwak Coffee',
      category: 'coffee',
      description: "Indonesia's finest and rarest coffee. Smooth, earthy flavor with hints of chocolate.",
      price: 75000,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
      rating: 5.0,
      isAvailable: true,
      isPremium: true
    },
    {
      _id: '3',
      name: 'Milk Coffee',
      category: 'coffee',
      description: 'Perfect blend of espresso and steamed milk. Smooth and creamy.',
      price: 28000,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
      rating: 4.5,
      isAvailable: true,
      isPremium: false
    },
    {
      _id: '4',
      name: 'Cappuccino Latte',
      category: 'coffee',
      description: 'Rich espresso with velvety steamed milk and microfoam.',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      rating: 4.7,
      isAvailable: true,
      isPremium: false
    },
    {
      _id: '5',
      name: 'Espresso',
      category: 'coffee',
      description: 'Strong and bold Italian coffee shot.',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
      rating: 4.6,
      isAvailable: true,
      isPremium: false
    },
    {
      _id: '6',
      name: 'Americano',
      category: 'coffee',
      description: 'Espresso with hot water for a smooth, rich taste.',
      price: 27000,
      image: 'https://images.unsplash.com/photo-1532004491497-ba35c367d634?w=400&h=300&fit=crop',
      rating: 4.4,
      isAvailable: true,
      isPremium: false
    }
  ];

  useEffect(() => {
    setMenus(dummyMenus);
    setFilteredMenus(dummyMenus);
  }, []);

  const handleSearch = (query: string) => {
    const filtered = menus.filter((menu) =>
      menu.name.toLowerCase().includes(query.toLowerCase()) ||
      menu.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMenus(filtered);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter((menu) => menu.category === category);
      setFilteredMenus(filtered);
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/menu/${id}`);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 -mx-4 px-4 mb-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Our Complete Menu
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Explore our premium coffee selection
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} placeholder="Search menu..." />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleCategoryFilter('all')}
              className={selectedCategory === 'all' ? 'bg-amber-600' : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white'}
            >
              All Menu
            </Button>
            <Button
              variant={selectedCategory === 'coffee' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleCategoryFilter('coffee')}
              className={selectedCategory === 'coffee' ? 'bg-amber-600' : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white'}
            >
              Coffee
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenus.map((menu) => (
            <div
              key={menu._id}
              className="group rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer bg-white shadow-lg"
              onClick={() => handleViewDetails(menu._id)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {menu.isPremium && (
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Premium
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {menu.name}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {menu.description}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold text-gray-700">{menu.rating.toFixed(1)}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-amber-600">
                    Rp {menu.price.toLocaleString('id-ID')}
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Order:', menu.name);
                    }}
                  >
                    Order
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
    
      

        {filteredMenus.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No menu found</p>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default CafesPage;
