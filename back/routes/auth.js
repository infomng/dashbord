import express from "express";
import { login, register, chat } from "../controllers/auth.js";


// import { chat } from "../controllers/chat.js";


const router = express.Router();

router.post("/register", register,chat);
router.post("/login", login );



export default router;