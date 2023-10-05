import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema({

  email: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDJaEoQJ0PLbNOn_xHRIw7mcyuIOj0_hVZlA&usqp=CAU",
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },

  verified: {
    type: Boolean,
    default: false,
    
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model("Admin", adminSchema);
