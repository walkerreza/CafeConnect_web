# 🧪 Testing CRUD Operations - CafeConnect API

Panduan lengkap untuk testing operasi CRUD MongoDB.

## 🚀 Prerequisites

1. MongoDB running di `localhost:27017`
2. Backend server running: `npm run dev:server`
3. File `.env` sudah dikonfigurasi

---

## 📝 1. CREATE - Membuat Data Baru

### Test dengan cURL

```bash
# Create cafe baru
curl -X POST http://localhost:5000/api/cafes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kopi Kenangan",
    "location": "Jakarta Selatan",
    "address": "Jl. Sudirman No. 123",
    "rating": 4.5,
    "isOpen": true,
    "openingHours": "08:00 - 22:00",
    "phone": "021-12345678",
    "description": "Cafe modern dengan kopi berkualitas",
    "facilities": ["WiFi", "Parking", "AC"]
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Cafe berhasil dibuat",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Kopi Kenangan",
    "location": "Jakarta Selatan",
    "rating": 4.5,
    "isOpen": true,
    "createdAt": "2025-10-19T16:00:00.000Z",
    "updatedAt": "2025-10-19T16:00:00.000Z"
  }
}
```

### Test dengan Postman

1. **Method:** POST
2. **URL:** `http://localhost:5000/api/cafes`
3. **Headers:** 
   - `Content-Type: application/json`
4. **Body (raw JSON):**
```json
{
  "name": "Starbucks",
  "location": "Jakarta Pusat",
  "rating": 4.7,
  "isOpen": true
}
```

### Test dengan JavaScript (Axios)

```javascript
import axios from 'axios';

const createCafe = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/cafes', {
      name: 'Janji Jiwa',
      location: 'Jakarta Barat',
      rating: 4.3,
      isOpen: true
    });
    
    console.log('✅ Cafe created:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response.data);
  }
};

createCafe();
```

---

## 📖 2. READ - Membaca Data

### A. Get All Cafes

```bash
# Get semua cafes
curl http://localhost:5000/api/cafes
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Kopi Kenangan",
      "location": "Jakarta Selatan",
      "rating": 4.5
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Starbucks",
      "location": "Jakarta Pusat",
      "rating": 4.7
    }
  ],
  "count": 2
}
```

### B. Get Cafe by ID

```bash
# Get cafe by ID (ganti dengan ID yang valid)
curl http://localhost:5000/api/cafes/507f1f77bcf86cd799439011
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Kopi Kenangan",
    "location": "Jakarta Selatan",
    "rating": 4.5,
    "isOpen": true,
    "facilities": ["WiFi", "Parking"]
  }
}
```

### Test dengan Postman

1. **Method:** GET
2. **URL:** `http://localhost:5000/api/cafes`
3. Klik **Send**

### Test dengan Browser

Buka browser dan akses:
```
http://localhost:5000/api/cafes
http://localhost:5000/api/cafes/[CAFE_ID]
```

---

## ✏️ 3. UPDATE - Mengubah Data

### A. Full Update (PUT)

```bash
# Update seluruh data cafe
curl -X PUT http://localhost:5000/api/cafes/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kopi Kenangan Updated",
    "location": "Jakarta Selatan",
    "rating": 4.8,
    "isOpen": true,
    "phone": "021-99999999"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Cafe berhasil diupdate",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Kopi Kenangan Updated",
    "rating": 4.8,
    "updatedAt": "2025-10-19T17:00:00.000Z"
  }
}
```

### B. Partial Update (PATCH)

```bash
# Update hanya field tertentu
curl -X PATCH http://localhost:5000/api/cafes/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4.9,
    "isOpen": false
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Cafe berhasil diupdate",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Kopi Kenangan Updated",
    "rating": 4.9,
    "isOpen": false
  }
}
```

### Test dengan Postman

1. **Method:** PUT atau PATCH
2. **URL:** `http://localhost:5000/api/cafes/[CAFE_ID]`
3. **Headers:** `Content-Type: application/json`
4. **Body:**
```json
{
  "rating": 5.0
}
```

---

## 🗑️ 4. DELETE - Menghapus Data

### Delete Single Cafe

```bash
# Delete cafe by ID
curl -X DELETE http://localhost:5000/api/cafes/507f1f77bcf86cd799439011
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Cafe berhasil dihapus",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Kopi Kenangan",
    "location": "Jakarta Selatan"
  }
}
```

### Test dengan Postman

1. **Method:** DELETE
2. **URL:** `http://localhost:5000/api/cafes/[CAFE_ID]`
3. Klik **Send**

---

## 🧪 Complete Test Flow

### Test Script (Node.js)

Buat file `test-api.js`:

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cafes';

