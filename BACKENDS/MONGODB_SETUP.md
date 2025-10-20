# 🗄️ Setup MongoDB dengan Navicat

Panduan lengkap untuk menghubungkan MongoDB dengan Navicat dan integrasi dengan Express.js.

## 📋 Prerequisites

1. **MongoDB** terinstall di komputer Anda
2. **Navicat Premium** atau **Navicat for MongoDB**
3. **Node.js** dan **npm** terinstall

## 🚀 Langkah 1: Install & Setup MongoDB

### Windows (dengan Laragon)

Jika Anda menggunakan Laragon:

1. Buka Laragon
2. Klik kanan pada Laragon tray icon
3. Pilih **MongoDB** > **Install**
4. Tunggu hingga instalasi selesai
5. Start MongoDB dari Laragon

### Manual Installation

1. Download MongoDB dari: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Edition
3. Jalankan MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Atau manual
   mongod --dbpath="C:\data\db"
   ```

## 🔌 Langkah 2: Koneksi MongoDB dengan Navicat

### Membuat Koneksi Baru

1. **Buka Navicat**
2. Klik **Connection** > **MongoDB**
3. Isi detail koneksi:

   ```
   Connection Name: CafeConnect Local
   Host: localhost (atau 127.0.0.1)
   Port: 27017
   Authentication: None (untuk local development)
   ```

4. **Test Connection** untuk memastikan koneksi berhasil
5. Klik **OK** untuk menyimpan

### Jika Menggunakan Authentication

Jika MongoDB Anda memerlukan authentication:

```
Connection Name: CafeConnect Local
Host: localhost
Port: 27017
Authentication: Password
Username: admin
Password: your_password
Authentication Database: admin
```

### Koneksi ke MongoDB Atlas (Cloud)

Jika menggunakan MongoDB Atlas:

1. Dapatkan connection string dari MongoDB Atlas
2. Di Navicat, pilih **MongoDB** connection
3. Gunakan format:
   ```
   Connection Name: CafeConnect Cloud
   Connection Type: SRV
   Host: cluster0.xxxxx.mongodb.net
   Authentication: Password
   Username: your_username
   Password: your_password
   Authentication Database: admin
   ```

## 📊 Langkah 3: Membuat Database & Collections

### Melalui Navicat

1. **Klik kanan** pada connection > **New Database**
2. Nama database: `cafeconnect`
3. Klik **OK**

4. **Buat Collections:**
   - Klik kanan pada database `cafeconnect`
   - Pilih **New Collection**
   - Buat 3 collections:
     - `cafes`
     - `users`
     - `orders`

### Melalui MongoDB Shell

```bash
# Masuk ke MongoDB shell
mongosh

# Buat database
use cafeconnect

# Buat collections dengan validation
db.createCollection("cafes")
db.createCollection("users")
db.createCollection("orders")

# Lihat collections
show collections
```

## 🔧 Langkah 4: Setup Environment Variables

Edit file `.env` di root project:

```env
# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/cafeconnect

# Atau MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafeconnect
```

## 📦 Langkah 5: Install Dependencies

```bash
npm install mongoose
```

## ▶️ Langkah 6: Jalankan Server

```bash
# Install semua dependencies
npm install

# Jalankan backend server
npm run dev:server
```

Output yang diharapkan:
```
✅ MongoDB Connected: localhost
📊 Database: cafeconnect
🚀 Server running on http://localhost:5000
```

## 🧪 Langkah 7: Testing Koneksi

### Test 1: Health Check
```bash
curl http://localhost:5000/health
```

### Test 2: Get All Cafes (akan kosong dulu)
```bash
curl http://localhost:5000/api/cafes
```

Response:
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

### Test 3: Create Cafe
```bash
curl -X POST http://localhost:5000/api/cafes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kopi Kenangan",
    "location": "Jakarta Selatan",
    "address": "Jl. Sudirman No. 123",
    "rating": 4.5,
    "isOpen": true,
    "phone": "021-12345678",
    "description": "Cafe modern dengan kopi berkualitas"
  }'
