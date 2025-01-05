import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import Slider from "../models/sliderModel.js";

import {
  getAllSliders,
  deleteSlider,
  createSlider,
  getSliderById,
  updateSlider,
} from "../controllers/sliderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getAllSliders).post(protect, admin, createSlider);
router
  .route("/:id")
  .get(protect, admin, getSliderById)
  .delete(deleteSlider)
  .put(protect, admin, updateSlider);

export default router;
