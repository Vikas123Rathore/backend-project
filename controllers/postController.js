import Post from "../models/postModel.js";

export const postCreate = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.create({
      title,
      content,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log("Error in creating post:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
