# 📚 MongoDB CRUD Operations - Panduan Lengkap

Panduan lengkap operasi CRUD (Create, Read, Update, Delete) di MongoDB menggunakan Mongoose dan Navicat.

## 🎯 Apa itu CRUD?

- **C**reate - Membuat data baru
- **R**ead - Membaca/mengambil data
- **U**pdate - Mengubah data yang ada
- **D**elete - Menghapus data

---

## 1️⃣ CREATE - Membuat Data Baru

### A. Menggunakan Mongoose (Node.js)

#### Create Single Document

```javascript
// Import model
import Cafe from '../models/Cafe.js';

// Create satu cafe
const newCafe = new Cafe({
  name: 'Kopi Kenangan',
  location: 'Jakarta Selatan',
  rating: 4.5,
  isOpen: true,
  phone: '021-12345678'
});

await newCafe.save();
```

#### Create dengan .create()

```javascript
const cafe = await Cafe.create({
  name: 'Starbucks',
  location: 'Jakarta Pusat',
  rating: 4.7,
  isOpen: true
});
```

#### Create Multiple Documents

```javascript
const cafes = await Cafe.insertMany([
  { name: 'Kopi Kenangan', location: 'Jakarta Selatan' },
  { name: 'Janji Jiwa', location: 'Jakarta Barat' },
  { name: 'Fore Coffee', location: 'Jakarta Timur' }
]);
```

### B. Menggunakan Navicat

1. Buka collection `cafes`
2. Klik tombol **Add Record** (ikon +)
3. Masukkan data dalam format JSON:

```json
{
  "name": "Kopi Kenangan",
  "location": "Jakarta Selatan",
  "rating": 4.5,
  "isOpen": true,
  "phone": "021-12345678",
  "description": "Cafe modern dengan kopi berkualitas"
}
```

4. Klik **Save**

### C. API Endpoint (Express.js)

```javascript
// POST /api/cafes - Create new cafe
router.post('/cafes', async (req, res) => {
  try {
    const newCafe = await Cafe.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Cafe berhasil dibuat',
      data: newCafe
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});
```

**Test dengan cURL:**
```bash
curl -X POST http://localhost:5000/api/cafes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kopi Kenangan",
    "location": "Jakarta Selatan",
    "rating": 4.5
  }'
```

---

## 2️⃣ READ - Membaca Data

### A. Menggunakan Mongoose

#### Find All (Semua Data)

```javascript
// Get semua cafes
const cafes = await Cafe.find();

// Get semua cafes yang open
const openCafes = await Cafe.find({ isOpen: true });

// Get dengan sorting
const cafes = await Cafe.find().sort({ rating: -1 }); // descending

// Get dengan limit
const cafes = await Cafe.find().limit(10);

// Get dengan select fields tertentu
const cafes = await Cafe.find().select('name location rating');
```

#### Find One (Satu Data)

```javascript
// Find by ID
const cafe = await Cafe.findById('507f1f77bcf86cd799439011');

// Find one dengan kondisi
const cafe = await Cafe.findOne({ name: 'Kopi Kenangan' });

// Find one dengan multiple conditions
const cafe = await Cafe.findOne({ 
  location: 'Jakarta Selatan',
  isOpen: true 
});
```

#### Find dengan Query Operators

```javascript
// Rating lebih dari 4
const cafes = await Cafe.find({ rating: { $gt: 4 } });

// Rating antara 4 dan 5
const cafes = await Cafe.find({ 
  rating: { $gte: 4, $lte: 5 } 
});

// Location contains "Jakarta"
const cafes = await Cafe.find({ 
  location: { $regex: 'Jakarta', $options: 'i' } 
});

// Multiple conditions (AND)
const cafes = await Cafe.find({
  isOpen: true,
  rating: { $gte: 4 }
});

// OR conditions
const cafes = await Cafe.find({
  $or: [
    { location: 'Jakarta Selatan' },
    { location: 'Jakarta Pusat' }
  ]
});
```

#### Pagination

```javascript
const page = 1;
const limit = 10;
const skip = (page - 1) * limit;

const cafes = await Cafe.find()
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });

const total = await Cafe.countDocuments();

res.json({
  success: true,
  data: cafes,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  }
});
```

### B. Menggunakan Navicat

1. Buka collection `cafes`
2. Tab **Query**
3. Masukkan query:

```javascript
// Semua data
{}

// Cafe yang open
{ "isOpen": true }

// Rating > 4
{ "rating": { "$gt": 4 } }

// Search by name
{ "name": { "$regex": "Kopi", "$options": "i" } }
```

4. Klik **Run** atau **F5**

### C. API Endpoints

