import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Admin from "../models/admin.js";
import UserVerification from "../models/userVerification.js";
import { uuid as v4 } from "uuidv4";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// const v4 = uuid();

export const login = async (req, res, next) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    if (!user) {
      return next(new Error());
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    const { isAdmin, verified } = user._doc;
    if (!isPasswordCorrect || !isAdmin ||!verified) {
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

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Admin.findOne({ email: email });
    if (!user) return res.send({ status: "user not found" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: "infomng2022@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `${process.env.PROXY}/reset_password/${user._id}/${token}/`, // ce truc lè m'avait fait chier
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  } catch (e) {
    next(e);
  }
};

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          Admin.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
};



// REGISTER
////////////////////////////////////////////////////////////////////////////////////////////////                                      
export const register = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    const { email } = req.body;
    const user = await Admin.findOne({ email });
    if (user) {
      return res.send("user already exists");
    }

    const newUser = await Admin({ ...req.body, password: hash });
    if (!newUser) {
      return next(new Error());
    }

    // res.status(200).json(newUser);
    const id = newUser._id.toString();
    const token = jwt.sign({ user: req.body }, process.env.JWT);
    const url = `${process.env.PROXY}/verify-email/${id}/${token}/`;
   const html_element = ` <p>Verify your email adress to complete the singup and login into your account.</p><p>This is link <b></b>expires in 6 hours</b>.Press <a href=${url}>here</a> to proceed.</p> `

   const email_verification = await UserVerification({userId:id, uniqueString:token})
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: "infomng2022@gmail.com",
      to: email,
      subject: "Verify email",
      // text: 'Do somthing',
      html: html_element
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
    await newUser.save();
    await email_verification.save();
  } catch (e) {
    next(e);
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////

export const verifyEmail = async (req, res, next) => {
  try {
    const {id, token} = req.body;
    const verify_token = await UserVerification.findOne({userId:id})
    if(token == verify_token.uniqueString){
          const updatedUser = await Admin.findByIdAndUpdate(
            id,
            { $set: {verified:true, isAdmin:true} },
            { new: true }
          );
          res.status(200).json(updatedUser);
        
    }

  } catch (e) {
    next(e);
  }
};

// // Email vérification
// export const sendVerificationEmail = ({ _id, email }, res) => {

//    const transport = nodemailer.createTransport({
//      service: "gmail",
//      auth: {
//        user: process.env.AUTH_EMAIL,
//        pass: process.env.EMAIL_PASSWORD,
//      },
//    });

//   const uniqueString = v4 + _id;
//   const mailOptions = {
//     From: process.env.AUTH_EMAIL,
//     To: email,
//     subject: "Verify your email",
//     html: ` <p>Verify your email adress to complete the singup and login into your account.</p><p>This is link <b></b>expires in 6 hours</b>.Press <a href=${
//       process.env.PROXY + "user/verify/" + _id + uniqueString
//     }>here</a>to proceed.</p> `,
//   };

//   //hash the unique string
//   const saltRounds = 10;
//   bcrypt
//     .hash(uniqueString, saltRounds)
//     .then((hasheduniqueString) => {
//       // set value in userVerification collection
//       const newVerification = new UserVerification({
//         userId: _id,
//         uniqueString: hasheduniqueString,
//         createdAt: Date.now(),
//         expiresAt: Date.now() + 21600000,
//       });

//       newVerification
//         .save()
//         .then(() => {
//           transport.sendMail(mailOptions);
//         })
//         .then(() => {
//           res.json({
//             status: "success",
//             message: "Verification email sent successfully",
//           });
//         })
//         .catch((err) => {
//           res.json({ status: "FAILED", message: "verification email failed" });
//         })
//         .catch((error) => {
//           res.json({
//             status: "FAILED",
//             message: "could not save verification email data",
//           });
//         });
//     })
//     .catch(() => {
//       res.json({
//         status: "FAILED",
//         message: "An error has occurred while hashing email data",
//       });
//     });
// };
