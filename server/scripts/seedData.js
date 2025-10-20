import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Menu from '../models/Menu.js';
import User from '../models/User.js';

dotenv.config();

/**
 * Script untuk seed dummy data ke MongoDB
 * Jalankan: node server/scripts/seedData.js
 */

const seedData = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cafeconnect', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data (optional)
    console.log('\n🗑️  Clearing existing data...');
    await Menu.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Data cleared');
    
    // Seed Menu data
    console.log('\n📝 Seeding Menu data...');
    const menus = [
      {
        name: 'Arabic Coffee',
        category: 'coffee',
        description: 'Traditional Middle Eastern coffee with aromatic spices including cardamom. Rich, bold flavor that awakens your senses.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=300&fit=crop',
        rating: 4.8,
        isAvailable: true,
        isPremium: false,
        ingredients: ['Arabica Coffee', 'Cardamom', 'Water', 'Sugar'],
        calories: 5,
        preparationTime: 5
      },
      {
        name: 'Luwak Coffee',
        category: 'coffee',
        description: "Indonesia's finest and rarest coffee. Smooth, earthy flavor with hints of chocolate and caramel.",
        price: 75000,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
        rating: 5.0,
        isAvailable: true,
        isPremium: true,
        ingredients: ['Premium Luwak Coffee Beans', 'Hot Water'],
        calories: 2,
        preparationTime: 7
      },
      {
        name: 'Milk Coffee',
        category: 'coffee',
        description: 'Perfect blend of espresso and steamed milk. Smooth, creamy texture with balanced sweetness.',
        price: 28000,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
        rating: 4.5,
        isAvailable: true,
        isPremium: false,
        ingredients: ['Espresso', 'Fresh Milk', 'Sugar'],
        calories: 120,
        preparationTime: 4
      },
      {
        name: 'Cappuccino Latte',
        category: 'coffee',
        description: 'Rich espresso with velvety steamed milk and delicate microfoam.',
        price: 32000,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
        rating: 4.7,
        isAvailable: true,
        isPremium: false,
        ingredients: ['Espresso', 'Steamed Milk', 'Milk Foam'],
        calories: 150,
        preparationTime: 5
      },
      {
        name: 'Espresso',
        category: 'coffee',
        description: 'Strong and bold Italian coffee shot. Pure, concentrated coffee flavor.',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
        rating: 4.6,
        isAvailable: true,
        isPremium: false,
        ingredients: ['Premium Espresso Beans', 'Hot Water'],
        calories: 3,
        preparationTime: 3
      },
      {
        name: 'Americano',
        category: 'coffee',
        description: 'Espresso with hot water for a smooth, rich taste.',
        price: 27000,
        image: 'https://images.unsplash.com/photo-1532004491497-ba35c367d634?w=400&h=300&fit=crop',
        rating: 4.4,
        isAvailable: true,
        isPremium: false,
        ingredients: ['Espresso', 'Hot Water'],
        calories: 5,
        preparationTime: 4
      }
    ];
    
    await Menu.insertMany(menus);
    console.log(`✅ ${menus.length} menus created`);
    
    // Seed User data
    console.log('\n📝 Seeding User data...');
    const users = [
      {
        name: 'Admin User',
        email: 'admin@cafeconnect.com',
        password: 'admin123', // Di production, hash dengan bcrypt
        phone: '081234567890',
        role: 'admin',
        isActive: true
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'user123',
        phone: '081234567891',
        role: 'customer',
        isActive: true
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'user123',
        phone: '081234567892',
        role: 'customer',
        isActive: true
      }
    ];
    
    await User.insertMany(users);
    console.log(`✅ ${users.length} users created`);
    
    // Show summary
    console.log('\n📊 Seed Summary:');
    console.log(`   Menus: ${await Menu.countDocuments()}`);
    console.log(`   Users: ${await User.countDocuments()}`);
    
    console.log('\n✅ Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
    process.exit(0);
  }
};

// Jalankan seed
seedData();
