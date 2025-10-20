# 🗄️ Database Setup Guide - MongoDB

## Cara Memperbarui/Sync Model ke MongoDB

### 📋 **Metode 1: Automatic (Recommended)**

Mongoose akan **otomatis** membuat collection saat pertama kali Anda menyimpan data. Tidak perlu manual create table seperti SQL.

```javascript
// Saat server berjalan, collection otomatis dibuat
const newMenu = new Menu({
  name: 'Cappuccino',
  price: 32000,
  category: 'coffee'
});

await newMenu.save(); // Collection 'menus' otomatis dibuat
```

---

### 📋 **Metode 2: Sync Indexes (Manual)**

Gunakan script untuk sync indexes dan update schema:

```bash
# Jalankan script sync
node server/scripts/syncModels.js
```

**Script ini akan:**
- ✅ Connect ke MongoDB
- ✅ Sync semua indexes
- ✅ Tampilkan existing collections
- ✅ Tampilkan jumlah documents

---

### 📋 **Metode 3: Seed Data (Populate Database)**

Untuk mengisi database dengan dummy data:

```bash
# Jalankan script seed
node server/scripts/seedData.js
```

**Script ini akan:**
- ✅ Clear existing data (optional)
- ✅ Insert dummy menu data (6 items)
- ✅ Insert dummy user data (3 users)
- ✅ Tampilkan summary

---

## 🚀 **Step-by-Step Setup**

### **1. Install MongoDB**

**Windows:**
```bash
# Download dari: https://www.mongodb.com/try/download/community
# Install dan jalankan sebagai service
```

**Atau gunakan MongoDB Atlas (Cloud):**
- Daftar di: https://www.mongodb.com/cloud/atlas
- Buat cluster gratis
- Dapatkan connection string

### **2. Setup Environment Variables**

Buat file `.env` di root project:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/cafeconnect

# Atau gunakan MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafeconnect

# Server Port
PORT=5000

# JWT Secret (untuk authentication)
JWT_SECRET=your_secret_key_here
```

### **3. Install Dependencies**

```bash
npm install mongoose dotenv
```

### **4. Jalankan MongoDB**

**Local:**
```bash
# Windows - MongoDB biasanya otomatis running sebagai service
# Atau jalankan manual:
mongod

# Check status:
mongo
```

**Cloud (Atlas):**
- Sudah otomatis running
- Pastikan IP address Anda di-whitelist

### **5. Sync Models**

```bash
# Sync indexes
node server/scripts/syncModels.js
```

Output:
```
🔄 Connecting to MongoDB...
✅ Connected to MongoDB

📋 Existing collections: [ 'menus', 'users', 'orders' ]

🔄 Syncing indexes...
✅ Cafe indexes synced
✅ Menu indexes synced
✅ User indexes synced
✅ Order indexes synced

📊 Collection Stats:
   Cafes: 0 documents
   Menus: 0 documents
   Users: 0 documents
   Orders: 0 documents

✅ All models synced successfully!
```

### **6. Seed Data (Optional)**

```bash
# Insert dummy data
node server/scripts/seedData.js
```

Output:
```
🔄 Connecting to MongoDB...
✅ Connected to MongoDB

🗑️  Clearing existing data...
✅ Data cleared

📝 Seeding Menu data...
✅ 6 menus created

📝 Seeding User data...
✅ 3 users created

📊 Seed Summary:
   Menus: 6
   Users: 3

