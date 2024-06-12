import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  title: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: { type: Array, default: [] },
  create_At: { type: Date, default: Date.now() },
});

export default mongoose.model("Market", userSchema);
