import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./routes/AuthRoute.js";

// CONST
dotenv.config();
const app = express();
app.use(express.json());

// MONGOOSE
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Middleware
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || 'Something went wrong';
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMessage,
  });
});


// REGIS ROUTES
app.use('/api/v1/auth', AuthRoute);


app.listen(3000, () => console.log("Server running on port 3000"));