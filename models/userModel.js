import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    // User name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    // User email
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    // User password
    password: {
      type: String,
      required: true,
    },

    // References to user's posts
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    // Add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export User Model
export default mongoose.model("User", userSchema);
