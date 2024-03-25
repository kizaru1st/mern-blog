import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MONGOOSE
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// CONST
const app = express();

app.listen(3000, () => console.log("Server running on port 3000"));
