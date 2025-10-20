import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: 'available' | 'unavailable';
}

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'coffee',
    price: '',
    stock: '',
    image: '',
    status: 'available'
  });

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Arabic Coffee', category: 'coffee', price: 35000, stock: 50, image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=100', status: 'available' },
    { id: '2', name: 'Luwak Coffee', category: 'coffee', price: 75000, stock: 20, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100', status: 'available' },
    { id: '3', name: 'Milk Coffee', category: 'coffee', price: 28000, stock: 100, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100', status: 'available' },
    { id: '4', name: 'Cappuccino', category: 'coffee', price: 32000, stock: 75, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100', status: 'available' },
    { id: '5', name: 'Espresso', category: 'coffee', price: 25000, stock: 5, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=100', status: 'available' },
  ]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image,
      status: product.status
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
          : p
      ));
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image: formData.image || 'https://via.placeholder.com/100',
        status: formData.status as 'available' | 'unavailable'
      };
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', category: 'coffee', price: '', stock: '', image: '', status: 'available' });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" onClick={() => navigate('/admin')}>
                ← Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Product Management (CRUD)</h1>
            </div>
            <Button variant="primary" onClick={() => {
              setEditingProduct(null);
              setFormData({ name: '', category: 'coffee', price: '', stock: '', image: '', status: 'available' });
              setShowModal(true);
            }}>
              + Add Product
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Total Products</p>
            <p className="text-3xl font-bold mt-2">{products.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Available</p>
            <p className="text-3xl font-bold mt-2">{products.filter(p => p.status === 'available').length}</p>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Total Stock</p>
            <p className="text-3xl font-bold mt-2">{products.reduce((sum, p) => sum + p.stock, 0)}</p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Low Stock</p>
            <p className="text-3xl font-bold mt-2">{products.filter(p => p.stock < 10).length}</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    Stock: {product.stock}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                <p className="text-2xl font-bold text-amber-600 mb-4">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="flex-1 bg-red-50 text-red-600 hover:bg-red-100"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="coffee">Coffee</option>
                  <option value="non-coffee">Non-Coffee</option>
                  <option value="food">Food</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" className="flex-1">
                  {editingProduct ? 'Update' : 'Create'}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
