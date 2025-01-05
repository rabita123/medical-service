import mongoose from "mongoose";


const chatRoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: "sdsds",
  },
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

export default ChatRoom;
