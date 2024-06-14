import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  conversationId: {
    type: String,
  },
  sender: {
    type: String,
  },
  text: {
    type: String,
  },
  time: { type: Date, default: Date.now() },
});

export default mongoose.model("messages", messageSchema);