async function testCRUD() {
  try {
    console.log('🧪 Starting CRUD Tests...\n');
    
    // 1. CREATE
    console.log('📝 Test 1: CREATE');
    const createResponse = await axios.post(API_URL, {
      name: 'Test Cafe',
      location: 'Jakarta',
      rating: 4.5,
      isOpen: true
    });
    console.log('✅ Created:', createResponse.data);
    const cafeId = createResponse.data.data._id;
    console.log('Cafe ID:', cafeId, '\n');
    
    // 2. READ ALL
    console.log('📖 Test 2: READ ALL');
    const readAllResponse = await axios.get(API_URL);
    console.log('✅ Found', readAllResponse.data.count, 'cafes\n');
    
    // 3. READ ONE
    console.log('📖 Test 3: READ ONE');
    const readOneResponse = await axios.get(`${API_URL}/${cafeId}`);
    console.log('✅ Read:', readOneResponse.data.data.name, '\n');
    
    // 4. UPDATE
    console.log('✏️  Test 4: UPDATE');
    const updateResponse = await axios.patch(`${API_URL}/${cafeId}`, {
      rating: 4.9
    });
    console.log('✅ Updated rating:', updateResponse.data.data.rating, '\n');
    
    // 5. DELETE
    console.log('🗑️  Test 5: DELETE');
    const deleteResponse = await axios.delete(`${API_URL}/${cafeId}`);
    console.log('✅ Deleted:', deleteResponse.data.message, '\n');
    
    console.log('✅ All tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testCRUD();
```

Jalankan:
```bash
node test-api.js
```

---

## 🎯 Testing dengan Navicat

### 1. CREATE

1. Buka collection `cafes`
2. Klik **Add Record** (ikon +)
3. Masukkan data:
```json
{
  "name": "Navicat Test Cafe",
  "location": "Jakarta",
  "rating": 4.5,
  "isOpen": true
}
```
4. Klik **Save**

### 2. READ

1. Buka collection `cafes`
2. Lihat semua data di grid view
3. Atau gunakan **Query** tab:
```javascript
// All cafes
{}

// Cafes with rating > 4
{ "rating": { "$gt": 4 } }
```

### 3. UPDATE

1. Double-click pada record yang ingin diubah
2. Edit field yang diinginkan
3. Tekan **Ctrl+S** atau klik **Save**

### 4. DELETE

1. Klik kanan pada record
2. Pilih **Delete Record**
3. Konfirmasi

---

## 📊 Test Cases

### Test Case 1: Create Cafe dengan Data Valid

**Input:**
```json
{
  "name": "Kopi Kenangan",
  "location": "Jakarta Selatan",
  "rating": 4.5
}
```

**Expected:** Status 201, cafe berhasil dibuat

### Test Case 2: Create Cafe tanpa Required Field

**Input:**
```json
{
  "location": "Jakarta"
}
```

**Expected:** Status 400, error validation

### Test Case 3: Get Cafe dengan ID Invalid

**Input:** `GET /api/cafes/invalid-id`

**Expected:** Status 500, error message

### Test Case 4: Update Cafe yang Tidak Ada

**Input:** `PUT /api/cafes/507f1f77bcf86cd799439999`

**Expected:** Status 404, cafe tidak ditemukan

### Test Case 5: Delete Cafe yang Sudah Dihapus

**Input:** `DELETE /api/cafes/[deleted-id]`

**Expected:** Status 404, cafe tidak ditemukan

---

## 🔍 Debugging Tips

### 1. Check MongoDB Connection

```bash
# Di terminal MongoDB
mongosh
show dbs
use cafeconnect
db.cafes.find()
```

### 2. Check Backend Logs

Lihat terminal yang menjalankan `npm run dev:server` untuk error logs.

### 3. Validate JSON

Gunakan https://jsonlint.com untuk validasi JSON sebelum send request.

### 4. Check Response Status

- **200** - OK (GET, PUT, PATCH, DELETE success)
- **201** - Created (POST success)
- **400** - Bad Request (validation error)
- **404** - Not Found (resource tidak ada)
- **500** - Internal Server Error (server error)

---

## 📚 Postman Collection

Import collection ini ke Postman:

```json
{
  "info": {
    "name": "CafeConnect API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Cafes",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/cafes"
      }
    },
    {
      "name": "Get Cafe by ID",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/cafes/{{cafeId}}"
      }
    },
    {
      "name": "Create Cafe",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/cafes",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test Cafe\",\n  \"location\": \"Jakarta\",\n  \"rating\": 4.5\n}"
        }
      }
    },
    {
      "name": "Update Cafe",
      "request": {
        "method": "PUT",
        "url": "http://localhost:5000/api/cafes/{{cafeId}}",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"rating\": 4.9\n}"
        }
      }
    },
    {
      "name": "Delete Cafe",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:5000/api/cafes/{{cafeId}}"
      }
    }
  ]
}
```

---

## ✅ Checklist Testing

- [ ] MongoDB running
- [ ] Backend server running
- [ ] File `.env` configured
- [ ] CREATE: Cafe baru berhasil dibuat
- [ ] READ: Bisa get all cafes
- [ ] READ: Bisa get cafe by ID
- [ ] UPDATE: Bisa update cafe
- [ ] DELETE: Bisa delete cafe
- [ ] Error handling works (404, 400, 500)
- [ ] Validation works
- [ ] Data persists di MongoDB

---

## 🎉 Success Criteria

Jika semua test berhasil, Anda akan melihat:
- ✅ Data tersimpan di MongoDB
- ✅ Data bisa dilihat di Navicat
- ✅ API response sesuai expected
- ✅ Error handling berfungsi
- ✅ Validation berfungsi

Selamat! CRUD operations Anda sudah berfungsi dengan baik! 🚀
