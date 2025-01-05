import asyncHandler from "express-async-handler";
import TestCategory from "../models/testCategoryModel.js";

// @desc    Create sample test categories if none exist
const createSampleCategories = async () => {
  const categories = await TestCategory.find({});
  if (categories.length === 0) {
    const sampleCategories = [
      { category_name: "Blood Tests" },
      { category_name: "Urine Tests" },
      { category_name: "Imaging" },
      { category_name: "General Health" },
      { category_name: "Cardiac" },
    ];
    await TestCategory.insertMany(sampleCategories);
  }
};

// @desc    Fetch all Test Categories
// @route   GET /api/testcategories
// @access  Public
const getTestCategories = asyncHandler(async (req, res) => {
  await createSampleCategories();
  const testcategories = await TestCategory.find({});
  res.json(testcategories);
});

export { getTestCategories };
