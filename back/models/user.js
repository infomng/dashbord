import mongoose from "mongoose";
const { Schema } = mongoose;


const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },

    verified: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
