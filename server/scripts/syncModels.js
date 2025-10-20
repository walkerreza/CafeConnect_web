import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cafe from '../models/Cafe.js';
import Menu from '../models/Menu.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

dotenv.config();

/**
 * Script untuk sync/update models ke MongoDB
 * Jalankan: node server/scripts/syncModels.js
 */

const syncModels = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Connect ke MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cafeconnect', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // List semua collections yang ada
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📋 Existing collections:', collections.map(c => c.name));
    
    // Sync indexes untuk setiap model
    console.log('\n🔄 Syncing indexes...');
    
    await Cafe.syncIndexes();
    console.log('✅ Cafe indexes synced');
    
    await Menu.syncIndexes();
    console.log('✅ Menu indexes synced');
    
    await User.syncIndexes();
    console.log('✅ User indexes synced');
    
    await Order.syncIndexes();
    console.log('✅ Order indexes synced');
    
    // Tampilkan info collections
    console.log('\n📊 Collection Stats:');
    
    const cafeCount = await Cafe.countDocuments();
    console.log(`   Cafes: ${cafeCount} documents`);
    
    const menuCount = await Menu.countDocuments();
    console.log(`   Menus: ${menuCount} documents`);
    
    const userCount = await User.countDocuments();
    console.log(`   Users: ${userCount} documents`);
    
    const orderCount = await Order.countDocuments();
    console.log(`   Orders: ${orderCount} documents`);
    
    console.log('\n✅ All models synced successfully!');
    
  } catch (error) {
    console.error('❌ Error syncing models:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
    process.exit(0);
  }
};

// Jalankan sync
syncModels();
