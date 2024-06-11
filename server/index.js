import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const CONNECTION_URI = process.env.CONNECTION_URI;

mongoose
  .connect(CONNECTION_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
