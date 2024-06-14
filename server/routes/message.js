import express from "express";
import { createMessage, getMessage } from "../controllers/message.js";

const router = express.Router();

router.post("/create-message", createMessage);
router.get("/:conversationId", getMessage);

export default router;
