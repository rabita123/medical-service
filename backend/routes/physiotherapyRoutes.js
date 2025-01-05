import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

import {
  createPhysiotherapyUser,
  getAllPhysiotherapyPackages,
  getPackageOrdersById,
  updateFormToPaid,
} from "../controllers/physiotherapyController.js";

router.route("/").get(getAllPhysiotherapyPackages);
router.route("/test/").get(getPackageOrdersById);
router.route("/add").post(createPhysiotherapyUser);
router.route("/:id/payment").put(updateFormToPaid);

export default router;
