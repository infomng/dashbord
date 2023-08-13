import { createHotel } from "../controllers/hotels.js";
import express from "express";
const router = express.Router();

router.post("/", createHotel);


export default router;
