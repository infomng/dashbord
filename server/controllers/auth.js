import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import dotenv from "dotenv";

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

    const token = jwt.sign(
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
