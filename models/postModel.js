import mongoose from "mongoose";

// Post Schema
const postSchema = new mongoose.Schema(
  {
    // Post title
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    // Post content
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },

    // Post image URL
    image: {
      type: String,
      default: "",
    },

    // Reference to post author
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // Add createdAt and updatedAt fields
    timestamps: true,
  }
);

// Export Post Model
export default mongoose.model("Post", postSchema);
