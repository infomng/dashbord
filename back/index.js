import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from './routes/user.js'
import authRoute from "./routes/auth.js";
import chatRoute from "./routes/chat.js";
import productRoute from './routes/product.js'
import initServer from "./utils/socket.js"
import {createServer} from "http";
import {Server} from 'socket.io'




const app = express();



const httpServer = createServer(app);

app.use(express());
app.use(express.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();


// const server = http.createServer(app);
const io = new Server(httpServer,{
  cors:{
    origin: 'http://localhost:5173',
    credentials:true,
  }
});

io.on("connection", (socket) => {
  console.log("user connected successfully ", socket.id);
  socket.on("newMessage", (message) => {
    // Process the message
    // Emit the message to all connected clients
    io.emit("newMessage", message);
  });

  socket.on("disconnected", () => {
    console.log("user disconnected ", socket.id);
  });
});

// connect to mongodb
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};


// what appen in case of deconnection after the first one 
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
  connect();
});



app.use("/api/auth", authRoute);
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

httpServer.listen(8800, () => {
  console.log("backend is running on localhost:8800");
  connect();
});
