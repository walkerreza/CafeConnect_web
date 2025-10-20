import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Stats data
  const stats = [
    {
      title: 'Total Revenue',
      value: 'Rp 45.250.000',
      change: '+12.5%',
      icon: '💰',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      icon: '📦',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Users',
      value: '856',
      change: '+15.3%',
      icon: '👥',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Products',
      value: '48',
      change: '+3',
      icon: '☕',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  const quickActions = [
    { title: 'Payments', icon: '💳', route: '/admin/payments', color: 'bg-green-500' },
    { title: 'Users', icon: '👤', route: '/admin/users', color: 'bg-blue-500' },
    { title: 'Products', icon: '🛍️', route: '/admin/products', color: 'bg-purple-500' },
    { title: 'Stock', icon: '📊', route: '/admin/stock', color: 'bg-orange-500' },
    { title: 'Cashier', icon: '🧾', route: '/admin/cashier', color: 'bg-pink-500' },
    { title: 'Reports', icon: '📈', route: '/admin/reports', color: 'bg-indigo-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">☕</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, Admin!</p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/')}
            >
              Back to Site
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-r ${stat.color} p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-opacity-90 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-white text-3xl font-bold mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className="text-5xl opacity-80">{stat.icon}</div>
                </div>
                <div className="mt-4">
                  <span className="text-white text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
                    {stat.change} from last month
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.route)}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all hover:scale-105"
              >
                <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 shadow-lg`}>
                  {action.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {action.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
              <Button variant="secondary" size="sm" onClick={() => navigate('/admin/payments')}>
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 font-bold">#{item}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Order #{1000 + item}</p>
                      <p className="text-sm text-gray-500">2 items • 5 mins ago</p>
                    </div>
                  </div>
                  <span className="text-green-600 font-bold">Rp 85.000</span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Low Stock Alert</h2>
              <Button variant="secondary" size="sm" onClick={() => navigate('/admin/stock')}>
                Manage Stock
              </Button>
            </div>
            <div className="space-y-3">
              {['Arabica Beans', 'Milk', 'Sugar', 'Cups', 'Straws'].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600">⚠️</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item}</p>
                      <p className="text-sm text-red-600">Only {5 - index} units left</p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="bg-red-600 hover:bg-red-700">
                    Restock
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
