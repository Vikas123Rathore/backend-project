import Post from "../models/postModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";


// CREATE POST



export const postCreate = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    let image = "";

    // Upload image to Cloudinary if provided
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);

      if (!image) {
        console.warn("Image upload failed or was skipped. Creating post without image.");
      }
    }

    const post = await Post.create({
      title,
      content,
      image,
      authorId: req.userId,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "authorId",
      "name email"
    );

    return res.status(201).json({
      message: "Post created successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.error("Error in creating post:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



// GET ALL POSTS
export const getAllPsot = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log("Error in getting all posts:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// GET POST BY ID
export const getPostbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("authorId", "name email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.log("Error in getting post by id:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// GET TOP 3 RECENT POSTS
export const getTopRecentPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId", "name email")
      .sort({ createdAt: -1 })
      .limit(3);

    return res.status(200).json({
      message: "Top recent posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log("Error in getting top recent posts:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Check authentication
    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    // Find post
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check if logged-in user is the post owner
    if (post.authorId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this post",
      });
    }

    // Update only provided fields
    if (title !== undefined) {
      post.title = title;
    }

    if (content !== undefined) {
      post.content = content;
    }

    await post.save();

    return res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.log("Error in updating post:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// DELETE POST

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    // Check authentication
    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    // Find post
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check if logged-in user is the post owner
    if (post.authorId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this post",
      });
    }

    // Delete post
    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting post:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
