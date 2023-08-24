import express from 'express';
import {createUser, deleteUser, getAllUsers, getUser, register, updateUser,} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";



const router = express.Router();

//CREATE USER
router.post("/", register);


// GET ALL USERS
router.get("/", getAllUsers);

// GET ONE USER
router.get("/:id", getUser);

// DELETE USER
router.delete("/:id", deleteUser);

// UPDATE USER
router.put("/:id", updateUser);


router.get("/checkauthentication", verifyToken, (req,res,next)=>{
  res.send("hello user, you are logged in")
})

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
  res.send("hello user, you are logged in and you can delete your account")
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
  res.send("hello admin, you are logged in and you can delete all accounts")
})






export default router;

