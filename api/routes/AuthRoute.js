import express from "express";
const router = express.Router();

// Controller
import { SignUp } from "../controllers/AuthController.js";

// Define
router.post("/signup", SignUp);

export default router