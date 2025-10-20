import express from 'express';
import Cafe from '../models/Cafe.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

const router = express.Router();

// GET /api - API info
router.get('/', (req, res) => {
  res.json({
    message: 'CafeConnect API',
    version: '1.0.0',
    endpoints: {
      cafes: '/api/cafes',
      users: '/api/users',
      orders: '/api/orders'
    }
  });
});

// GET /api/cafes - Get all cafes
router.get('/cafes', async (req, res) => {
  try {
    const cafes = await Cafe.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: cafes,
      count: cafes.length
    });
  } catch (error) {
    console.error('Error fetching cafes:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal mengambil data cafe',
      message: error.message
    });
  }
});

// GET /api/cafes/:id - Get cafe by ID
router.get('/cafes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cafe = await Cafe.findById(id);
    
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
    console.error('Error fetching cafe:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal mengambil data cafe',
      message: error.message
    });
  }
});

// POST /api/cafes - Create new cafe
router.post('/cafes', async (req, res) => {
  try {
    const cafeData = req.body;
    
    const newCafe = new Cafe(cafeData);
    await newCafe.save();
    
    res.status(201).json({
      success: true,
      message: 'Cafe berhasil dibuat',
      data: newCafe
    });
  } catch (error) {
    console.error('Error creating cafe:', error);
    res.status(400).json({
      success: false,
      error: 'Gagal membuat cafe',
      message: error.message
    });
  }
});

// PUT /api/cafes/:id - Update cafe (full update)
router.put('/cafes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cafe = await Cafe.findByIdAndUpdate(
      id,
      req.body,
      { 
        new: true, // return updated document
        runValidators: true // run schema validators
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
    console.error('Error updating cafe:', error);
    res.status(400).json({
      success: false,
      error: 'Gagal mengupdate cafe',
      message: error.message
    });
  }
});

// PATCH /api/cafes/:id - Update cafe (partial update)
router.patch('/cafes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cafe = await Cafe.findByIdAndUpdate(
      id,
      { $set: req.body },
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
    console.error('Error updating cafe:', error);
    res.status(400).json({
      success: false,
      error: 'Gagal mengupdate cafe',
      message: error.message
    });
  }
});

// DELETE /api/cafes/:id - Delete cafe
router.delete('/cafes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cafe = await Cafe.findByIdAndDelete(id);
    
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
    console.error('Error deleting cafe:', error);
    res.status(500).json({
      success: false,
      error: 'Gagal menghapus cafe',
      message: error.message
    });
  }
});

// GET /api/users - Get all users
router.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' }
  ];
  
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

// GET /api/orders - Get all orders
router.get('/orders', (req, res) => {
  const orders = [
    {
      id: 1,
      cafeId: 1,
      userId: 1,
      items: ['Kopi Susu', 'Croissant'],
      total: 35000,
      status: 'completed'
    },
    {
      id: 2,
      cafeId: 2,
      userId: 2,
      items: ['Americano'],
      total: 20000,
      status: 'pending'
    }
  ];
  
  res.json({
    success: true,
    data: orders,
    count: orders.length
  });
});

export default router;
