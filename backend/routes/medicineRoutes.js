import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import { getAllMedicines } from "../controllers/productController.js";

router.route("/").get(getAllMedicines);

export default router;
