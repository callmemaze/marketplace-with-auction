import mongoose from "mongoose";

const auctionItemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  images: { type: Array, default: [] },
  date: { type: Number, default: new Date().getTime() },
  start_bid_date: { type: Number, default: new Date().getTime() },
  details: { type: String, required: true },
  price: { type: Number, required: true },
  bidded: { type: Boolean, default: false },
  sold: { type: Boolean, default: false },
});

export default mongoose.model("AuctionItem", auctionItemSchema);
