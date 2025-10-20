# CafeConnect Backend API

Backend Express.js untuk aplikasi CafeConnect.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables management

## 📁 Struktur Folder

```
server/
├── index.js          # Entry point server
├── routes/
│   └── api.js        # API routes
├── controllers/      # (untuk nanti)
├── models/          # (untuk nanti)
└── middleware/      # (untuk nanti)
```

## 🔧 Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` ke `.env` dan sesuaikan konfigurasi:

```bash
cp .env.example .env
```

### 3. Jalankan Server

**Development mode (dengan nodemon):**
```bash
npm run dev:server
```

**Production mode:**
```bash
npm run server
```

**Jalankan Frontend + Backend bersamaan:**
```bash
npm run dev:all
```

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Cek status server

### API Info
- **GET** `/api` - Informasi API

### Cafes
- **GET** `/api/cafes` - Get semua cafe
- **GET** `/api/cafes/:id` - Get cafe by ID
- **POST** `/api/cafes` - Create cafe baru

### Users
- **GET** `/api/users` - Get semua users

### Orders
- **GET** `/api/orders` - Get semua orders

## 🧪 Testing API

### Menggunakan Browser
```
http://localhost:5000/health
http://localhost:5000/api/cafes
```

### Menggunakan cURL
```bash
# Get all cafes
curl http://localhost:5000/api/cafes

# Get cafe by ID
curl http://localhost:5000/api/cafes/1

# Create new cafe
curl -X POST http://localhost:5000/api/cafes \
  -H "Content-Type: application/json" \
  -d '{"name":"New Cafe","location":"Jakarta"}'
```

### Menggunakan Axios (dari Frontend)
```javascript
import axios from 'axios';

// Get cafes
const response = await axios.get('/api/cafes');
console.log(response.data);
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port server | 5000 |
| `NODE_ENV` | Environment | development |

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "count": 10
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🛠️ Development

### Menambah Route Baru

1. Buka `server/routes/api.js`
2. Tambahkan route baru:

```javascript
router.get('/menu', (req, res) => {
  res.json({ success: true, data: [] });
});
```

### Menambah Middleware

Buat file di `server/middleware/`:

```javascript
// server/middleware/auth.js
export const authMiddleware = (req, res, next) => {
  // Authentication logic
  next();
};
```

## 📦 Next Steps

- [ ] Integrasi dengan Database (MySQL/PostgreSQL/MongoDB)
- [ ] Authentication & Authorization (JWT)
- [ ] Validation middleware
- [ ] Error handling yang lebih robust
- [ ] Logging system
- [ ] Rate limiting
- [ ] API documentation (Swagger)

## 🤝 Contributing

Silakan buat branch baru untuk setiap feature atau bugfix.

## 📄 License

MIT
