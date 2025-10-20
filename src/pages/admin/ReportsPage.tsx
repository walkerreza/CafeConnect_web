import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';

const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('today');
  const [reportType, setReportType] = useState('sales');

  // Dummy data
  const salesData = {
    totalSales: 4250000,
    totalOrders: 156,
    averageOrder: 27244,
    topProducts: [
      { name: 'Luwak Coffee', sales: 1500000, orders: 20 },
      { name: 'Cappuccino', sales: 960000, orders: 30 },
      { name: 'Arabic Coffee', sales: 875000, orders: 25 },
      { name: 'Milk Coffee', sales: 560000, orders: 20 },
      { name: 'Espresso', sales: 355000, orders: 14 },
    ],
    salesByHour: [
      { hour: '08:00', sales: 250000 },
      { hour: '09:00', sales: 380000 },
      { hour: '10:00', sales: 520000 },
      { hour: '11:00', sales: 450000 },
      { hour: '12:00', sales: 680000 },
      { hour: '13:00', sales: 590000 },
      { hour: '14:00', sales: 420000 },
      { hour: '15:00', sales: 360000 },
      { hour: '16:00', sales: 300000 },
      { hour: '17:00', sales: 300000 },
    ]
  };

  const paymentMethods = [
    { method: 'Cash', amount: 1700000, percentage: 40 },
    { method: 'Credit Card', amount: 1275000, percentage: 30 },
    { method: 'E-Wallet', amount: 850000, percentage: 20 },
    { method: 'Debit Card', amount: 425000, percentage: 10 },
  ];

  const handleExport = (format: string) => {
    alert(`Exporting report as ${format}...`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" onClick={() => navigate('/admin')}>
                ← Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => handleExport('PDF')}>
                📄 Export PDF
              </Button>
              <Button variant="secondary" size="sm" onClick={() => handleExport('Excel')}>
                📊 Export Excel
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value="sales">Sales Report</option>
                <option value="products">Product Performance</option>
                <option value="customers">Customer Analytics</option>
                <option value="inventory">Inventory Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button variant="primary" className="w-full">
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Total Sales</p>
            <p className="text-3xl font-bold mt-2">Rp {salesData.totalSales.toLocaleString('id-ID')}</p>
            <p className="text-sm mt-2 opacity-80">+15.3% from yesterday</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Total Orders</p>
            <p className="text-3xl font-bold mt-2">{salesData.totalOrders}</p>
            <p className="text-sm mt-2 opacity-80">+8.2% from yesterday</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Average Order</p>
            <p className="text-3xl font-bold mt-2">Rp {salesData.averageOrder.toLocaleString('id-ID')}</p>
            <p className="text-sm mt-2 opacity-80">+5.1% from yesterday</p>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Top Product</p>
            <p className="text-xl font-bold mt-2">{salesData.topProducts[0].name}</p>
            <p className="text-sm mt-2 opacity-80">{salesData.topProducts[0].orders} orders</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Top Selling Products</h2>
            <div className="space-y-4">
              {salesData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-600">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">Rp {product.sales.toLocaleString('id-ID')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Methods</h2>
            <div className="space-y-4">
              {paymentMethods.map((payment, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-gray-800">{payment.method}</span>
                    <span className="font-bold text-gray-800">Rp {payment.amount.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all"
                      style={{ width: `${payment.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{payment.percentage}% of total</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales by Hour */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Sales by Hour</h2>
          <div className="space-y-3">
            {salesData.salesByHour.map((data, index) => {
              const maxSales = Math.max(...salesData.salesByHour.map(d => d.sales));
              const percentage = (data.sales / maxSales) * 100;
              return (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-600 w-16">{data.hour}</span>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-8 relative">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end pr-3 transition-all"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-white text-sm font-semibold">
                          Rp {data.sales.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                💰
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue Growth</p>
                <p className="text-2xl font-bold text-green-600">+15.3%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                👥
              </div>
              <div>
                <p className="text-sm text-gray-500">New Customers</p>
                <p className="text-2xl font-bold text-blue-600">+24</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                ⭐
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer Satisfaction</p>
                <p className="text-2xl font-bold text-purple-600">4.8/5.0</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
