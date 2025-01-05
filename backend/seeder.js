import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import tests from "./data/tests.js";
import Test from "./models/testModel.js";
import TestCategory from "./models/testCategoryModel.js";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Test.deleteMany();
    await TestCategory.deleteMany();
    await User.deleteMany();

    // Import users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Create categories and tests
    const categories = {};
    
    // First create all categories
    for (const test of tests) {
      if (!categories[test.category_name]) {
        const category = await TestCategory.create({
          category_name: test.category_name
        });
        categories[test.category_name] = category._id;
      }
    }

    // Then create tests with category references
    const testsWithCategories = tests.map(test => ({
      ...test,
      category_id: categories[test.category_name]
    }));

    await Test.insertMany(testsWithCategories);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Test.deleteMany();
    await TestCategory.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
