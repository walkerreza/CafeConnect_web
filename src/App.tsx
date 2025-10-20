import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CafesPage from './pages/CafesPage';
import CafeDetailPage from './pages/CafeDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import PaymentsPage from './pages/admin/PaymentsPage';
import UsersPage from './pages/admin/UsersPage';
import ProductsPage from './pages/admin/ProductsPage';
import StockPage from './pages/admin/StockPage';
import CashierPage from './pages/admin/CashierPage';
import ReportsPage from './pages/admin/ReportsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cafes" element={<CafesPage />} />
        <Route path="/cafes/:id" element={<CafeDetailPage />} />
        <Route path="/menu/:id" element={<CafeDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/payments" element={<PaymentsPage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/stock" element={<StockPage />} />
        <Route path="/admin/cashier" element={<CashierPage />} />
        <Route path="/admin/reports" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
