import express from "express";

const router = express.Router();
import {
  createChatRoom,
  getAllChatrooms,
} from "../controllers/chatRoomController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createChatRoom).get(getAllChatrooms);

export default router;
