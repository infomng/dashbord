import express from "express";
import { login, register } from "../controllers/auth.js";

// import { chat } from "../controllers/chat.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;

