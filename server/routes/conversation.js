import express from "express";
import {
  createConversation,
  getConversation,
  getConversations,
} from "../controllers/conversation.js";

const router = express.Router();

router.post("/create-convo", createConversation);
router.get("/:userId", getConversation);
router.get("/find/:firstUserId/:secondUserId", getConversations);

export default router;
