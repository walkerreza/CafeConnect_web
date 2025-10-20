import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  cafeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafe',
    required: [true, 'Cafe ID harus diisi']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID harus diisi']
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  total: {
    type: Number,
    required: [true, 'Total harus diisi'],
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'e-wallet', 'bank-transfer'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  },
  notes: {
    type: String,
    trim: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index untuk query yang sering digunakan
orderSchema.index({ userId: 1, orderDate: -1 });
orderSchema.index({ cafeId: 1, status: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
