import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import dotenv from "dotenv";
import nodemailer from  'nodemailer'

export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = await User({ ...req.body, password: hash });
    await newUser.save();

    if (!newUser) {
      return next(new Error());
    }
    res.status(200).json(newUser);
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new Error());
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    const {isAdmin} = user._doc;
    if (!isPasswordCorrect || !isAdmin) {
      return next(new Error());
    }

    const token =  jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, email, ...othersDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...othersDetails }, isAdmin });
  } catch (e) {
    next(e);
  }
};

export const forgotPassword = async (req, res, next) => {

  try  {

    const{ email} = req.body
  const user =  await User.findOne({ email: email});
  console.log(email);
  if(!user) return res.send({ status: "user not found" });
 

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'infomng2022@gmail.com',
              pass: 'wkjqbmezjdawwdjj'
            }
          });

          
          var mailOptions = {
            from: 'infomng2022@gmail.com',
            to: 'infomng2022@gmail.com',
            subject: 'Reset Password Link',
            text: `http://localhost:5173/reset_password/${user._id}/${token}/`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
}catch(e){
  next(e);
}
};

export const resetPassword = async (req, res, next) => {

  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } 
    
    else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
        
    }
  });
};