```

## 📱 Langkah 8: Insert Sample Data via Navicat

### Cara 1: Manual Insert

1. Buka Navicat
2. Expand database `cafeconnect`
3. Klik collection `cafes`
4. Klik **Add Record** (ikon +)
5. Masukkan data dalam format JSON:

```json
{
  "name": "Kopi Kenangan",
  "location": "Jakarta Selatan",
  "address": "Jl. Sudirman No. 123",
  "rating": 4.5,
  "isOpen": true,
  "openingHours": "08:00 - 22:00",
  "phone": "021-12345678",
  "description": "Cafe modern dengan kopi berkualitas",
  "facilities": ["WiFi", "Parking", "AC"],
  "image": ""
}
```

### Cara 2: Import JSON

1. Buat file `sample-cafes.json`:

```json
[
  {
    "name": "Kopi Kenangan",
    "location": "Jakarta Selatan",
    "rating": 4.5,
    "isOpen": true
  },
  {
    "name": "Starbucks",
    "location": "Jakarta Pusat",
    "rating": 4.7,
    "isOpen": true
  },
  {
    "name": "Janji Jiwa",
    "location": "Jakarta Barat",
    "rating": 4.3,
    "isOpen": false
  }
]
```

2. Di Navicat:
   - Klik kanan collection `cafes`
   - Pilih **Import Wizard**
   - Pilih **JSON**
   - Browse file `sample-cafes.json`
   - Klik **Start**

## 🔍 Langkah 9: Query Data di Navicat

### Query Builder

1. Klik collection `cafes`
2. Tab **Query**
3. Contoh queries:

```javascript
// Find all cafes
{}

// Find open cafes
{ "isOpen": true }

// Find by location
{ "location": "Jakarta Selatan" }

// Find with rating > 4
{ "rating": { "$gt": 4 } }

// Search by name (regex)
{ "name": { "$regex": "Kopi", "$options": "i" } }
```

### Aggregation

```javascript
// Count cafes by location
[
  {
    "$group": {
      "_id": "$location",
      "count": { "$sum": 1 }
    }
  }
]

// Average rating
[
  {
    "$group": {
      "_id": null,
      "avgRating": { "$avg": "$rating" }
    }
  }
]
```

## 🛠️ Troubleshooting

### Error: "MongoServerError: Authentication failed"

**Solusi:**
1. Pastikan username dan password benar
2. Cek authentication database (biasanya `admin`)
3. Pastikan user memiliki permission yang cukup

### Error: "connect ECONNREFUSED 127.0.0.1:27017"

**Solusi:**
1. Pastikan MongoDB service berjalan
2. Check dengan: `mongosh` atau `mongo`
3. Restart MongoDB service

### Error: "MongooseServerSelectionError"

**Solusi:**
1. Cek MONGODB_URI di file `.env`
2. Pastikan format connection string benar
3. Test koneksi di Navicat terlebih dahulu

### Navicat tidak bisa connect

**Solusi:**
1. Pastikan MongoDB berjalan di port 27017
2. Check firewall settings
3. Coba gunakan `127.0.0.1` instead of `localhost`
4. Restart Navicat

## 📚 MongoDB Schema Structure

### Cafes Collection
```javascript
{
  _id: ObjectId,
  name: String,
  location: String,
  address: String,
  rating: Number,
  isOpen: Boolean,
  openingHours: String,
  phone: String,
  description: String,
  image: String,
  facilities: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String,
  role: String (enum: customer, admin, owner),
  phone: String,
  avatar: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  cafeId: ObjectId (ref: Cafe),
  userId: ObjectId (ref: User),
  items: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: String (enum),
  paymentMethod: String,
  paymentStatus: String,
  notes: String,
  orderDate: Date,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Best Practices

1. **Selalu gunakan indexes** untuk field yang sering di-query
2. **Validasi data** di level model (Mongoose schema)
3. **Backup database** secara regular
4. **Gunakan environment variables** untuk connection strings
5. **Jangan commit** file `.env` ke git
6. **Monitor performance** dengan Navicat's monitoring tools

## 📖 Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Navicat Documentation](https://www.navicat.com/manual)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 🤝 Support

Jika ada masalah, cek:
1. MongoDB logs
2. Node.js console output
3. Navicat connection test
4. Network/firewall settings
