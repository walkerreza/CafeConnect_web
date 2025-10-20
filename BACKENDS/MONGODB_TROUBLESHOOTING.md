# 🔧 MongoDB Troubleshooting - Service Cannot Start

## ❌ Error: "Service MongoDB can not start"

### Penyebab Umum:

1. **Port 27017 sudah digunakan**
2. **Data directory tidak ada atau corrupt**
3. **Permission issues**
4. **MongoDB sudah running di background**
5. **Config file error**

## 🛠️ Solusi Step-by-Step

### Solusi 1: Check Port 27017

```bash
# Cek apakah port 27017 sudah digunakan
netstat -ano | findstr :27017

# Jika ada process, kill process tersebut
# Catat PID (angka di kolom terakhir)
taskkill /PID [PID_NUMBER] /F
```

### Solusi 2: Stop MongoDB yang Running

```bash
# Stop MongoDB service
net stop MongoDB

# Atau kill semua process mongod
taskkill /IM mongod.exe /F
```

### Solusi 3: Buat/Repair Data Directory

```bash
# Buat folder data jika belum ada
mkdir C:\data\db

# Atau gunakan custom path
mkdir C:\laragon\data\mongodb
```

### Solusi 4: Start MongoDB Manual (Recommended untuk Development)

**Cara 1: Tanpa Service**

```bash
# Buka Command Prompt sebagai Administrator
# Navigate ke MongoDB bin folder
cd C:\Program Files\MongoDB\Server\7.0\bin

# Start MongoDB dengan custom data path
mongod --dbpath="C:\data\db"

# Atau dengan Laragon path
mongod --dbpath="C:\laragon\data\mongodb"
```

**Cara 2: Dengan Config File**

Buat file `mongod.cfg`:

```yaml
# mongod.cfg
systemLog:
  destination: file
  path: C:\laragon\data\mongodb\mongod.log
  logAppend: true
storage:
  dbPath: C:\laragon\data\mongodb
net:
  port: 27017
  bindIp: 127.0.0.1
```

Jalankan dengan config:
```bash
mongod --config="C:\path\to\mongod.cfg"
```

### Solusi 5: Reinstall MongoDB Service

```bash
# Hapus service lama
sc delete MongoDB

# Install service baru
mongod --config="C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg" --install

# Start service
net start MongoDB
```

### Solusi 6: Gunakan MongoDB Portable (Easiest)

1. Download MongoDB Community Edition (ZIP)
2. Extract ke folder (misal: `C:\mongodb`)
3. Buat folder data: `C:\mongodb\data`
4. Jalankan:
   ```bash
   cd C:\mongodb\bin
   mongod --dbpath="C:\mongodb\data"
   ```

## 🚀 Alternatif: Gunakan MongoDB Atlas (Cloud)

Jika MongoDB local bermasalah, gunakan MongoDB Atlas (gratis):

### Setup MongoDB Atlas:

1. **Buat Account** di https://www.mongodb.com/cloud/atlas
2. **Create Cluster** (pilih Free tier)
3. **Create Database User:**
   - Username: `cafeconnect`
   - Password: `[your-password]`
4. **Whitelist IP:** 
   - Add `0.0.0.0/0` (allow from anywhere) untuk development
5. **Get Connection String:**
   ```
   mongodb+srv://cafeconnect:<password>@cluster0.xxxxx.mongodb.net/cafeconnect
   ```

### Update .env:

```env
# Ganti dengan MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://cafeconnect:yourpassword@cluster0.xxxxx.mongodb.net/cafeconnect
```

### Koneksi di Navicat:

```
Connection Type: SRV
Host: cluster0.xxxxx.mongodb.net
Authentication: Password
Username: cafeconnect
Password: yourpassword
Authentication Database: admin
```

## ✅ Cara Tercepat untuk Development

### Opsi A: MongoDB di Laragon (Recommended)

1. **Buka Laragon**
2. **Menu** > **MongoDB** > **Install**
3. Tunggu instalasi selesai
4. **Start** MongoDB dari Laragon
5. MongoDB akan jalan di `localhost:27017`

### Opsi B: MongoDB Manual Start

```bash
# 1. Buat folder data
mkdir C:\mongodb-data

# 2. Start MongoDB (biarkan terminal tetap terbuka)
mongod --dbpath="C:\mongodb-data"

# 3. Di terminal baru, test koneksi
mongosh
```

### Opsi C: Docker (Jika punya Docker)

```bash
# Pull MongoDB image
docker pull mongo

# Run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo

# MongoDB siap di localhost:27017
```

## 🧪 Test Koneksi

### Test 1: Menggunakan mongosh

```bash
# Connect ke MongoDB
mongosh

# Jika berhasil, akan muncul prompt:
# test>

# Test commands:
show dbs
use cafeconnect
db.cafes.insertOne({name: "Test Cafe"})
db.cafes.find()
```

### Test 2: Menggunakan Navicat

1. Buka Navicat
2. Connection > MongoDB
3. Host: `localhost`, Port: `27017`
4. Test Connection
5. Jika berhasil: ✅ "Connection Successful"

### Test 3: Menggunakan Node.js

```javascript
// test-connection.js
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/cafeconnect')
  .then(() => {
    console.log('✅ MongoDB Connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Connection Error:', err);
    process.exit(1);
  });
```

Jalankan:
```bash
node test-connection.js
```

## 📋 Checklist Troubleshooting

- [ ] MongoDB service stopped
- [ ] Port 27017 tidak digunakan process lain
- [ ] Data directory exists dan punya permission
- [ ] MongoDB binary bisa dijalankan manual
- [ ] Firewall tidak block port 27017
- [ ] Antivirus tidak block mongod.exe

## 🔍 Check MongoDB Logs

Lokasi log file (default):
```
C:\Program Files\MongoDB\Server\7.0\log\mongod.log
```

Atau jika pakai Laragon:
```
C:\laragon\data\mongodb\mongod.log
```

Buka file log untuk lihat error detail.

## 💡 Rekomendasi Saya

Untuk development, **gunakan salah satu cara ini:**

### 1️⃣ MongoDB Atlas (Tercepat, No Setup)
- Gratis
- Tidak perlu install
- Bisa akses dari mana saja
- Sudah include backup

### 2️⃣ MongoDB Manual Start (Paling Reliable)
```bash
# Terminal 1: Start MongoDB
mongod --dbpath="C:\mongodb-data"

# Terminal 2: Start Backend
npm run dev:server

# Terminal 3: Start Frontend
npm run dev
```

### 3️⃣ Docker (Jika familiar dengan Docker)
```bash
docker-compose up -d
```

## 📞 Jika Masih Error

Kirim informasi berikut:
1. Screenshot error lengkap
2. Isi file `mongod.log`
3. Output dari: `mongod --version`
4. OS version: `winver`

---

**Quick Fix untuk Mulai Coding:**

Gunakan MongoDB Atlas, update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafeconnect
```

Lalu jalankan:
```bash
npm run dev:server
```

Done! ✅
