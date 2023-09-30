import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import {verifyAdmin} from "./utils/verifyToken.js";


const app = express();

app.use(express());
app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();



const dbconnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB);
        console.log('Connected to MongoDB');

    }catch(e){
        throw e;
    };
}

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
  dbconnect();
});

app.use("/api/auth",verifyAdmin, authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    Message: errorMessage,
    satck: err.satck,
  });
});


app.listen(8800, () => {
  console.log("backend is running on localhost:8800");
  dbconnect();
});
