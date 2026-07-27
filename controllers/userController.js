import User from "../models/userModel.js";
import bcrypt from "bcrypt";
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashPassword
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Error in creating user:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
