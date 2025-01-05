import express from "express";
const router = express.Router();
import {
  getPackagesLists,
  getPackagesDataById,
} from "../controllers/nursingPackageController.js";

import { getProductById } from "../controllers/productController.js";

router.route("/").get(getPackagesLists);
router.route("/:id").get(getProductById);

export default router;
