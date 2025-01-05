import express from "express";
const router = express.Router();
import {
  addAppointments,
  getAppointmentById,
  getAllAppointments,
} from "../controllers/appointmentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addAppointments);
router.route("/").get(getAllAppointments);
router.route("/:id").get(protect, getAppointmentById);

export default router;
