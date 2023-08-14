import express from 'express';
import {createUser, deleteUser, getAllUsers, getUser, updateUser,} from '../controllers/user.js';
import { createProduct } from '../controllers/product.js';

const router = express.Router();

//CREATE USER
router.post("/", createUser);

// GET ALL USERS
router.get("/", getAllUsers);

// GET ONE USER
router.get("/:id", getUser);

// DELETE USER
router.delete("/:id", deleteUser);

// UPDATE USER
router.put("/:id", updateUser);

router.post("/", createProduct);




export default router;