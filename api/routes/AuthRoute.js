import express from "express";
const router = express.Router();

// Controller
import { SignIn, SignUp } from "../controllers/AuthController.js";

// Define
router.post("/signup", SignUp);
router.post("/signin", SignIn);


export default router