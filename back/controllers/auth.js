import axios from "axios";
import User from "../models/user.js";
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

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, email, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });

    // Call the chat function with the user's email
    await chat(email);
  } catch (err) {
    next(err);
  }
};

export const chat = async (email) => {
  // Get or create user on Chat Engine!
  try {
    const response = await axios.put(
      "https://api.chatengine.io/users/",
      { username: email, secret: email, first_name: email },
      { headers: { "Private-Key": "c5455632-5e1e-4a70-a304-5921618c1720" } }
    );

    console.log(email);
    return response.data;
  } catch (error) {
    throw error;
  }
};
