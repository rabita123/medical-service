import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

import TestCategory from "../models/testCategoryModel.js";

// @desc    Get all test categories
// @route   GET /api/testcategories
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await TestCategory.find({});
    res.json(categories);
  })
);

// @desc    Create a test category
// @route   POST /api/testcategories
// @access  Private/Admin
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { category_name } = req.body;

    if (!category_name) {
      res.status(400);
      throw new Error("Please provide a category name");
    }

    const categoryExists = await TestCategory.findOne({ category_name });
    if (categoryExists) {
      res.status(400);
      throw new Error("Category already exists");
    }

    const category = await TestCategory.create({
      category_name,
    });

    res.status(201).json(category);
  })
);

// @desc    Update a test category
// @route   PUT /api/testcategories/:id
// @access  Private/Admin
router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { category_name } = req.body;
    const category = await TestCategory.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    if (!category_name) {
      res.status(400);
      throw new Error("Please provide a category name");
    }

    const categoryExists = await TestCategory.findOne({
      category_name,
      _id: { $ne: req.params.id },
    });
    if (categoryExists) {
      res.status(400);
      throw new Error("Category name already exists");
    }

    category.category_name = category_name;
    const updatedCategory = await category.save();

    res.json(updatedCategory);
  })
);

// @desc    Delete a test category
// @route   DELETE /api/testcategories/:id
// @access  Private/Admin
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const category = await TestCategory.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    await category.remove();
    res.json({ message: "Category removed" });
  })
);

export default router;
