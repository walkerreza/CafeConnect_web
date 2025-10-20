# 🚀 Quick Start Guide - CafeConnect

Panduan cepat untuk menjalankan project CafeConnect dalam 5 menit!

## ⚡ Super Quick Start (TL;DR)

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env

# 3. Seed database
npm run db:seed

# 4. Run everything
npm run dev:all
```

Buka browser:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Admin Panel: `http://localhost:5173/admin`

---

## 📝 Step-by-Step Guide

### 1️⃣ Prerequisites Check

Pastikan sudah terinstall:
- ✅ Node.js 18+ → `node --version`
- ✅ npm → `npm --version`
- ✅ MongoDB → `mongod --version`

**Belum punya MongoDB?**
```bash
# Windows: Download dari https://www.mongodb.com/try/download/community
# Atau gunakan MongoDB Atlas (cloud) - gratis!
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

**Tunggu beberapa menit** untuk download semua packages.

---

### 3️⃣ Setup Environment

```bash
# Copy file .env.example
cp .env.example .env

# Atau manual: buat file .env dengan isi:
```

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cafeconnect
JWT_SECRET=your-secret-key-here
```

**Gunakan MongoDB Atlas?**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafeconnect
```

---

### 4️⃣ Start MongoDB

**Local MongoDB:**
```bash
# Windows - biasanya otomatis running sebagai service
# Cek dengan:
mongo

# Atau start manual:
mongod
```

**MongoDB Atlas:**
- Sudah otomatis running ✅
- Pastikan IP address di-whitelist

---

### 5️⃣ Setup Database

```bash
# Sync models & indexes
npm run db:sync
```

Output:
```
✅ Connected to MongoDB
✅ Cafe indexes synced
✅ Menu indexes synced
✅ User indexes synced
✅ Order indexes synced
```

```bash
# Seed dummy data (6 menus + 3 users)
npm run db:seed
```

Output:
```
✅ 6 menus created
✅ 3 users created
```

---

### 6️⃣ Run Application

**Option A: Run Everything (Recommended)**
```bash
npm run dev:all
```

**Option B: Run Separately**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:server
```

---

### 7️⃣ Access Application

#### 🌐 **Public Pages:**
- **Home**: http://localhost:5173/
- **Menu List**: http://localhost:5173/cafes
- **Login**: http://localhost:5173/login
- **Register**: http://localhost:5173/register

#### 🎛️ **Admin Panel:**
- **Dashboard**: http://localhost:5173/admin
- **Payments**: http://localhost:5173/admin/payments
- **Users**: http://localhost:5173/admin/users
- **Products**: http://localhost:5173/admin/products
- **Stock**: http://localhost:5173/admin/stock
- **Cashier**: http://localhost:5173/admin/cashier
- **Reports**: http://localhost:5173/admin/reports

#### 🔌 **API Endpoints:**
- **Base URL**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health
- **Menus**: http://localhost:5000/api/menus
- **Users**: http://localhost:5000/api/users

---

## 🎯 Test Features

### Test Menu List
1. Buka http://localhost:5173/cafes
2. Lihat 6 menu items
3. Search "Luwak"
4. Filter by category

### Test Menu Detail
1. Click salah satu menu
2. Lihat detail lengkap
3. Adjust quantity
4. Click "Add to Cart"

### Test Admin Panel
1. Buka http://localhost:5173/admin
2. Explore dashboard
3. Try quick actions

### Test Product CRUD
1. Buka http://localhost:5173/admin/products
2. Click "Add Product"
3. Fill form & submit
4. Edit product
5. Delete product

### Test Cashier/POS
1. Buka http://localhost:5173/admin/cashier
2. Click products untuk add to cart
3. Adjust quantity
4. Select payment method
5. Click "Complete Order"

---

## 🐛 Troubleshooting

### ❌ MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
```bash
# Start MongoDB
mongod

# Atau check service:
# Windows: services.msc → MongoDB Server
```

---

### ❌ Port Already in Use
```
Error: Port 5173 is already in use
```

**Solution:**
```bash
# Kill process on port
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Atau ubah port di vite.config.ts
```

---

### ❌ Module Not Found
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Re-install dependencies
rm -rf node_modules package-lock.json
npm install
```

---

### ❌ Database Empty
```
No menus found
```

**Solution:**
```bash
# Seed data lagi
npm run db:seed
```

---

## 📊 Default Data

### Menus (6 items):
- Arabic Coffee - Rp 35.000
- Luwak Coffee - Rp 75.000 (Premium)
- Milk Coffee - Rp 28.000
- Cappuccino Latte - Rp 32.000
- Espresso - Rp 25.000
- Americano - Rp 27.000

### Users (3 users):
- **Admin**: admin@cafeconnect.com / admin123
- **Customer 1**: john@example.com / user123
- **Customer 2**: jane@example.com / user123

---

## 🎨 Development Tips

### Hot Reload
- Frontend: Auto reload saat edit `.tsx` files
- Backend: Auto restart saat edit `.js` files (nodemon)

### View Logs
```bash
# Frontend logs di browser console
# Backend logs di terminal
```

### MongoDB GUI
Download **MongoDB Compass** untuk GUI:
- https://www.mongodb.com/products/compass
- Connect: `mongodb://localhost:27017`

### API Testing
Gunakan **Postman** atau **Thunder Client**:
```
GET http://localhost:5000/api/menus
POST http://localhost:5000/api/menus
PUT http://localhost:5000/api/menus/:id
DELETE http://localhost:5000/api/menus/:id
```

---

## 📚 Next Steps

1. ✅ Explore semua pages
2. ✅ Test CRUD operations
3. ✅ Try admin features
4. ✅ Check API endpoints
5. ✅ Read full documentation:
   - [README.md](./README.md)
   - [ADMIN_PANEL.md](./ADMIN_PANEL.md)
   - [DATABASE_SETUP.md](./DATABASE_SETUP.md)

---

## 🆘 Need Help?

- 📖 Check [README.md](./README.md)
- 🗄️ Database issues? [DATABASE_SETUP.md](./DATABASE_SETUP.md)
- 🎛️ Admin panel? [ADMIN_PANEL.md](./ADMIN_PANEL.md)
- 🐛 Found a bug? Create an issue

---

## ✅ Success Checklist

- [ ] Dependencies installed
- [ ] MongoDB running
- [ ] Database seeded
- [ ] Frontend running (port 5173)
- [ ] Backend running (port 5000)
- [ ] Can access homepage
- [ ] Can access admin panel
- [ ] Can view menus
- [ ] Can test CRUD

**All checked?** 🎉 You're ready to develop!

---

Made with ☕ and ❤️
