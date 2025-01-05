import express from "express";
const router = express.Router();
import {
  getNursingPackagesByType,
  nursingUserFormData,
  getNursingPackages,
} from "../controllers/nursingPackageController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

import { getAllNursingPackages } from "../controllers/productController.js";

router.route("/").get(getAllNursingPackages);
router.route("/:id").get(getNursingPackagesByType);

router.route("/save-form/").post(nursingUserFormData);

export default router;
