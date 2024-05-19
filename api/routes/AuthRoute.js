import express from "express";
const router = express.Router();

// Controller
import { SignIn, SignUp, GoogleSignIn } from "../controllers/AuthController.js";

// Define
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/google", GoogleSignIn)


export default router