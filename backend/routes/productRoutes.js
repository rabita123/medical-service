import express from "express";

const router = express.Router();
import {
  getAllProducts,
  deleteProduct,
  createProduct,
  getAllHealthPackages,
  getProductById,
  updateProduct,
  updateValue,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router.route("/health-packages").get(getAllHealthPackages),
  router.route("/:id").delete(deleteProduct).put(protect, admin, updateProduct);
router.route("/:id").get(getProductById);
router.route("/:id/value").put(updateValue);

export default router;
