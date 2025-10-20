# ☕ CafeConnect - Coffee Shop Management System

Modern web application untuk manajemen cafe dengan fitur lengkap: menu management, kasir/POS, monitoring pembayaran, stock management, dan reporting.

![Tech Stack](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0.3-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-cyan)

## 🚀 Features

### 🌐 Public Pages
- **Landing Page** - Modern glassmorphism design
- **Menu List** - Browse coffee menu dengan filter & search
- **Menu Detail** - Detail produk dengan quantity selector
- **Login/Register** - Split-screen authentication

### 🎛️ Admin Panel
- **Dashboard** - Overview statistik & quick actions
- **Payment Monitoring** - Track semua transaksi
- **User Management** - CRUD users dengan role management
- **Product Management** - Full CRUD untuk menu items
- **Stock Management** - Monitor & restock inventory
- **Cashier/POS** - Point of sale system
- **Reports & Analytics** - Comprehensive reporting

## 📁 Project Structure

```
CafeConnect_web/
├── src/
│   ├── components/
│   │   ├── atoms/          # Button, Input, Card
│   │   ├── molecules/      # SearchBar, CafeCard
│   │   └── organisms/      # Header, Footer, CafeList
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── CafesPage.tsx
│   │   ├── CafeDetailPage.tsx
│   │   ├── auth/           # Login, Register
│   │   └── admin/          # Admin pages
│   ├── services/           # API services
│   └── App.tsx
├── server/
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── scripts/            # DB sync & seed scripts
│   └── index.js            # Express server
└── public/
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Router** - Routing
- **TailwindCSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local atau Atlas)
- npm atau yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd CafeConnect_web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
# Copy .env.example ke .env
cp .env.example .env

# Edit .env dengan konfigurasi Anda
```

### 4. Setup Database
```bash
# Sync models ke MongoDB
npm run db:sync

# Seed dummy data (optional)
npm run db:seed
```

### 5. Run Development
```bash
# Run frontend & backend bersamaan
npm run dev:all

# Atau run terpisah:
npm run dev          # Frontend only (port 5173)
npm run dev:server   # Backend only (port 5000)
```

## 🚀 Available Scripts

```bash
# Development
npm run dev              # Run Vite dev server
npm run dev:server       # Run Express server dengan nodemon
npm run dev:all          # Run frontend & backend bersamaan

# Database
npm run db:sync          # Sync models & indexes
npm run db:seed          # Seed dummy data
npm run db:reset         # Reset & seed database

# Production
npm run build            # Build untuk production
npm run preview          # Preview production build
npm run server           # Run production server

# Code Quality
npm run lint             # Run ESLint
```

## 🗄️ Database Setup

### Local MongoDB
```bash
# Install MongoDB
# Windows: Download dari mongodb.com
# Mac: brew install mongodb-community
# Linux: apt-get install mongodb

# Start MongoDB
mongod

# Verify
mongo
```

### MongoDB Atlas (Cloud)
1. Daftar di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Buat cluster gratis
3. Whitelist IP address
4. Copy connection string ke `.env`

### Sync & Seed
```bash
# Sync models
npm run db:sync

# Output:
# ✅ Connected to MongoDB
# ✅ Cafe indexes synced
# ✅ Menu indexes synced
# ✅ User indexes synced
# ✅ Order indexes synced

# Seed data
npm run db:seed

# Output:
# ✅ 6 menus created
# ✅ 3 users created
```

## 📚 Documentation

- [Admin Panel Guide](./ADMIN_PANEL.md) - Dokumentasi lengkap admin panel
- [Database Setup](./DATABASE_SETUP.md) - Setup & sync MongoDB
- [API Documentation](./BACKENDS/TEST_CRUD.md) - API endpoints

## 🎨 Design System

### Colors
- **Primary**: Amber/Orange (coffee theme)
- **Success**: Green
- **Info**: Blue
- **Warning**: Yellow
- **Danger**: Red

### Components
- Glassmorphism effects
- Gradient cards
- Hover animations
- Responsive design
- Modal dialogs

## 🔐 Security

**TODO untuk Production:**
- [ ] Implement JWT authentication
- [ ] Hash passwords dengan bcrypt
- [ ] Add CORS configuration
- [ ] Input validation & sanitization
- [ ] Rate limiting
- [ ] HTTPS/SSL
- [ ] Environment variables protection

## 📱 Responsive Design

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚧 Roadmap

- [ ] Authentication & Authorization
- [ ] Real-time notifications
- [ ] Advanced charts (Chart.js)
- [ ] Export reports (PDF/Excel)
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React Team
- MongoDB Team
- TailwindCSS Team
- Unsplash for images

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Status**: Development

Made with ☕ and ❤️