```javascript
// GET /api/cafes - Get all cafes
router.get('/cafes', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, location } = req.query;
    
    // Build query
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (location) {
      query.location = location;
    }
    
    const cafes = await Cafe.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const total = await Cafe.countDocuments(query);
    
    res.json({
      success: true,
      data: cafes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/cafes/:id - Get cafe by ID
router.get('/cafes/:id', async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    
    if (!cafe) {
      return res.status(404).json({
        success: false,
        error: 'Cafe tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      data: cafe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

**Test dengan cURL:**
```bash
# Get all cafes
curl http://localhost:5000/api/cafes

# Get with pagination
curl http://localhost:5000/api/cafes?page=1&limit=10

# Get with search
curl http://localhost:5000/api/cafes?search=Kopi

# Get by ID
curl http://localhost:5000/api/cafes/507f1f77bcf86cd799439011
```

---

## 3️⃣ UPDATE - Mengubah Data

### A. Menggunakan Mongoose

#### Update One Document

```javascript
// Update by ID
const cafe = await Cafe.findByIdAndUpdate(
  '507f1f77bcf86cd799439011',
  { 
    rating: 4.8,
    isOpen: true 
  },
  { 
    new: true, // return updated document
    runValidators: true // run schema validators
  }
);

// Update one dengan kondisi
const cafe = await Cafe.findOneAndUpdate(
  { name: 'Kopi Kenangan' },
  { rating: 4.8 },
  { new: true }
);
```

#### Update Multiple Documents

```javascript
// Update semua cafe di Jakarta Selatan
const result = await Cafe.updateMany(
  { location: 'Jakarta Selatan' },
  { isOpen: true }
);

console.log(`${result.modifiedCount} documents updated`);
```

#### Update dengan Operators

```javascript
// Increment rating
await Cafe.findByIdAndUpdate(
  cafeId,
  { $inc: { rating: 0.1 } }
);

// Add item to array
await Cafe.findByIdAndUpdate(
  cafeId,
  { $push: { facilities: 'WiFi' } }
);

// Remove item from array
await Cafe.findByIdAndUpdate(
  cafeId,
  { $pull: { facilities: 'Smoking Area' } }
);

// Set field
await Cafe.findByIdAndUpdate(
  cafeId,
  { $set: { 'address.city': 'Jakarta' } }
);
```

### B. Menggunakan Navicat

1. Buka collection `cafes`
2. Double-click pada record yang ingin diubah
3. Edit field yang diinginkan
4. Klik **Save** atau tekan **Ctrl+S**

**Atau via Query:**

```javascript
// Update one
db.cafes.updateOne(
  { "_id": ObjectId("507f1f77bcf86cd799439011") },
  { "$set": { "rating": 4.8, "isOpen": true } }
)

