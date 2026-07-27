import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
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
