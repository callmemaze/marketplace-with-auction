import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
  members: {
    type: Array,
  },
  time: { type: Date, default: Date.now() },
});

export default mongoose.model("conversations", conversationSchema);
