import express from "express";
import { findUser, signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/findUser/:id", findUser);

export default router;
