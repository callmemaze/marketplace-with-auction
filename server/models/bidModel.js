import mongoose from "mongoose";

const bidSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  item: { type: String, required: true },
  date: { type: Number, default: new Date().getTime() },
  price: { type: Number },
});

export default mongoose.model("bid", bidSchema);
