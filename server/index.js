import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import userController from "./controllers/userController.js";
dotenv.config();
const app = express();

app.use(morgan("start"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const port = 5000;

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log("connected"));
  })
  .catch(() => console.log("disconnected"));

app.use("/api/users", userController);
