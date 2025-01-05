import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
  getUsersOrders,
  getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router
  .route("/:id")
  .get(protect, getOrderById, getUsersOrders)
  .delete(protect, deleteOrder);
router.route("/:id/pay").put(updateOrderToPaid);

router.route("/:id/users").get(getUsersOrders);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
