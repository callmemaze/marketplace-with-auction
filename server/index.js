import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import marketRoutes from "./routes/marketplace.js";
import auctionRoutes from "./routes/auction.js";
import websocketRoutes from "./routes/websocket.js";
import conversationRoutes from "./routes/conversation.js";
import messageRoutes from "./routes/message.js";
import socketRoutes from "./routes/socket.js";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/auth", userRoutes);
app.use("/marketplace", marketRoutes);
app.use("/auctions", auctionRoutes);

app.use("/", websocketRoutes);
app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);
app.use(socketRoutes);
const PORT = process.env.PORT || 8000;
const CONNECTION_URI = process.env.CONNECTION_URI;

mongoose
  .connect(CONNECTION_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
