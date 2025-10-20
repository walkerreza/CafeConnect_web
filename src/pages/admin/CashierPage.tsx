import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

const CashierPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerName, setCustomerName] = useState('');

  const products: Product[] = [
    { id: '1', name: 'Arabic Coffee', price: 35000, category: 'coffee' },
    { id: '2', name: 'Luwak Coffee', price: 75000, category: 'coffee' },
    { id: '3', name: 'Milk Coffee', price: 28000, category: 'coffee' },
    { id: '4', name: 'Cappuccino', price: 32000, category: 'coffee' },
    { id: '5', name: 'Espresso', price: 25000, category: 'coffee' },
    { id: '6', name: 'Americano', price: 27000, category: 'coffee' },
  ];

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    
    const orderData = {
      customer: customerName || 'Walk-in Customer',
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod,
      timestamp: new Date().toISOString()
    };
    
    console.log('Order:', orderData);
    alert(`Order completed!\nTotal: Rp ${total.toLocaleString('id-ID')}\nPayment: ${paymentMethod}`);
    
    // Reset
    setCart([]);
    setCustomerName('');
    setPaymentMethod('cash');
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
              <h1 className="text-2xl font-bold text-gray-800">Cashier / POS</h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Cashier: Admin</p>
              <p className="text-sm text-gray-500">{new Date().toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left"
                >
                  <div className="w-full h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-4xl">☕</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-lg font-bold text-amber-600">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Current Order</h2>

              {/* Customer Name */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Customer name (optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">Cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Summary */}
              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (10%):</span>
                  <span className="font-semibold">Rp {tax.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-amber-600">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="cash">Cash</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="e_wallet">E-Wallet</option>
                </select>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  variant="primary"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                >
                  Complete Order
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setCart([])}
                  disabled={cart.length === 0}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CashierPage;
