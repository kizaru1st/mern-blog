import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ message: "Please provide username, email and password" });

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
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Please provide email and password" });

  try {
    const validateUser = await User.findOne({ email });
    if (!validateUser)
      return res.status(400).json({ message: "User not found!" });

    const validatePassword = bcryptjs.compareSync(
      password,
      validateUser.password
    );
    if (!validatePassword)
      return res.status(400).json({ message: "Incorrect password!" });

    const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: hashedPassword, ...rest } = validateUser._doc;

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        data: rest,
        message: "User signed in successfully",
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
