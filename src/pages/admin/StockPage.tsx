import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';

interface Stock {
  id: string;
  itemName: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  lastRestocked: string;
  supplier: string;
}

const StockPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [restockAmount, setRestockAmount] = useState('');

  const [stocks, setStocks] = useState<Stock[]>([
    { id: '1', itemName: 'Arabica Coffee Beans', category: 'Raw Material', currentStock: 50, minStock: 20, unit: 'kg', lastRestocked: '2025-01-15', supplier: 'Coffee Supplier A' },
    { id: '2', itemName: 'Fresh Milk', category: 'Raw Material', currentStock: 30, minStock: 15, unit: 'liter', lastRestocked: '2025-01-19', supplier: 'Dairy Farm B' },
    { id: '3', itemName: 'Sugar', category: 'Raw Material', currentStock: 8, minStock: 10, unit: 'kg', lastRestocked: '2025-01-10', supplier: 'Sugar Co.' },
    { id: '4', itemName: 'Paper Cups', category: 'Packaging', currentStock: 500, minStock: 200, unit: 'pcs', lastRestocked: '2025-01-18', supplier: 'Packaging Ltd' },
    { id: '5', itemName: 'Plastic Straws', category: 'Packaging', currentStock: 150, minStock: 300, unit: 'pcs', lastRestocked: '2025-01-12', supplier: 'Packaging Ltd' },
    { id: '6', itemName: 'Cardamom', category: 'Spices', currentStock: 5, minStock: 3, unit: 'kg', lastRestocked: '2025-01-05', supplier: 'Spice Merchant' },
  ]);

  const handleRestock = (stock: Stock) => {
    setSelectedStock(stock);
    setRestockAmount('');
    setShowModal(true);
  };

  const handleRestockSubmit = () => {
    if (selectedStock && restockAmount) {
      setStocks(stocks.map(s => 
        s.id === selectedStock.id 
          ? { ...s, currentStock: s.currentStock + Number(restockAmount), lastRestocked: new Date().toISOString().split('T')[0] }
          : s
      ));
      setShowModal(false);
      setSelectedStock(null);
      setRestockAmount('');
    }
  };

  const filteredStocks = stocks.filter(stock =>
    stock.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockItems = stocks.filter(s => s.currentStock < s.minStock);
  const totalItems = stocks.length;
  const totalValue = stocks.reduce((sum, s) => sum + (s.currentStock * 10000), 0); // Dummy calculation

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" onClick={() => navigate('/admin')}>
                ← Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Stock Management</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Total Items</p>
            <p className="text-3xl font-bold mt-2">{totalItems}</p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Low Stock Alert</p>
            <p className="text-3xl font-bold mt-2">{lowStockItems.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Stock Value</p>
            <p className="text-3xl font-bold mt-2">Rp {(totalValue / 1000000).toFixed(1)}M</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Categories</p>
            <p className="text-3xl font-bold mt-2">{new Set(stocks.map(s => s.category)).size}</p>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-lg font-bold text-red-800">Low Stock Alert!</h3>
            </div>
            <p className="text-red-700 mb-3">{lowStockItems.length} items are below minimum stock level</p>
            <div className="flex flex-wrap gap-2">
              {lowStockItems.map(item => (
                <span key={item.id} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  {item.itemName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <input
            type="text"
            placeholder="Search stock items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Stock Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Item Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Current Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Min Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Unit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Supplier</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Restocked</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStocks.map((stock) => (
                  <tr key={stock.id} className={`hover:bg-gray-50 ${stock.currentStock < stock.minStock ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{stock.itemName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{stock.category}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${
                        stock.currentStock < stock.minStock ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {stock.currentStock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{stock.minStock}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{stock.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{stock.supplier}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{stock.lastRestocked}</td>
                    <td className="px-6 py-4">
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleRestock(stock)}
                      >
                        Restock
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Restock Modal */}
      {showModal && selectedStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Restock Item</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Item Name</p>
                <p className="text-lg font-semibold text-gray-800">{selectedStock.itemName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Stock</p>
                <p className="text-lg font-semibold text-gray-800">{selectedStock.currentStock} {selectedStock.unit}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Restock Amount ({selectedStock.unit})</label>
                <input
                  type="number"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  placeholder="Enter amount to add"
                  min="1"
                />
              </div>
              {restockAmount && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">New Stock Level:</p>
                  <p className="text-2xl font-bold text-green-600">
                    {selectedStock.currentStock + Number(restockAmount)} {selectedStock.unit}
                  </p>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="primary" 
                  className="flex-1"
                  onClick={handleRestockSubmit}
                  disabled={!restockAmount || Number(restockAmount) <= 0}
                >
                  Confirm Restock
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedStock(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPage;
