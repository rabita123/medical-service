import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import EmergencyDoctor from "../models/emergencyDoctorModel.js";

import {
  createEmergencyDoctor,
  getEmergencyDoctor,
  getEmergencyDoctorById,
  updateEmergencyDoctor,
} from "../controllers/emergencyDoctorController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, admin, getEmergencyDoctor)
  .post(createEmergencyDoctor);
router
  .route("/:id")
  .get(protect, admin, getEmergencyDoctorById)
  //   .delete(deleteSlider)
  .put(protect, admin, updateEmergencyDoctor);

export default router;
