import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const SignUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      next(errorHandler(400, "Please provide username, email and password"));
    }

    const hashPassword = await bcryptjs.hashSync(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res.status(200).json({
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
