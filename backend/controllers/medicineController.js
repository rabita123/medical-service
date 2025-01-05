import asyncHandler from "express-async-handler";
import Medicine from "../models/medicineModel.js";

const getAllMedicines = asyncHandler(async (req, res) => {
  const allmedicines = await Medicine.find({});
  res.json(allmedicines);
});

// @desc    Fetch all Tests
// @route   GET /api/alltests
// // @access  Public
const getAllMedicinesById = asyncHandler(async (req, res) => {
  const allmedicinesbyid = await Medicine.findById(req.params.id);
  res.json(allmedicinesbyid);
});

export { getAllMedicines, getAllMedicinesById };