// Update many
db.cafes.updateMany(
  { "location": "Jakarta Selatan" },
  { "$set": { "isOpen": true } }
)
```

### C. API Endpoints

```javascript
// PUT /api/cafes/:id - Update cafe
router.put('/cafes/:id', async (req, res) => {
  try {
    const cafe = await Cafe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true,
        runValidators: true 
      }
    );
    
    if (!cafe) {
      return res.status(404).json({
        success: false,
        error: 'Cafe tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      message: 'Cafe berhasil diupdate',
      data: cafe
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// PATCH /api/cafes/:id - Partial update
router.patch('/cafes/:id', async (req, res) => {
  try {
    const cafe = await Cafe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!cafe) {
      return res.status(404).json({
        success: false,
        error: 'Cafe tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      message: 'Cafe berhasil diupdate',
      data: cafe
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});
```

**Test dengan cURL:**
```bash
# Full update
curl -X PUT http://localhost:5000/api/cafes/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kopi Kenangan Updated",
    "location": "Jakarta Selatan",
    "rating": 4.8
  }'

# Partial update
curl -X PATCH http://localhost:5000/api/cafes/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{ "rating": 4.9 }'
```

---

## 4️⃣ DELETE - Menghapus Data

### A. Menggunakan Mongoose

#### Delete One Document

```javascript
// Delete by ID
const cafe = await Cafe.findByIdAndDelete('507f1f77bcf86cd799439011');

// Delete one dengan kondisi
const cafe = await Cafe.findOneAndDelete({ name: 'Kopi Kenangan' });
```

#### Delete Multiple Documents

```javascript
// Delete semua cafe yang closed
const result = await Cafe.deleteMany({ isOpen: false });
console.log(`${result.deletedCount} documents deleted`);

// Delete all (HATI-HATI!)
const result = await Cafe.deleteMany({});
```

### B. Menggunakan Navicat

1. Buka collection `cafes`
2. Klik kanan pada record yang ingin dihapus
3. Pilih **Delete Record**
4. Konfirmasi

**Atau via Query:**

```javascript
// Delete one
db.cafes.deleteOne({ "_id": ObjectId("507f1f77bcf86cd799439011") })

// Delete many
db.cafes.deleteMany({ "isOpen": false })
```

### C. API Endpoints

```javascript
// DELETE /api/cafes/:id - Delete cafe
router.delete('/cafes/:id', async (req, res) => {
  try {
    const cafe = await Cafe.findByIdAndDelete(req.params.id);
    
    if (!cafe) {
      return res.status(404).json({
        success: false,
        error: 'Cafe tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      message: 'Cafe berhasil dihapus',
      data: cafe
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/cafes - Delete multiple cafes
router.delete('/cafes', async (req, res) => {
  try {
    const { ids } = req.body; // array of IDs
    
    const result = await Cafe.deleteMany({
      _id: { $in: ids }
    });
    
    res.json({
      success: true,
      message: `${result.deletedCount} cafe(s) berhasil dihapus`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

**Test dengan cURL:**
```bash
# Delete one
curl -X DELETE http://localhost:5000/api/cafes/507f1f77bcf86cd799439011

# Delete multiple
curl -X DELETE http://localhost:5000/api/cafes \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
  }'
```

---

## 📊 Query Operators Reference

### Comparison Operators

| Operator | Deskripsi | Contoh |
|----------|-----------|--------|
| `$eq` | Equal | `{ rating: { $eq: 4.5 } }` |
| `$ne` | Not equal | `{ rating: { $ne: 4.5 } }` |
| `$gt` | Greater than | `{ rating: { $gt: 4 } }` |
| `$gte` | Greater than or equal | `{ rating: { $gte: 4 } }` |
| `$lt` | Less than | `{ rating: { $lt: 5 } }` |
| `$lte` | Less than or equal | `{ rating: { $lte: 5 } }` |
| `$in` | In array | `{ location: { $in: ['Jakarta', 'Bandung'] } }` |
| `$nin` | Not in array | `{ location: { $nin: ['Jakarta'] } }` |

### Logical Operators

```javascript
// AND (implicit)
{ isOpen: true, rating: { $gte: 4 } }

// OR
{ $or: [{ isOpen: true }, { rating: { $gte: 4.5 } }] }

// NOT
{ rating: { $not: { $lt: 4 } } }

// NOR
{ $nor: [{ isOpen: false }, { rating: { $lt: 3 } }] }
```

### Element Operators

```javascript
// Field exists
{ phone: { $exists: true } }

// Field type
{ rating: { $type: 'number' } }
```

### Array Operators

```javascript
// Array contains
{ facilities: 'WiFi' }

// Array contains all
{ facilities: { $all: ['WiFi', 'Parking'] } }

// Array size
{ facilities: { $size: 3 } }
```

---

## 🎯 Best Practices

### 1. Selalu Gunakan Try-Catch

```javascript
try {
  const cafe = await Cafe.findById(id);
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: error.message });
}
```

### 2. Validasi Input

```javascript
if (!name || !location) {
  return res.status(400).json({
    error: 'Name dan location harus diisi'
  });
}
```

### 3. Check Document Exists

```javascript
const cafe = await Cafe.findById(id);
if (!cafe) {
  return res.status(404).json({
    error: 'Cafe tidak ditemukan'
  });
}
```

### 4. Gunakan Lean() untuk Performance

```javascript
// Jika tidak perlu Mongoose methods
const cafes = await Cafe.find().lean();
```

### 5. Index untuk Query yang Sering

```javascript
// Di model
cafeSchema.index({ name: 'text', location: 'text' });
cafeSchema.index({ rating: -1 });
```

---

## 🧪 Testing CRUD Operations

### Test Script (test-crud.js)

```javascript
import mongoose from 'mongoose';
import Cafe from './server/models/Cafe.js';

async function testCRUD() {
  try {
    // Connect
    await mongoose.connect('mongodb://localhost:27017/cafeconnect');
    console.log('✅ Connected to MongoDB');
    
    // CREATE
    console.log('\n📝 Testing CREATE...');
    const newCafe = await Cafe.create({
      name: 'Test Cafe',
      location: 'Jakarta',
      rating: 4.5
    });
    console.log('Created:', newCafe);
    
    // READ
    console.log('\n📖 Testing READ...');
    const cafes = await Cafe.find();
    console.log(`Found ${cafes.length} cafes`);
    
    // UPDATE
    console.log('\n✏️  Testing UPDATE...');
    const updated = await Cafe.findByIdAndUpdate(
      newCafe._id,
      { rating: 4.8 },
      { new: true }
    );
    console.log('Updated:', updated);
    
    // DELETE
    console.log('\n🗑️  Testing DELETE...');
    await Cafe.findByIdAndDelete(newCafe._id);
    console.log('Deleted successfully');
    
    console.log('\n✅ All tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testCRUD();
```

Jalankan:
```bash
node test-crud.js
```

---

## 📚 Resources

- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB Query Operators](https://docs.mongodb.com/manual/reference/operator/query/)
- [MongoDB CRUD Operations](https://docs.mongodb.com/manual/crud/)
