import asyncHandler from "express-async-handler";
import Ambulance from "../models/ambulanceModel.js";

const getAllAmbulances = asyncHandler(async (req, res) => {
  const allambulances = await Ambulance.find({});
  res.json(allambulances);
});

// @desc    Delete a package
// @route   DELETE /api/packagelists/:id
// @access  Private/Admin
const deleteAmbulance = asyncHandler(async (req, res) => {
  const ambulances = await Ambulance.findById(req.params.id);

  if (ambulances) {
    await ambulances.remove();
    res.json({ message: "Ambulance removed" });
  } else {
    res.status(404);
    throw new Error("Ambulance not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getAmbulanceById = asyncHandler(async (req, res) => {
  const ambulances = await Ambulance.findById(req.params.id);

  if (ambulances) {
    res.json(ambulances);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createAmbulance = asyncHandler(async (req, res) => {
  const { name, phone, image } = req.body;

  const createAmbulance = await Ambulance.create({
    name,
    phone,
    image,
  });

  res.status(201).json(createAmbulance);
});

const updateAmbulance = asyncHandler(async (req, res) => {
  const { name, phone, image } = req.body;

  const ambulanceupdate = await Ambulance.findById(req.params.id);

  if (ambulanceupdate) {
    ambulanceupdate.name = name;
    ambulanceupdate.phone = phone;
    ambulanceupdate.image = image;

    const updatedAmbulance = await ambulanceupdate.save();
    res.json(updatedAmbulance);
  } else {
    res.status(404);
    throw new Error("Ambulance not found");
  }
});

export {
  getAllAmbulances,
  deleteAmbulance,
  createAmbulance,
  updateAmbulance,
  getAmbulanceById,
};
