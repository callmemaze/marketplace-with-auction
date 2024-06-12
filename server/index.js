import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import marketRoutes from "./routes/marketplace.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/auth", userRoutes);
app.use("/marketplace", marketRoutes);

const PORT = process.env.PORT || 8000;
const CONNECTION_URI = process.env.CONNECTION_URI;

mongoose
  .connect(CONNECTION_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
