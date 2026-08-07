import { genToken } from "../config/token.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// Register User
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashPassword,
    });

    // Generate JWT token
    const token = genToken(newUser._id);

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Remove password before sending response
    const user = newUser.toObject();
    delete user.password;

    return res.status(201).json({
      message: "User created successfully",
      user,
      token,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });

  }
};

// Login User
export const loginUser = async (req, res) => {
  // ...
};

// Current User
export const currentUser = async (req, res) => {
  // ...
};

// Logout User
export const logoutUser = (req, res) => {
  // ...
};
