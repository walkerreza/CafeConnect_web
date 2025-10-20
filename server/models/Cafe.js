import mongoose from 'mongoose';

const cafeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama cafe harus diisi'],
    trim: true,
    maxlength: [100, 'Nama cafe maksimal 100 karakter']
  },
  location: {
    type: String,
    required: [true, 'Lokasi harus diisi'],
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating minimal 0'],
    max: [5, 'Rating maksimal 5']
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  openingHours: {
    type: String,
    default: '08:00 - 22:00'
  },
  phone: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  facilities: [{
    type: String,
    trim: true
  }],
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
cafeSchema.index({ name: 'text', location: 'text' });

const Cafe = mongoose.model('Cafe', cafeSchema);

export default Cafe;
