import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import Specialist from "../models/specialistModel.js";
import {
  getAllSpecialists,
  deleteSpecialist,
  createSpecialist,
  getSpecialistById,
  updateSpecialist,
} from "../controllers/specialistController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
router.route("/").get(getAllSpecialists).post(protect, admin, createSpecialist);
router
  .route("/:id")
  .get(protect, admin, getSpecialistById)
  .delete(deleteSpecialist)
  .put(protect, admin, updateSpecialist);

export default router;
