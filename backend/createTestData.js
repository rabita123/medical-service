import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Test from './models/testModel.js';
import TestCategory from './models/testCategoryModel.js';

dotenv.config();

const createTestData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Create test category
    const category = await TestCategory.create({
      category_name: 'Blood Tests',
    });
    console.log('Test category created:', category);

    // Create test
    const test = await Test.create({
      name: 'Complete Blood Count (CBC)',
      description: 'Measures different components of your blood, including red and white blood cells, platelets, and hemoglobin.',
      category_id: category._id,
      price: 1200,
      preparation: 'Fasting for 8-12 hours may be required',
      duration: 30,
      report_time: 24,
      is_available: true,
    });
    console.log('Test created:', test);

    console.log('Data creation successful');
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createTestData(); 