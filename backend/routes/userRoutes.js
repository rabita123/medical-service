import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  getUsers,
  updateUserProfile,
  forgetPassword,
  resetPassword,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router.post("/forgetpassword", forgetPassword);
router.post("/resetpassword/:token", resetPassword);

router
  .route("/profiles")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
