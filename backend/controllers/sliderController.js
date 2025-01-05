import asyncHandler from "express-async-handler";
import Slider from "../models/sliderModel.js";

const getAllSliders = asyncHandler(async (req, res) => {
  const allsliders = await Slider.find({});
  res.json(allsliders);
});

// @desc    Delete a package
// @route   DELETE /api/packagelists/:id
// @access  Private/Admin
const deleteSlider = asyncHandler(async (req, res) => {
  const sliders = await Slider.findById(req.params.id);

  if (sliders) {
    await sliders.remove();
    // fs.unlink(`C:/react/doctor/${sliders.image}`);

    res.json({ message: "Slider removed" });
  } else {
    res.status(404);
    throw new Error("Slider not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getSliderById = asyncHandler(async (req, res) => {
  const sliders = await Slider.findById(req.params.id);

  if (sliders) {
    res.json(sliders);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createSlider = asyncHandler(async (req, res) => {
  const { name, image } = req.body;

  const createSlider = await Slider.create({
    name,
    image,
  });

  res.status(201).json(createSlider);
});

const updateSlider = asyncHandler(async (req, res) => {
  const { name, image } = req.body;

  const sliders = await Slider.findById(req.params.id);

  if (sliders) {
    sliders.name = name;
    sliders.image = image;

    const updatedSlider = await sliders.save();
    res.json(updatedSlider);
  } else {
    res.status(404);
    throw new Error("Slider not found");
  }
});

export {
  getAllSliders,
  deleteSlider,
  createSlider,
  getSliderById,
  updateSlider,
};
