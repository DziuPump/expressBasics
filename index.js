import express from "express";
import mongoose from "mongoose";
import userModel from "./models/userModel.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

const connectionToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection to mongoDB is successfull!");
  } catch (error) {
    throw error;
  }
};

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api", userRoute);

app.use("/api", authRoute);

app.listen(port, () => {
  connectionToDB();
  console.log(`server started on port ${port}`);
});
