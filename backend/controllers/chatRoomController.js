import asyncHandler from "express-async-handler";

import ChatRoom from "../models/chatRoomModel.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const createChatRoom = asyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(req.body);

  const userExists = await ChatRoom.findOne({ name });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const chatroom = await ChatRoom.create({
    name,
  });

  if (chatroom) {
    res.status(201).json({
      _id: chatroom._id,
      chatroom: chatroom.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getAllChatrooms = asyncHandler(async (req, res) => {
  const chatrooms = await ChatRoom.find({});
  res.json(chatrooms);
});

export { createChatRoom, getAllChatrooms };
