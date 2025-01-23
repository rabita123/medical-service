import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import {
  getDoctors,
  getDoctorsProfileById,
  getAllDoctorsBySpeciality,
  createDoctors,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
// import Doctor from '../models/doctorModel.js'

router.route("/").get(getDoctors).post(protect, admin, createDoctors);
router.route("/specialty/:specialty").get(getAllDoctorsBySpeciality);
router
  .route("/:id")
  .get(getDoctorsProfileById)
  .delete(deleteDoctor)
  .put(protect, admin, updateDoctor);

// router.get('/',asyncHandler(async(req,res)=>{
//     const doctors=await Doctor.find({})
//     res.json(doctors)
// }))

export default router;
