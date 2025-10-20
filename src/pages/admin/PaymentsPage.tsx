import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';

interface Payment {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

const PaymentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const payments: Payment[] = [
    { id: '1', orderId: 'ORD-1001', customer: 'John Doe', amount: 85000, method: 'Credit Card', status: 'completed', date: '2025-01-19 14:30' },
    { id: '2', orderId: 'ORD-1002', customer: 'Jane Smith', amount: 125000, method: 'Cash', status: 'completed', date: '2025-01-19 14:25' },
    { id: '3', orderId: 'ORD-1003', customer: 'Bob Wilson', amount: 65000, method: 'E-Wallet', status: 'pending', date: '2025-01-19 14:20' },
    { id: '4', orderId: 'ORD-1004', customer: 'Alice Brown', amount: 95000, method: 'Debit Card', status: 'completed', date: '2025-01-19 14:15' },
    { id: '5', orderId: 'ORD-1005', customer: 'Charlie Davis', amount: 45000, method: 'Cash', status: 'failed', date: '2025-01-19 14:10' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" onClick={() => navigate('/admin')}>
                ← Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Payment Monitoring</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Total Revenue</p>
            <p className="text-3xl font-bold mt-2">Rp {totalRevenue.toLocaleString('id-ID')}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Completed</p>
            <p className="text-3xl font-bold mt-2">{payments.filter(p => p.status === 'completed').length}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Pending</p>
            <p className="text-3xl font-bold mt-2">{payments.filter(p => p.status === 'pending').length}</p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-sm opacity-90">Failed</p>
            <p className="text-3xl font-bold mt-2">{payments.filter(p => p.status === 'failed').length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by customer or order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Method</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.orderId}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.customer}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      Rp {payment.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.method}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{payment.date}</td>
                    <td className="px-6 py-4">
                      <Button variant="secondary" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentsPage;
