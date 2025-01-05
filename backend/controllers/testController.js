import asyncHandler from "express-async-handler";
import Test from "../models/testModel.js";

// @desc    Fetch all Tests
// @route   GET /api/alltests
// // @access  Public
const getAllTests = asyncHandler(async (req, res) => {
  const alltests = await Test.find({});
  res.json(alltests);
});

// @desc    Fetch all Tests by ID
// @route   GET /api/alltests/:id
// // @access  Public
const getAllTestsById = asyncHandler(async (req, res) => {
  const alltestsbyid = await Test.findById(req.params.id);
  console.log(req.params._id);
  res.json(alltestsbyid);
});

// @desc    Fetch Tests By Category
// @route   GET /api/alltests/:id
// @access  Public
const getTestById = asyncHandler(async (req, res) => {
  const testsbycategory = await Test.find({
    category_id: req.params.id,
  });

  if (testsbycategory) {
    res.json(testsbycategory);
  } else {
    res.status(404);
    throw new Error("Test not found");
  }
});

export { getAllTests, getTestById, getAllTestsById };
