import User from "../models/User.js";
import bcryptjs from "bcryptjs";

export const SignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
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
    return res.status(500).json({ message: error.message });
  }
};
