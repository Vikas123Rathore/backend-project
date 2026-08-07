import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";
// creating post controller
export const postCreate = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.userId) {
      return res.status(401).json({
        message: "Please Login first",
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    let image = "";
// uploading files or image on cloudinary
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const post = await Post.create({
      title,
      content,
      image,
      authorId: req.userId,
    });

    await User.findByIdAndUpdate(req.userId, {
      $push: {
        posts: post._id,
      },
    });
// post populating with user
    const populatedPost = await Post.findById(post._id).populate(
      "authorId",
      "name email"
    );

    return res.status(201).json({
      message: "Post created successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
// getting all post controller
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
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// getting post by id controller
export const getPostbyId = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "authorId",
      "name email"
    );

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
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

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
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.authorId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this post",
      });
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path);

      if (image) {
        post.image = image;
      }
    }

    await post.save();

    const updatedPost = await Post.findById(post._id).populate(
      "authorId",
      "name email"
    );

    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.log("Error in updating post:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.authorId.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this post",
      });
    }

    await Post.findByIdAndDelete(id);

    await User.findByIdAndUpdate(req.userId, {
      $pull: {
        posts: id,
      },
    });

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
