import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  img: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
 
  },
  producer: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },

  inStock: {
    type: Number,
    required: true,
  },
  updatedAt:{
    type: Date,
    dafault: Date.now,
    required: true,
  }
});

export default mongoose.model("Product", productSchema);

