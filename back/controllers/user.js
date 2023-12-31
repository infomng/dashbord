import User from '../models/user.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/err.js";








export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};



//CREATE ONE USER
export const  createUser = async (req, res, next)=>{
    const newUser = new User({...req.body});
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    }catch(err){
        next(err);


        
    }
}

// GET ONE USER
export const getUser = async (req,res,next)=>{
    try{
    const user = await User.findById(req.params.id);
res.status(200).json(user);
    }catch(err){
        throw next(err);
    };

}


// GET ALL 
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  

  } catch (err) {}
};



//DELETE ONE USER THANKS TO IS ID
export const deleteUser = async (req, res, next)    => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted");
    }catch(err){};
}


// UPDATE ONE USER THANKS TO IS ID
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{ $set: req.body },
      { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        next(error);
        
    }
}




