import express from "express";
import {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

//CREATE PRODUCT
router.post("/", createProduct);

// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);

//GET ALL PRODUCTS
router.get("/", getAllProduct);

// UPDATE PRODUCT
router.put("/:id", updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;
