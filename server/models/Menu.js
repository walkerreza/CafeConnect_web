import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama menu harus diisi'],
    trim: true,
    maxlength: [100, 'Nama menu maksimal 100 karakter']
  },
  category: {
    type: String,
    required: [true, 'Kategori harus diisi'],
    enum: ['coffee', 'non-coffee', 'food', 'snack', 'dessert'],
    default: 'coffee'
  },
  description: {
    type: String,
    required: [true, 'Deskripsi harus diisi'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Harga harus diisi'],
    min: [0, 'Harga minimal 0']
  },
  image: {
    type: String,
    default: ''
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating minimal 0'],
    max: [5, 'Rating maksimal 5']
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  allergens: [{
    type: String,
    trim: true
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  calories: {
    type: Number,
    min: [0, 'Kalori minimal 0']
  },
  preparationTime: {
    type: Number, // in minutes
    default: 5
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

// Index untuk search
menuSchema.index({ name: 'text', description: 'text' });
menuSchema.index({ category: 1, isAvailable: 1 });

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