✅ Seeding completed successfully!
```

---

## 📊 **Models yang Tersedia**

### **1. Menu Model** (`Menu.js`)
```javascript
{
  name: String,           // Required
  category: String,       // coffee, non-coffee, food, snack, dessert
  description: String,    // Required
  price: Number,          // Required
  image: String,
  isAvailable: Boolean,
  rating: Number,         // 0-5
  ingredients: [String],
  allergens: [String],
  isPopular: Boolean,
  isPremium: Boolean,
  calories: Number,
  preparationTime: Number
}
```

### **2. User Model** (`User.js`)
```javascript
{
  name: String,           // Required
  email: String,          // Required, unique
  password: String,       // Required (hash dengan bcrypt)
  phone: String,
  role: String,           // customer, staff, admin
  isActive: Boolean,
  address: String,
  avatar: String,
  lastLogin: Date
}
```

### **3. Cafe Model** (`Cafe.js`)
```javascript
{
  name: String,           // Required
  location: String,       // Required
  address: String,
  rating: Number,         // 0-5
  isOpen: Boolean,
  openingHours: String,
  phone: String,
  description: String,
  facilities: [String],
  image: String
}
```

### **4. Order Model** (`Order.js`)
```javascript
{
  orderNumber: String,    // Auto-generated
  user: ObjectId,         // Ref to User
  items: [{
    menu: ObjectId,       // Ref to Menu
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String,         // pending, processing, completed, cancelled
  paymentMethod: String,  // cash, credit_card, debit_card, e_wallet
  paymentStatus: String,  // pending, paid, failed
  notes: String
}
```

---

## 🔧 **Update Schema (Jika Ada Perubahan)**

### **Cara 1: Mongoose Automatic**
Mongoose otomatis handle perubahan schema. Tidak perlu migration seperti SQL.

### **Cara 2: Manual Update**

Jika perlu update field tertentu:

```javascript
// Update semua documents
await Menu.updateMany(
  {},  // Filter (kosong = semua)
  { $set: { newField: 'default value' } }
);

// Atau drop & recreate
await Menu.collection.drop();
await Menu.syncIndexes();
```

### **Cara 3: Add New Field**

Edit model file, lalu sync:

```javascript
// Di Menu.js, tambah field baru:
newField: {
  type: String,
  default: 'default value'
}

// Jalankan sync
node server/scripts/syncModels.js
```

---

## 🛠️ **MongoDB Commands (Useful)**

### **Via MongoDB Shell:**

```bash
# Masuk ke MongoDB shell
mongo

# Atau dengan mongosh (MongoDB 5+)
mongosh

# Pilih database
use cafeconnect

# Lihat collections
show collections

# Lihat data
db.menus.find().pretty()
db.users.find().pretty()

# Count documents
db.menus.countDocuments()

# Drop collection
db.menus.drop()

# Drop database
db.dropDatabase()
```

### **Via Node.js:**

```javascript
// Count
const count = await Menu.countDocuments();

// Find all
const menus = await Menu.find();

// Find one
const menu = await Menu.findById(id);

// Create
const newMenu = await Menu.create({ name: 'Coffee', price: 30000 });

// Update
await Menu.findByIdAndUpdate(id, { price: 35000 });

// Delete
await Menu.findByIdAndDelete(id);
```

---

## 📝 **Package.json Scripts**

Tambahkan di `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon server/index.js",
    "start": "node server/index.js",
    "sync": "node server/scripts/syncModels.js",
    "seed": "node server/scripts/seedData.js",
    "db:reset": "node server/scripts/seedData.js"
  }
}
```

Jalankan dengan:
```bash
npm run sync   # Sync models
npm run seed   # Seed data
npm run db:reset  # Reset & seed
```

---

## ⚠️ **Troubleshooting**

### **Error: Connection refused**
```bash
# Pastikan MongoDB running
mongod

# Check port
netstat -an | findstr 27017
```

### **Error: Authentication failed**
```bash
# Pastikan username/password benar di connection string
mongodb://username:password@localhost:27017/cafeconnect
```

### **Error: Collection not found**
```bash
# Jalankan sync atau seed
npm run sync
npm run seed
```

### **Error: Duplicate key**
```bash
# Ada data duplicate di unique field (email, dll)
# Drop collection atau hapus data duplicate
db.users.deleteMany({ email: 'duplicate@email.com' })
```

---

## 🔐 **Security Best Practices**

1. **Jangan commit `.env`** ke git
2. **Hash password** dengan bcrypt
3. **Validate input** sebelum save
4. **Use indexes** untuk query performance
5. **Limit query results** (pagination)
6. **Sanitize user input** (prevent injection)

---

## 📚 **Resources**

- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (GUI Tool)

---

**Version**: 1.0.0  
**Last Updated**: January 2025
