import asyncHandler from "express-async-handler";
import Specialist from "../models/specialistModel.js";

const getAllSpecialists = asyncHandler(async (req, res) => {
  const allspecialists = await Specialist.find({});
  res.json(allspecialists);
});

// @desc    Delete a package
// @route   DELETE /api/packagelists/:id
// @access  Private/Admin
const deleteSpecialist = asyncHandler(async (req, res) => {
  const specialists = await Specialist.findById(req.params.id);

  if (specialists) {
    await specialists.remove();
    res.json({ message: "Package removed" });
  } else {
    res.status(404);
    throw new Error("Package not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getSpecialistById = asyncHandler(async (req, res) => {
  const specialists = await Specialist.findById(req.params.id);

  if (specialists) {
    res.json(specialists);
  } else {
    res.status(404);
    throw new Error("Specialist not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createSpecialist = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const createSpecialist = await Specialist.create({
    name,
  });

  res.status(201).json(createSpecialist);
});

const updateSpecialist = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const specialists = await Specialist.findById(req.params.id);

  if (specialists) {
    specialists.name = name;

    const updatedSpecialist = await specialists.save();
    res.json(updatedSpecialist);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getAllSpecialists,
  deleteSpecialist,
  createSpecialist,
  getSpecialistById,
  updateSpecialist,
};
