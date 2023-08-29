import express from "express";
import { chat } from "../controllers/chat.js";

const router = express.Router();

router.post('/', chat, ()=>{
    console.log("chat is responding");
});

export default router;


// pour resoudre le pb de axios, je vais recuperer 