# 🎛️ Admin Panel Documentation

## Overview
Admin Panel CafeConnect adalah sistem manajemen lengkap untuk mengelola operasional cafe, termasuk monitoring pembayaran, user management, CRUD produk, stock management, kasir/POS, dan laporan.

## 📁 Struktur File

```
src/pages/admin/
├── DashboardPage.tsx      # Dashboard utama dengan overview
├── PaymentsPage.tsx       # Monitoring pembayaran
├── UsersPage.tsx          # Management user
├── ProductsPage.tsx       # CRUD produk
├── StockPage.tsx          # Management stok
├── CashierPage.tsx        # Sistem kasir/POS
└── ReportsPage.tsx        # Laporan & analytics
```

## 🚀 Cara Akses

### URL Routes:
- **Dashboard**: `/admin`
- **Payments**: `/admin/payments`
- **Users**: `/admin/users`
- **Products**: `/admin/products`
- **Stock**: `/admin/stock`
- **Cashier**: `/admin/cashier`
- **Reports**: `/admin/reports`

## 📊 Fitur-Fitur

### 1. Dashboard Page (`/admin`)
**Fitur:**
- Overview statistik (Revenue, Orders, Users, Products)
- Quick actions untuk navigasi cepat
- Recent orders list
- Low stock alerts
- Visual cards dengan gradient colors

**Stats yang ditampilkan:**
- Total Revenue dengan persentase growth
- Total Orders
- Active Users
- Total Products

### 2. Payments Page (`/admin/payments`)
**Fitur:**
- Monitoring semua transaksi pembayaran
- Filter berdasarkan status (completed, pending, failed)
- Search by customer atau order ID
- Stats cards untuk revenue dan status
- Table dengan detail lengkap

**Data yang ditampilkan:**
- Order ID
- Customer name
- Amount
- Payment method
- Status (dengan color coding)
- Date & time
- Action buttons

### 3. Users Page (`/admin/users`)
**Fitur:**
- User management (CRUD)
- Filter berdasarkan role (customer, staff, admin)
- Search by name atau email
- Stats untuk total users, customers, staff
- Add new user modal

**Data yang ditampilkan:**
- Name
- Email
- Phone
- Role (dengan badge)
- Status (active/inactive)
- Total orders
- Edit & Delete actions

### 4. Products Page (`/admin/products`)
**Fitur:**
- **CRUD lengkap** untuk produk
- Add, Edit, Delete products
- Search products
- Stats untuk total products, available, stock, low stock
- Modal form untuk create/update
- Grid view dengan cards

**Form fields:**
- Product name
- Category (coffee, non-coffee, food, snack)
- Price
- Stock
- Image URL
- Status

**Validasi:**
- Required fields
- Number validation untuk price & stock
- Real-time update

### 5. Stock Page (`/admin/stock`)
**Fitur:**
- Stock management & monitoring
- Low stock alerts (visual warning)
- Restock functionality
- Search items
- Stats untuk total items, low stock, stock value

**Data yang ditampilkan:**
- Item name
- Category
- Current stock (dengan color indicator)
- Minimum stock
- Unit
- Supplier
- Last restocked date
- Restock button

**Restock Modal:**
- Current stock display
- Input restock amount
- New stock level preview
- Confirmation

### 6. Cashier Page (`/admin/cashier`)
**Fitur:**
- Point of Sale (POS) system
- Product selection grid
- Shopping cart
- Quantity management
- Payment method selection
- Customer name (optional)
- Real-time calculation

**Perhitungan:**
- Subtotal
- Tax (10%)
- Total
- Per-item calculation

**Payment methods:**
- Cash
- Credit Card
- Debit Card
- E-Wallet

### 7. Reports Page (`/admin/reports`)
**Fitur:**
- Comprehensive analytics & reporting
- Multiple report types
- Date range filtering
- Export to PDF & Excel
- Visual charts & graphs

**Report types:**
- Sales Report
- Product Performance
- Customer Analytics
- Inventory Report

**Data yang ditampilkan:**
- Key metrics (Total Sales, Orders, Average Order)
- Top selling products
- Payment methods breakdown
- Sales by hour (bar chart)
- Revenue growth
- Customer satisfaction

## 🎨 Design System

### Color Scheme:
- **Primary**: Amber/Orange (coffee theme)
- **Success**: Green
- **Info**: Blue
- **Warning**: Yellow
- **Danger**: Red
- **Purple**: Admin/Staff

### Components:
- Gradient cards untuk stats
- Rounded corners (rounded-xl)
- Shadow effects (shadow-lg)
- Hover animations
- Responsive grid layouts
- Modal dialogs
- Tables dengan hover states

## 💾 Data Management

### Dummy Data:
Semua halaman menggunakan dummy data untuk demo. Data disimpan dalam state component.

### State Management:
- `useState` untuk local state
- Real-time updates
- Form validation
- Search & filter functionality

## 🔐 Security Notes

**TODO untuk Production:**
- Implementasi authentication
- Role-based access control (RBAC)
- Protected routes
- API integration
- Session management
- Input sanitization
- CSRF protection

## 📱 Responsive Design

Semua halaman responsive untuk:
- Desktop (lg: > 1024px)
- Tablet (md: 768px - 1024px)
- Mobile (< 768px)

Grid breakpoints:
- 1 column untuk mobile
- 2-3 columns untuk tablet
- 3-4 columns untuk desktop

## 🛠️ Tech Stack

- **React** 18+ dengan TypeScript
- **React Router** untuk routing
- **TailwindCSS** untuk styling
- **Custom components** (Button, Input, Card)

## 📝 Usage Examples

### Menambah Product:
1. Buka `/admin/products`
2. Klik "Add Product"
3. Isi form (name, category, price, stock, image)
4. Klik "Create"

### Restock Item:
1. Buka `/admin/stock`
2. Klik "Restock" pada item
3. Input jumlah restock
4. Klik "Confirm Restock"

### Process Order (Cashier):
1. Buka `/admin/cashier`
2. Search & click products untuk add to cart
3. Adjust quantity dengan +/- buttons
4. Input customer name (optional)
5. Pilih payment method
6. Klik "Complete Order"

### View Reports:
1. Buka `/admin/reports`
2. Pilih report type
3. Pilih date range
4. Klik "Generate Report"
5. Export ke PDF/Excel jika perlu

## 🚧 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced charts (Chart.js/Recharts)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Print receipts
- [ ] Barcode scanner integration
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Inventory forecasting
- [ ] Customer loyalty program
- [ ] Staff scheduling
- [ ] Table management

## 📞 Support

Untuk bantuan atau pertanyaan, hubungi tim development.

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Status**: Development
