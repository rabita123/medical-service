import asyncHandler from "express-async-handler";
import EmergencyDoctor from "../models/emergencyDoctorModel.js";

// @desc    Fetch all Packages
// @route   GET /api/packagelists
// @access  Private/Admin

const getEmergencyDoctor = asyncHandler(async (req, res) => {
  const emergencydoctors = await EmergencyDoctor.find({});
  res.json(emergencydoctors);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getEmergencyDoctorById = asyncHandler(async (req, res) => {
  const emergencydoctorid = await EmergencyDoctor.findById(req.params.id);

  if (emergencydoctorid) {
    res.json(emergencydoctorid);
  } else {
    res.status(404);
    throw new Error(" Not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createEmergencyDoctor = asyncHandler(async (req, res) => {
  const { phone, textdetails } = req.body;

  const createdEmergencyDoctor = await EmergencyDoctor.create({
    phone,
    textdetails,
  });

  res.status(201).json(createdEmergencyDoctor);
});

const updateEmergencyDoctor = asyncHandler(async (req, res) => {
  const { phone, textdetails } = req.body;

  const emergencydoctors = await EmergencyDoctor.findById(req.params.id);

  if (emergencydoctors) {
    emergencydoctors.phone = phone;
    emergencydoctors.textdetails = textdetails;

    const updatedEmergencyDoctors = await emergencydoctors.save();
    res.json(updatedEmergencyDoctors);
  } else {
    res.status(404);
    throw new Error("Not found");
  }
});

export {
  createEmergencyDoctor,
  getEmergencyDoctorById,
  getEmergencyDoctor,
  updateEmergencyDoctor,
};
