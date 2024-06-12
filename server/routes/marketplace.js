import express from "express";
import { createItem, getItems } from "../controllers/marketplace.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({
  dest: `uploads/`,
  limits: {
    files: 5,
    fieldSize: 5 * 1024 * 1024,
  },
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});

const router = express.Router();

router.get("/", auth, getItems);
router.post("/create-item", auth, upload.array("images"), createItem);
//router.delete("/delete-room/:id", auth, deleteRoom);

export default router;
