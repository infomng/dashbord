import express from "express";
import { login, register, forgotPassword, resetPassword, verifyEmail } from "../controllers/auth.js";

// import { chat } from "../controllers/chat.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.post("/verify-email", verifyEmail);

export default router;

