import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import Ambulance from "../models/ambulanceModel.js";
import {
  getAllAmbulances,
  deleteAmbulance,
  createAmbulance,
  updateAmbulance,
  getAmbulanceById,
} from "../controllers/ambulanceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
router.route("/").get(getAllAmbulances).post(protect, admin, createAmbulance);
router
  .route("/:id")
  .get(protect, admin, getAmbulanceById)
  .delete(deleteAmbulance)
  .put(protect, admin, updateAmbulance);

export default router;
